import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTConfigService } from 'src/config/jwt/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly jwtConfigService: JWTConfigService) {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConfigService.secret
        });
  }

  async validate(payload: any) {
    console.log('-> ', payload);
    return { userId: payload.sub, username: payload.username };
  }
}