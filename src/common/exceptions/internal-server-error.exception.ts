import { HttpStatus } from "@nestjs/common";
import { ErrorMessageEnum } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class InternalServerErrorException extends BaseException {
  constructor(detail: any) {
    super({
      message: ErrorMessageEnum.INTERNAL_SERVER_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      detail
    });
  }
}
