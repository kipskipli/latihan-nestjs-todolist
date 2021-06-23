import {
	Body,
	Controller,
	Get,
	Header,
	Post,
	Req,
	Res,
	Response,
	UseGuards,
} from "@nestjs/common";
import { ServerKeyAuthGuard } from "src/common/server/auth/guard/header_api_key.guard";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./common/server/auth/guard/jwt.guard";
import { ApplicationResponse } from "./common/server/response/application.response";
import { BadRequestException } from "./common/server/response/http-exception/bad_request.exception";
import { FobiddenException } from "./common/server/response/http-exception/forbidden.exception";
import { InspigoJwtService } from "./common/server/auth/json_web_token/inspigo_jwt.service";
import { JwtOrServerKeyAuthGuard } from "./common/server/auth/guard/jwt_or_server_key.guard";
import { LOGIN_ORIGIN } from "./common/enum/login_origin.enum";

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private jwtService: InspigoJwtService,
	) {}

	@Get("/hello")
	@Header("Content-Type", "application/json")
	@UseGuards(JwtAuthGuard)
	getHello(@Res() res, @Req() req): Response {
		return ApplicationResponse.ok(res, { message: "hello world" });
	}

	@Post("/login")
	async login(@Body() body, @Res() res): Promise<Response> {
		const user: {
			origin: LOGIN_ORIGIN;
			username: string;
		} = {
			origin: LOGIN_ORIGIN.APPS,
			username: body.username || "dorman99",
		};
		const token = await this.jwtService.sign(user);
		return ApplicationResponse.ok(res, user, { access: token });
	}

	@Get("/multi-guard")
	@UseGuards(JwtOrServerKeyAuthGuard)
	async multiGuard(@Res() res, @Req() req): Promise<Response> {
		const message = "welcome guard";
		const data = {
			message,
		};
		let token = null;
		if (req.user && !req.user.apiKey) {
			token = await this.jwtService.sign(req.user);
		}
		return ApplicationResponse.ok(res, data, token ? { access: token } : null);
	}
}
