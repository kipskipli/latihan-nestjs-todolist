import { HttpException, HttpStatus } from "@nestjs/common";
import { AccessTokenInterface } from "src/common/interface/access_token.interface";

export class BaseException extends HttpException {
	readonly token?: AccessTokenInterface;
	readonly validation?: any;
	readonly detail?: any;
	constructor(
		message: String,
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
