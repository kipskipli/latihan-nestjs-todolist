import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { HttpResponseDto } from "../dto/http_response.dto";
import { BaseException } from "./base.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const httpResponse = this._generateReponse(exception);
		response.status(status).json(httpResponse);
	}

	private _generateReponse(exception: BaseException): HttpResponseDto {
		if (exception.getStatus() === HttpStatus.BAD_REQUEST) {
			return new HttpResponseDto(
				false,
				exception.message,
				undefined,
				exception.token,
				exception.validation,
			);
		} else if (exception.getStatus() === HttpStatus.FORBIDDEN) {
			return new HttpResponseDto(
				false,
				exception.message,
				undefined,
				exception.token,
				undefined,
			);
		} else if (exception.getStatus() === HttpStatus.CONFLICT) {
			return new HttpResponseDto(
				false,
				exception.message,
				undefined,
				exception.token,
				exception.validation,
			);
		}
		return new HttpResponseDto(
			false,
			exception.message,
			undefined,
			undefined,
			undefined,
		);
	}
}
