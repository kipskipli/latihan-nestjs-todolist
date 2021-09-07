import * as redisStore from "cache-manager-redis-store";
import { CacheModule, Module } from "@nestjs/common";
import { RedisConfigModule } from "src/config/redis/redis-config.module";
import { RedisConfigService } from "src/config/redis/redis-config.service";
import { RedisCacheService } from "./redis.service";

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [RedisConfigModule],
      inject: [RedisConfigService],
      useFactory: async (config: RedisConfigService) => ({
        store: redisStore,
        host: config.host,
        port: config.port
      })
    })
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule {}
