import { Body, Controller, Get, Header, Post, Res, Response, UseGuards } from '@nestjs/common';
import { ServerKeyAuthGuard } from 'src/common/server/auth/guard/server_key.guard'
import { AppService } from './app.service';
import { JwtAuthGuard } from './common/server/auth/guard/jwt.guard';
import { JwtService } from './common/server/auth/json_web_token/jwt.service';
import { ApplicationResponse } from './common/server/response/application.response';
import { BadRequestException } from './common/server/response/http-exception/bad_request.exception';
import { FobiddenException } from './common/server/response/http-exception/forbidden.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: JwtService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  @UseGuards(JwtAuthGuard)
  getHello(@Res() res): Response {
      const greed = this.appService.getHello();
      return ApplicationResponse.ok(res, {message: greed})
  }

  @Post('/login')
  async login(@Body() body) {
    const token = await this.authService.sign({username: body.username})
    console.log(token);
    return token;
  }
}
