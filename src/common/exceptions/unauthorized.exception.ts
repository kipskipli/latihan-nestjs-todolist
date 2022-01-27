import { EErrorMessage, EHttpStatus } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class UnauthorizedException extends BaseException {
  constructor() {
    super({
      message: EErrorMessage.UNAUTHORIZED,
      status: EHttpStatus.UNAUTHORIZED
    });
  }
}
