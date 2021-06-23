import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";

export class NotFoundException extends BaseException {
  constructor() {
    super("Not Found", HttpStatus.NOT_FOUND);
  }
}
