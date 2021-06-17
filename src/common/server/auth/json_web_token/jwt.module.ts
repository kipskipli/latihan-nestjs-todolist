import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfigModule } from 'src/config/jwt/config.module';
import { JWTConfigService } from 'src/config/jwt/config.service';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    PassportModule, 
    JWTConfigModule,
    JwtModule.registerAsync({
        imports: [JWTConfigModule],
        useFactory: ((config: JWTConfigService) => {
            return {
                secret: config.secret,
                signOptions: {
                    issuer: config.issuer,
                    expiresIn: config.ttl
                }
            }
        }),
        inject: [ JWTConfigService ]
    }),
  ],
  providers: [ JwtService ],
  exports: [ JwtService ],
})
export class JWTModule {}