import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { HeaderApiKeyStrategy } from "./strategy/header_api_key.strategy";
import { AppConfigModule } from "src/config/app/config.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { JWTConfigModule } from "src/config/jwt/config.module";
import { JWTConfigService } from "src/config/jwt/config.service";
import { InspigoJwtService } from "./json_web_token/inspigo_jwt.service";
import { RedisCacheModule } from "../../service/redis_cache/redis_cache.module";

@Module({
	imports: [
		AppConfigModule,
		PassportModule,
		JWTConfigModule,
		JwtModule.registerAsync({
			imports: [JWTConfigModule],
			useFactory: (config: JWTConfigService) => {
				return {
					secret: config.secret,
					signOptions: {
						algorithm: "HS256",
						issuer: config.issuer,
						expiresIn: config.ttl,
					},
				};
			},
			inject: [JWTConfigService],
		}),
		RedisCacheModule,
	],
	providers: [HeaderApiKeyStrategy, JwtStrategy, InspigoJwtService],
	exports: [InspigoJwtService],
})
export class AuthModule {}
