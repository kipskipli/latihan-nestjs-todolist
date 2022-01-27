import IORedis from "ioredis";
import { Injectable } from "@nestjs/common";
import { RedisService } from "src/core/redis";
import { RedisConfigService } from "src/config/redis-config.service";

@Injectable()
export class RedisCacheService {
  private redisClient: IORedis.Redis;
  private defaultTtl: number;

  constructor(
    private readonly redisService: RedisService,
    private readonly redisConfigService: RedisConfigService
  ) {
    this.redisClient = this.redisService.getClient();
    this.defaultTtl = this.redisConfigService.cacheTtl.default;
  }

  async get(key: string): Promise<any> {
    const data = await this.redisClient.get(key);
    return JSON.parse(data);
  }

  async getNoParse(key: string): Promise<any> {
    return await this.redisClient.get(key)
  }

  async set(key: string, value: any, ttl = this.defaultTtl): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), "EX", ttl);
    return;
  }

  async del(key): Promise<void> {
    await this.redisClient.del(key);
    return;
  }

  async getKeysByPattern(pattern: string) {
    return await this.redisClient.keys(pattern);
  }

  async removeByPattern(pattern: string): Promise<void> {
    const keys = await this.getKeysByPattern(pattern);
    if (keys.length > 0) {
      await this.del(keys);
    }
    return;
  }
}
