import { HttpException, HttpStatus } from "@nestjs/common";
import { AccessTokenInterface } from "../interfaces";

export class BaseException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    validation?: any,
    token?: AccessTokenInterface,
    detail?: any,
  ) {
    super(
      HttpException.createBody({
        ok: false,
        message: message,
        detail: detail,
        validation: validation,
        token: token,
      }),
      status,
    );
  }
}
