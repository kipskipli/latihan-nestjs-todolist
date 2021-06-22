import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RedisConfigService {
    constructor(private configService: ConfigService) {};

    get port(): number {
        return this.configService.get<number>('redis.port', 6379);
    }

    get host(): string {
        return this.configService.get<string>('redis.host', 'localhost');
    }
}