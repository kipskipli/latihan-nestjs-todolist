import * as Joi from "joi";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { RedisConfigService } from "./redis-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        REDIS_PORT: Joi.number().default(6379),
        REDIS_HOST: Joi.string().default("localhost")
      })
    })
  ],
  providers: [ConfigService, RedisConfigService],
  exports: [RedisConfigService]
})
export class RedisConfigModule {}
