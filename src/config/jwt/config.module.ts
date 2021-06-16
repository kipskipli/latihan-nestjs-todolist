import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";
import * as Joi from "joi";
import { JWTConfigService } from "./config.service";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                secret: Joi.string().default('abcd'),
                ttl: Joi.string().default('15 * 60')
            })
        })
    ],
    providers: [ JWTConfigService ],
    exports: [ JWTConfigService ]
})
export class JWTConfigModule{}