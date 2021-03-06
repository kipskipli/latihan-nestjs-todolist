import { EErrorMessage, EHttpStatus } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class ConflictException extends BaseException {
  constructor(readonly validation: Record<string, Array<any>>) {
    super({
      message: EErrorMessage.CONFLICT,
      status: EHttpStatus.CONFLICT,
      validation
    });
  }
}
