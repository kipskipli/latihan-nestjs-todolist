import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './strategy/header_api_key.strategy'
import { AppConfigModule } from 'src/config/app/config.module';
import { JWTModule } from './json_web_token/jwt.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtService } from './json_web_token/jwt.service';

@Module({
  imports: [ 
    PassportModule, 
    JWTModule,
    AppConfigModule
   ],
  providers: [ HeaderApiKeyStrategy, JwtStrategy, JwtService ],
  exports: [ JwtService ]
})
export class AuthModule {}