import { AccessTokenInterface } from "./access_token.interface";

export interface HttpResponseInterface {
    ok: Boolean;
    token?: AccessTokenInterface;
    message: String;
    data: any | any[]; 
    validation?: object[]
}