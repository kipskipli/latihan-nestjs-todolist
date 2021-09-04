import { HttpStatus } from "@nestjs/common";
import { ERROR_MESSAGE } from "../enum";
import { BaseException } from "./base.exception";

export class BadRequestException extends BaseException {
  constructor(readonly validation: Record<string, Array<any>>) {
    super(ERROR_MESSAGE.BAD_REQUEST, HttpStatus.BAD_REQUEST, validation);
  }
}
