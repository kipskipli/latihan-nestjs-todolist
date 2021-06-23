import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";

export class ForbiddenException extends BaseException {
  constructor() {
    super("Forbidden", HttpStatus.FORBIDDEN);
  }
}
