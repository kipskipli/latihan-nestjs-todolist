import * as Joi from "joi";
import configuration from "./configuration";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseConfigService } from "./mongoose-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MONGO_URI_GAMIFICATION_DB: Joi.string().required()
      })
    })
  ],
  providers: [ConfigService, MongooseConfigService],
  exports: [MongooseConfigService]
})
export class MongooseConfigModule {}
