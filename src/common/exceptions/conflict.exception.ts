import { HttpStatus } from "@nestjs/common";
import { ERROR_MESSAGE } from "../enum";
import { BaseException } from "./base.exception";

export class ConflictException extends BaseException {
  constructor(readonly validation: Record<string, Array<any>>) {
    super(ERROR_MESSAGE.CONFLICT, HttpStatus.CONFLICT, validation);
  }
}
