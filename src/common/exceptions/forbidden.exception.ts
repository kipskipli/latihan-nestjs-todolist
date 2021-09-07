import { HttpStatus } from "@nestjs/common";
import { ErrorMessageEnum } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class ForbiddenException extends BaseException {
  constructor() {
    super({
      message: ErrorMessageEnum.FORBIDDEN,
      status: HttpStatus.FORBIDDEN
    });
  }
}
