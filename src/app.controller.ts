import { Controller, Get, Header, Res, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { ApplicationResponse } from './common/server/response/application.response';
import { BadRequestException } from './common/server/response/http-exception/bad_request.exception';
import { FobiddenException } from './common/server/response/http-exception/forbidden.exception'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getHello(@Res() res): Response {
      const greed = this.appService.getHello();
      return ApplicationResponse.ok(res, {message: greed})
  }
}
