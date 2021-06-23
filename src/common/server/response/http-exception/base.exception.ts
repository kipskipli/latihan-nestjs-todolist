import { HttpException, HttpStatus } from "@nestjs/common";
import { AccessTokenInterface } from "src/common/interface";

export class BaseException extends HttpException {
  readonly token?: AccessTokenInterface;
  readonly validation?: any;
  readonly detail?: any;
  constructor(
    message: string,
    status: HttpStatus,
    detail?: any,
    validation?: any,
    token?: AccessTokenInterface,
  ) {
    super(message, status);
    this.validation = validation;
    this.detail = detail;
    this.token = token;
  }
}
