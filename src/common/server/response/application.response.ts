import { HttpStatus, Res, Response } from "@nestjs/common";
import { AccessTokenInterface } from "src/common/interface/access_token.interface";
import { HttpResponseDto } from "./dto/http_response.dto";


export class ApplicationResponse {
    static ok(@Res() res, data: any, token?: AccessTokenInterface): Response {
        return res.status(HttpStatus.OK).json(new HttpResponseDto(true, "Success", data, token));
    }

    static accepted(@Res() res, token?: AccessTokenInterface): Response {
        return res.status(HttpStatus.ACCEPTED).json(new HttpResponseDto(true, "Accepted", null, token));
    }
}