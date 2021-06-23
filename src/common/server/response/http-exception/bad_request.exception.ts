import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";

export class BadRequestException extends BaseException {
	validation: object[];
	constructor(validation) {
		super("Bad Request", HttpStatus.BAD_REQUEST);
		this.validation = validation;
	}
}
