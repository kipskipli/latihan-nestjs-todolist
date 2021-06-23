import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";

export class FobiddenException extends BaseException {
	constructor() {
		super("Forbidden", HttpStatus.FORBIDDEN);
	}
}
