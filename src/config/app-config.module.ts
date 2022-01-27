import { AppConfigService } from "./app-config.service";
import { Global, Module } from "@nestjs/common";
import { RedisConfigService } from "./redis-config.service";
import { ApiConfigService } from "./api-config.service";
import { InspigoServiceConfigService } from "./inspigo-service-config.service";
import { JWTConfigService } from "./jwt-config.service";
import { MongooseConfigService } from "./mongoose-config.service";
import { RabbitMQConfigService } from "./rabbitmq-config.service";
import { ConfigModule } from "@nestjs/config";

const providers = [
  AppConfigService,
  ApiConfigService,
  InspigoServiceConfigService,
  JWTConfigService,
  MongooseConfigService,
  RabbitMQConfigService,
  RedisConfigService
];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
    })
  ],
  providers,
  exports: providers
})
export class AppConfigModule {}
