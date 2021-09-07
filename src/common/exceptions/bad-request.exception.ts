import { HttpStatus } from "@nestjs/common";
import { ErrorMessageEnum } from "@inspigoid/inspigo-utils-ts/lib/type";
import { BaseException } from "./base.exception";

export class BadRequestException extends BaseException {
  constructor(readonly validation: Record<string, Array<any>>) {
    super({
      message: ErrorMessageEnum.BAD_REQUEST,
      status: HttpStatus.BAD_REQUEST,
      validation
    });
  }
}
