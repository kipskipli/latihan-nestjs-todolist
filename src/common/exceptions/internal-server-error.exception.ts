import { EErrorMessage, EHttpStatus } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class InternalServerErrorException extends BaseException {
  constructor(err: any) {
    super({
      message: EErrorMessage.INTERNAL_SERVER_ERROR,
      status: EHttpStatus.INTERNAL_SERVER_ERROR,
      detail: err.message || err
    });
  }
}
