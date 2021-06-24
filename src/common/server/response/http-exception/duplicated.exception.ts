import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";

export class DuplicatedException extends BaseException {
  readonly validation: any;
  constructor(validation) {
    super("Conflict", HttpStatus.CONFLICT);
    this.validation = validation;
  }
}
