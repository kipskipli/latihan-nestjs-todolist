import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>("app.port", 3000);
  }

  get env(): string {
    return this.configService.get<string>("app.env");
  }

  get key(): string {
    return this.configService.get<string>("app.key");
  }
}
