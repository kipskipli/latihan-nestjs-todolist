import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { BadRequestException } from "./common/exceptions/bad-request.exception";
import { ConflictException } from "./common/exceptions/conflict.exception";
import { ForbiddenException } from "./common/exceptions/forbidden.exception";
import { InternalServerErrorException } from "./common/exceptions/internal-server-error.exception";
import { NotFoundException } from "./common/exceptions/not-found.exception";
import { UnauthorizedException } from "./common/exceptions/unauthorized.exception";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new BadRequestException({id: ["dawdwa"]});
    return this.appService.getHello();
  }
}
