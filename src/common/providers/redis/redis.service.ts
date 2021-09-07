import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string): Promise<any> {
    return await this.cache.get(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    return await this.cache.set(key, value, { ttl: ttl ? ttl : null });
  }

  async del(key): Promise<void> {
    return await this.cache.del(key);
  }

  async getKeysByPattern(pattern: string): Promise<any> {
    return await this.cache.keys(pattern);
  }

  async removeByPattern(pattern: string): Promise<void> {
    const keys = await this.getKeysByPattern(pattern);
    if (keys.length > 0) {
      await this.del(keys);
    }
    return;
  }
}
