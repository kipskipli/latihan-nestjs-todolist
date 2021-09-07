import { Injectable } from "@nestjs/common";
import { RedisCacheService } from "src/common/providers/redis/redis.service";
import { BarRepository } from "src/repository/bar/bar.repository";

@Injectable()
export class BarService {
  constructor(
    private readonly barRepository: BarRepository,
    private readonly redisService: RedisCacheService
  ) {}

  async findAll() {
    const key = this.getBarKey();
    const cache = await this.redisService.get(key);
    if (!cache) {
      const bar = await this.barRepository.findAll();
      await this.redisService.set(key, bar, 120); // ttl better store in env
      return bar;
    }
    return cache;
  }

  private getBarKey() {
    return "bar:key";
  }
}
