import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppConfigService } from "./app-config.service";

@Injectable()
export class ApiConfigService extends AppConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  get port(): number {
    return super.getNumber("APP_PORT");
  }

  get key(): string {
    return super.getString("APP_SERVER_KEY");
  }

  get throttlerTtl(): number {
    return super.getNumber("APP_THROTTLER_TTL");
  }

  get throttlerLimit(): number {
    return super.getNumber("APP_THROTTLER_LIMIT");
  }

  get nodeEnv(): string {
    return this.getString("NODE_ENV");
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === "development";
  }

  get isStaging(): boolean {
    return this.nodeEnv === "staging";
  }

  get isProduction(): boolean {
    return this.nodeEnv === "production";
  }

  get isTest(): boolean {
    return this.nodeEnv === "test";
  }
}
