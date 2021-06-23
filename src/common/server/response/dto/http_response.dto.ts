import {
  AccessTokenInterface,
  HttpResponseInterface,
} from "src/common/interface";
export class HttpResponseDto implements HttpResponseInterface {
  readonly ok: boolean;
  readonly message: string;
  readonly data: any | any[];
  readonly validation: Object[];
  readonly token: AccessTokenInterface;
  constructor(
    ok: boolean,
    message: string,
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
