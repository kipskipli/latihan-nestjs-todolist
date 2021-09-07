import { HttpStatus } from "@nestjs/common";
import { ErrorMessageEnum } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class NotFoundException extends BaseException {
  constructor() {
    super({
      message: ErrorMessageEnum.NOT_FOUND,
      status: HttpStatus.NOT_FOUND
    });
  }
}
