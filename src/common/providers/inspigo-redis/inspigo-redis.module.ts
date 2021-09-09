import { Module } from "@nestjs/common";
import { RedisModule } from "nestjs-redis";
import { RedisConfigModule } from "src/config/redis/redis-config.module";
import { RedisConfigService } from "src/config/redis/redis-config.service";
import { InspigoRedisService } from "./inspigo-redis.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    RedisModule.forRootAsync({
      imports: [RedisConfigModule],
      inject: [RedisConfigService],
      useFactory: (config: RedisConfigService) => ({
        host: config.host,
        port: config.port
      })
    })
  ],
  providers: [InspigoRedisService],
  exports: [InspigoRedisService]
})
export class InspigoRedisModule {}
