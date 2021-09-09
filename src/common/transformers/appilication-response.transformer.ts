import { HttpStatus, Res } from "@nestjs/common";
import { InspigoSuccessResponseDto, IAccessToken } from "@inspigoid/inspigo-utils-ts/lib/interface";

import { Response } from "express";

export class ApplicationResponse {
  static ok(@Res() res: Response, data: any, token?: IAccessToken): Response {
    return res
      .status(HttpStatus.OK)
      .json(new InspigoSuccessResponseDto(true, "Success", data, token));
  }

  static accepted(@Res() res: Response, token?: IAccessToken): Response {
    return res
      .status(HttpStatus.ACCEPTED)
      .json(new InspigoSuccessResponseDto(true, "Accepted", null, token));
  }
}
