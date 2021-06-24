import { HttpStatus, Res } from "@nestjs/common";
import { AccessTokenInterface } from "src/common/interface";
import { HttpResponseDto } from "../response/dto/http_response.dto";
import { Response } from "express";
export class ApplicationResponse {
  static ok(
    @Res() res: Response,
    data: any,
    token?: AccessTokenInterface,
  ): Response {
    return res
      .status(HttpStatus.OK)
      .json(new HttpResponseDto(true, "Success", data, token));
  }
  static accepted(
    @Res() res: Response,
    token?: AccessTokenInterface,
  ): Response {
    return res
      .status(HttpStatus.ACCEPTED)
      .json(new HttpResponseDto(true, "Accepted", null, token));
  }
}
