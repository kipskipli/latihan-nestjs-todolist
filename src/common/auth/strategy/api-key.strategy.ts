import { IApiKeyHeader } from "@inspigoid/inspigo-utils-ts/lib/interface";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-headerapikey";
import { UnauthorizedException } from "src/common/exceptions";
import { INSPIGO_KEY_HEADER_NAME } from "@inspigoid/inspigo-utils-ts/lib/constant";
import { AppConfigService } from "src/config/app/app-config.service";

const serverHeaderConfig: IApiKeyHeader = {
  header: INSPIGO_KEY_HEADER_NAME,
  prefix: ""
};

@Injectable()
export class ServerApiKeyStrategy extends PassportStrategy(Strategy, "api-key") {
  constructor(private readonly appConfigService: AppConfigService) {
    super(serverHeaderConfig, false);
  }

  public validate = (apiKey: string) => {
    if (this.appConfigService.key === apiKey) {
      return { apiKey: true };
    }
    throw new UnauthorizedException();
  };
}
