import { HttpException } from "@nestjs/common";
import { IErrorResponse } from "@inspigoid/inspigo-utils-ts/lib/interface";
import { ErrorResponseDto } from "@inspigoid/inspigo-utils-ts/lib/transformer";

export class BaseException extends HttpException {
  constructor(error: IErrorResponse) {
    super(HttpException.createBody(new ErrorResponseDto(error)), error.status);
  }
}
