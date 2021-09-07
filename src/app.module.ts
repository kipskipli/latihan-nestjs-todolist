import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthModule } from "./common/auth/auth.module";
import { LoggingInterceptor } from "./common/interceptor";
import { MongooseGamificationModule } from "./common/providers/mongoose/mongoose-gamification.module";
import { AppConfigModule } from "./config/app/app-config.module";
import { BarModule } from "./modules/bar/bar.module";

@Module({
  imports: [AppConfigModule, AuthModule, MongooseGamificationModule, BarModule],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }]
})
export class AppModule {}
