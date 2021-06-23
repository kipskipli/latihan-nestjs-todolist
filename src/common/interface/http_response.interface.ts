import { AccessTokenInterface } from "src/common/interface";
export interface HttpResponseInterface {
  ok: boolean;
  token?: AccessTokenInterface;
  message: string;
  data: any | any[];
  validation?: object[];
}
