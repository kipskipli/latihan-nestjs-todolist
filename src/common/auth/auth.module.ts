import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JWTConfigService } from "src/config/jwt-config.service";
import { RedisCacheModule } from "../providers/redis/redis.module";
import { InspigoJwtService } from "./inspigo-jwt.service";
import { ServerApiKeyStrategy, JwtStrategy } from "./strategy";

@Global()
@Module({
  imports: [
    PassportModule,
    RedisCacheModule,
    RedisCacheModule,
    JwtModule.registerAsync({
      useFactory: (jwtConfig: JWTConfigService) => jwtConfig.options,
      inject: [JWTConfigService]
    })
  ],
  providers: [InspigoJwtService, ServerApiKeyStrategy, JwtStrategy],
  exports: [InspigoJwtService]
})
export class AuthModule {}
