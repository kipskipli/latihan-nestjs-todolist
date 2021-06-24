import {
  AccessTokenInterface,
  HttpResponseInterface,
} from "src/common/interface";
export class HttpResponseDto implements HttpResponseInterface {
  readonly ok: boolean;
  readonly message: string;
  readonly data: any;
  readonly validation: any;
  readonly token: AccessTokenInterface;
  constructor(
    ok: boolean,
    message: string,
    data: any,
    token?: AccessTokenInterface,
    validation?: any,
  ) {
    this.ok = ok;
    this.message = message;
    this.data = data;
    this.token = token;
    this.validation = validation;
  }
}
