import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./common/server/auth/auth.module";
import { RedisCacheModule } from "./common/service/redis_cache/redis_cache.module";
import { AppConfigModule } from "./config/app/config.module";

@Module({
	imports: [AppConfigModule, AuthModule, RedisCacheModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
