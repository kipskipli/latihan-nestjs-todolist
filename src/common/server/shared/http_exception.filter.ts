import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response, Request } from "express";
import { HttpResponseDto } from "../response/dto";
import { BaseException } from "../response/http-exception/base.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const httpResponse = this._generateReponse(exception);
    Logger.error(
      httpResponse.message,
      JSON.stringify(httpResponse) + " " + request.path,
      "HttpExceptionFilter",
    );
    response.status(status).json(httpResponse);
  }

  private _generateReponse(exception: BaseException): HttpResponseDto {
    if (exception.getStatus() === HttpStatus.BAD_REQUEST) {
      return new HttpResponseDto(
        false,
        exception.message,
        undefined,
        exception.token,
        exception.validation,
      );
    } else if (exception.getStatus() === HttpStatus.FORBIDDEN) {
      return new HttpResponseDto(
        false,
        exception.message,
        undefined,
        exception.token,
        undefined,
      );
    } else if (exception.getStatus() === HttpStatus.CONFLICT) {
      return new HttpResponseDto(
        false,
        exception.message,
        undefined,
        exception.token,
        exception.validation,
      );
    }
    return new HttpResponseDto(
      false,
      exception.message,
      undefined,
      undefined,
      undefined,
    );
  }
}
