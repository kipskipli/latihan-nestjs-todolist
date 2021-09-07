import * as Joi from "joi";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { AppConfigService } from "./app-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(3000),
        APP_SERVER_KEY: Joi.string()
      })
    })
  ],
  providers: [ConfigService, AppConfigService],
  exports: [AppConfigService]
})
export class AppConfigModule {}
