import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWTConfigService } from 'src/config/jwt/config.service';
import { RedisCacheService } from '../../redis_cache/redis_cache.service';
import { generateJWTIdKey } from '../../util/fn';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly jwtConfigService: JWTConfigService, private readonly redisCacheService: RedisCacheService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: jwtConfigService.secret
        });
  }

  async validate(payload: any) {
    const key = generateJWTIdKey(payload.id, payload.origin);
    const jti = await this.redisCacheService.get(key);
    if (jti && jti != payload.jti) {
      throw new UnauthorizedException();
    }
    return { ...payload };
  }
}