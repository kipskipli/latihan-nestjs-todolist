import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import * as Joi from "joi";
import { RedisConfigService } from "./config.service";
@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			validationSchema: Joi.object({
				port: Joi.number(),
				host: Joi.string(),
			}),
		}),
	],
	providers: [ConfigService, RedisConfigService],
	exports: [RedisConfigService],
})
export class RedisConfigModule {}
