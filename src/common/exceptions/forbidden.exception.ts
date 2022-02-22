import { EErrorMessage, EHttpStatus } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class ForbiddenException extends BaseException {
  constructor() {
    super({
      message: EErrorMessage.FORBIDDEN,
      status: EHttpStatus.FORBIDDEN
    });
  }
}
