import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./common/server/auth/auth.module";
import { LoggingInterceptor } from "./common/server/shared";
import { RedisCacheModule } from "./common/service/redis_cache/redis_cache.module";
import { AppConfigModule } from "./config/app/config.module";

@Module({
  imports: [AppConfigModule, AuthModule, RedisCacheModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
