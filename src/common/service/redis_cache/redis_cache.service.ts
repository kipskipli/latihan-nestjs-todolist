import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
@Injectable()
export class RedisCacheService {
	constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

	async get(key: String): Promise<any> {
		return await this.cache.get(key);
	}

	async set(key: String, value: any, ttl?: Number): Promise<any> {
		return await this.cache.set(key, value, ttl);
	}

	async del(key): Promise<any> {
		return await this.cache.del(key);
	}
}
