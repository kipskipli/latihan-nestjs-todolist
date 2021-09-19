import { HttpStatus } from "@nestjs/common";
import { EErrorMessage } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class UnauthorizedException extends BaseException {
  constructor() {
    super({
      message: EErrorMessage.UNAUTHORIZED,
      status: HttpStatus.UNAUTHORIZED
    });
  }
}
