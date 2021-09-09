import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";
import { InternalServerErrorException } from "./internal-server-error.exception";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const e =
      exception instanceof HttpException ? exception : new InternalServerErrorException(exception);
    return res.status(e.getStatus()).json(e.getResponse());
  }
}
