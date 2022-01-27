import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "src/common/exceptions";
import { JWTConfigService } from "src/config/jwt-config.service";
import { RedisCacheService } from "src/common/providers/redis/redis.service";
import { UtilsService } from "src/common/utils/utils.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly jwtConfigService: JWTConfigService,
    private readonly redisCacheService: RedisCacheService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.options.secret
    });
  }

  async validate(payload: any) {
    const key = UtilsService.generateJWTIdKey(payload.id, payload.origin);
    try {
      // considering other inspigo service still no parsed & stringified redis value
      const jti = await this.redisCacheService.getNoParse(key);
      if (jti && jti != payload.jti) {
        throw new UnauthorizedException();
      }
      return { ...payload };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
