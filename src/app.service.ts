import { Injectable, UseInterceptors } from "@nestjs/common";
import { BadRequestException } from "./common/server/response/http-exception";
import { LoggingInterceptor } from "./common/server/shared";
@Injectable()
export class AppService {
  @UseInterceptors(LoggingInterceptor)
  getHello(): string {
    throw new BadRequestException([]);
  }
}
