import { EErrorMessage, EHttpStatus } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class NotFoundException extends BaseException {
  constructor() {
    super({
      message: EErrorMessage.NOT_FOUND,
      status: EHttpStatus.NOT_FOUND
    });
  }
}
