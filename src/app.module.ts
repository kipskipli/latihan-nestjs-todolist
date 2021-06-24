import { Module } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./common/server/auth/auth.module";
import { LoggingInterceptor } from "./common/server/shared";
import { RedisCacheModule } from "./common/service/redis_cache/redis_cache.module";
import { AppConfigModule } from "./config/app/config.module";
import { AppConfigService } from "./config/app/config.service";

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    RedisCacheModule,
    ThrottlerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        ttl: config.throttlerTtl,
        limit: config.throttlerLimit,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
