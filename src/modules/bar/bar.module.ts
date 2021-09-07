import { Module } from "@nestjs/common";
import { AuthModule } from "src/common/auth/auth.module";
import { RedisCacheModule } from "src/common/providers/redis/redis.module";
import { RedisConfigModule } from "src/config/redis/redis-config.module";
import { BarRepositoryModule } from "src/repository/bar/bar-repository.module";
import { BarController } from "./bar.controller";
import { BarService } from "./bar.service";

@Module({
  imports: [
    AuthModule,
    RedisCacheModule,
    RedisConfigModule,
    BarRepositoryModule
  ],
  controllers: [BarController],
  providers: [BarService],
  exports: [BarService]
})
export class BarModule {}
