import * as Joi from "joi";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";
import { JWTConfigService } from "./jwt-config.service";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string(),
        JWT_TTL: Joi.string().default("1h")
      })
    })
  ],
  providers: [JWTConfigService],
  exports: [JWTConfigService]
})
export class JWTConfigModule {}
