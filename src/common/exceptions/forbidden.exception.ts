import { HttpStatus } from "@nestjs/common";
import { EErrorMessage } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class ForbiddenException extends BaseException {
  constructor() {
    super({
      message: EErrorMessage.FORBIDDEN,
      status: HttpStatus.FORBIDDEN
    });
  }
}
