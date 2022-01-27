import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisModuleOptions } from "src/core/redis";
import { AppConfigService } from "./app-config.service";

@Injectable()
export class RedisConfigService extends AppConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  get options(): RedisModuleOptions {
    return {
      host: super.getString("REDIS_HOST"),
      port: super.getNumber("REDIS_PORT")
    };
  }

  get cacheTtl() {
    return {
      todo: super.getNumber("TODO_CACHE_TTL"),
      default: super.getNumber("DEFAULT_CACHE_TTL")
    };
  }
}
