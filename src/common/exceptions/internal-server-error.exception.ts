import { HttpStatus } from "@nestjs/common";
import { ERROR_MESSAGE } from "../enum";
import { BaseException } from "./base.exception";

export class InternalServerErrorException extends BaseException {
  constructor(detail: any) {
    super(
      ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
      undefined,
      undefined,
      detail,
    );
  }
}
