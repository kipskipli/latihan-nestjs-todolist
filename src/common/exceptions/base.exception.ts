import { HttpException } from "@nestjs/common";
import {
  IErrorResponse,
  InspigoErrorResponseDto
} from "@inspigoid/inspigo-utils-ts/lib/interface";

export class BaseException extends HttpException {
  constructor(error: IErrorResponse) {
    super(
      HttpException.createBody(new InspigoErrorResponseDto(error)),
      error.status
    );
  }
}
