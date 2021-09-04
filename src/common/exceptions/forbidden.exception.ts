import { HttpStatus } from "@nestjs/common";
import { ERROR_MESSAGE } from "../enum";
import { BaseException } from "./base.exception";

export class ForbiddenException extends BaseException {
  constructor() {
    super(ERROR_MESSAGE.FORBIDDEN, HttpStatus.FORBIDDEN);
  }
}
