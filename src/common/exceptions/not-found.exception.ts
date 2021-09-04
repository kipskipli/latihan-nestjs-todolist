import { HttpStatus } from "@nestjs/common";
import { ERROR_MESSAGE } from "../enum";
import { BaseException } from "./base.exception";

export class NotFoundException extends BaseException {
  constructor() {
    super(ERROR_MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
