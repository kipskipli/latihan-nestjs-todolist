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
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./common/server/auth/guard/jwt.guard";
import { ApplicationResponse } from "./common/server/response/application.response";
import {
  BadRequestException,
  InternalServerErrorException,
} from "./common/server/response/http-exception";
import { InspigoJwtService } from "./common/server/auth/json_web_token/inspigo_jwt.service";
import {
  JwtOrServerKeyAuthGuard,
  OriginGuard,
} from "./common/server/auth/guard";
import { LOGIN_ORIGIN_ENUM } from "./common/enum";
import { Origin } from "./common/server/util/decorator";

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
      origin: LOGIN_ORIGIN_ENUM;
      username: string;
    } = {
      origin: LOGIN_ORIGIN_ENUM.APPS,
      username: body.username || "dorman99",
    };
    const token = await this.jwtService.sign(user);
    return ApplicationResponse.ok(res, user, { access: token });
  }

  @Get("/multi-guard")
  @UseGuards(JwtOrServerKeyAuthGuard, OriginGuard)
  @Origin(LOGIN_ORIGIN_ENUM.APPS)
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
