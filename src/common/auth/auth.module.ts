import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AppConfigModule } from "src/config/app/app-config.module";
import { JWTConfigModule } from "src/config/jwt/jwt-config.module";
import { JWTConfigService } from "src/config/jwt/jwt-config.service";
import { InspigoRedisModule } from "../providers/inspigo-redis/inspigo-redis.module";
import { RedisCacheModule } from "../providers/redis/redis.module";
import { InspigoJwtService } from "./services";
import { ServerApiKeyStrategy, JwtStrategy } from "./strategy";

@Module({
  imports: [
    AppConfigModule,
    PassportModule,
    JWTConfigModule,
    RedisCacheModule,
    InspigoRedisModule,
    JwtModule.registerAsync({
      imports: [JWTConfigModule],
      useFactory: (config: JWTConfigService) => {
        return {
          secret: config.secret,
          signOptions: {
            algorithm: "HS256",
            issuer: config.issuer,
            expiresIn: config.ttl
          }
        };
      },
      inject: [JWTConfigService]
    })
  ],
  providers: [InspigoJwtService, ServerApiKeyStrategy, JwtStrategy],
  exports: [InspigoJwtService]
})
export class AuthModule {}
