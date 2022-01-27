import { RedisCacheService } from "./redis.service";
import { Module } from "@nestjs/common";
import { RedisModule } from "src/core/redis";
import { RedisConfigService } from "src/config/redis-config.service";

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [RedisConfigService],
      useFactory: (config: RedisConfigService) => config.options
    })
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule {}
