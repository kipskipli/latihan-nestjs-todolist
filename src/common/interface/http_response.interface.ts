import { AccessTokenInterface } from "src/common/interface";
export interface HttpResponseInterface {
  ok: Boolean;
  token?: AccessTokenInterface;
  message: String;
  data: any | any[];
  validation?: object[];
}
