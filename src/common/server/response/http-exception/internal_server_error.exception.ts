import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";

export class InternalServerErrorException extends BaseException {
  detail: string;
  constructor(detail) {
    super("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    this.detail = detail;
  }
}
