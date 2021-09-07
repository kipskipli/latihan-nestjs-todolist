import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { generateJWTIdKey } from "@inspigoid/inspigo-utils-ts/lib/fn";
import { UnauthorizedException } from "src/common/exceptions";
import { RedisCacheService } from "src/common/providers/redis/redis.service";
import { JWTConfigService } from "src/config/jwt/jwt-config.service";
import { InspigoRedisService } from "src/common/providers/inspigo-redis/inspigo-redis.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly jwtConfigService: JWTConfigService,
    private readonly redisService: RedisCacheService,
    private readonly inspigoRedisService: InspigoRedisService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.secret
    });
  }

  async validate(payload: any) {
    const key = generateJWTIdKey(payload.id, payload.origin);
    try {
      const jti = await this.redisService.get(key);
      if (jti && jti != payload.jti) {
        throw new UnauthorizedException();
      }
      return { ...payload };
    } catch (err) {
      if (
        err.message &&
        err.message.includes("Unexpected token a in JSON at")
      ) {
        let jti = await this.inspigoRedisService.get(key);
        if (jti && jti != payload.jti) {
          throw new UnauthorizedException();
        }
        return { ...payload };
      }
      throw new UnauthorizedException();
    }
  }
}
