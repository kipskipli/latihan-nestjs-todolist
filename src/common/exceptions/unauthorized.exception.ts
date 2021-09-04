import { HttpStatus } from "@nestjs/common";
import { ERROR_MESSAGE } from "../enum";
import { BaseException } from "./base.exception";

export class UnauthorizedException extends BaseException {
  constructor() {
    super(ERROR_MESSAGE.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}
