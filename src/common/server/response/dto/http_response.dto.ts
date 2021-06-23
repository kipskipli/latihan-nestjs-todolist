import { AccessTokenInterface } from "src/common/interface/access_token.interface";
import { HttpResponseInterface } from "src/common/interface/http_response.interface";
export class HttpResponseDto implements HttpResponseInterface {
	readonly ok: Boolean;
	readonly message: String;
	readonly data: any | any[];
	readonly validation: Object[];
	readonly token: AccessTokenInterface;
	constructor(
		ok: Boolean,
		message: String,
		data: any | any[],
		token?: AccessTokenInterface,
		validation?: Object[],
	) {
		this.ok = ok;
		this.message = message;
		this.data = data;
		this.validation = validation;
		this.token = token;
		this.validation = validation;
	}
}
