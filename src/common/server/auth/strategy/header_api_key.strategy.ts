import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-headerapikey";
import { InspigoKeyHeaderInterface } from "src/common/interface/inspigo_key_header.interface";
import { UnauthorizedException } from "src/common/server/response/http-exception/unauthorized.exception";
import { AppConfigService } from "src/config/app/config.service";

const serverHeaderConfig: InspigoKeyHeaderInterface = {
	header: "InspigoKey",
	prefix: "",
};

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
	Strategy,
	"api-key",
) {
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
