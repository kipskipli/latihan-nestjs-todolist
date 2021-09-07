import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import configuration from "./configuration";
import { RabbitMQConfigService } from "./rabbitmq-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required()
      })
    })
  ],
  providers: [ConfigService, RabbitMQConfigService],
  exports: [RabbitMQConfigService]
})
export class RabbitMQConfigModule {}
