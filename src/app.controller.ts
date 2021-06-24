import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Header,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./common/server/auth/guard/jwt.guard";
import { ApplicationResponse } from "./common/server/shared/application.response";
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
import { Origin } from "./common/util/decorator";
import { LoginPipe } from "./login.pipe";
import { Response } from "express";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: InspigoJwtService,
  ) {}

  @Get("/hello")
  @Header("Content-Type", "application/json")
  @UseGuards(JwtAuthGuard)
  getHello(@Res() res: Response, @Req() req): Response {
    return ApplicationResponse.ok(res, { message: "hello world" });
  }

  @Post("/login")
  async login(@Body(LoginPipe) body, @Res() res: Response): Promise<Response> {
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
    const message = this.appService.getHello();
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
