import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppConfigService } from "./app-config.service";

@Injectable()
export class InspigoServiceConfigService extends AppConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  get contentUrl(): string {
    return super.getString("CONTENT_HOST");
  }

  get inspigoKey(): string {
    return super.getString("APP_SERVER_KEY");
  }
}
