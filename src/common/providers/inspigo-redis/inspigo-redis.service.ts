import { RedisService } from "nestjs-redis";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InspigoRedisService {
  private _redisClient;
  constructor(private readonly redisService: RedisService) {
    this._redisClient = this.redisService.getClient();
  }

  async get(key) {
    return await this._redisClient.get(key);
  }
}
