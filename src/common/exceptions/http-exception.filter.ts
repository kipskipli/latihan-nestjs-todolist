import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { InternalServerErrorException } from "./internal-server-error.exception";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const method = req.method;
    const url = req.url;
    const user = req.user ? req.user.email || "inspigoKey" : "NoHeader";
    const e =
      exception instanceof HttpException ? exception : new InternalServerErrorException(exception);

    Logger.error(
      `[${user}] - ${method} ${url}`,
      `error: ${JSON.stringify(e.getResponse())}`,
      "ExceptionFilter"
    );

    return res.status(e.getStatus()).json(e.getResponse());
  }
}
