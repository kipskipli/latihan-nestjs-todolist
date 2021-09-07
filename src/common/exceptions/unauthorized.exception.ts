import { HttpStatus } from "@nestjs/common";
import { ErrorMessageEnum } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class UnauthorizedException extends BaseException {
  constructor() {
    super({
      message: ErrorMessageEnum.UNAUTHORIZED,
      status: HttpStatus.UNAUTHORIZED
    });
  }
}
