declare namespace Express {
  export interface Request {
    user?: import("@inspigoid/inspigo-utils-ts/lib/interface").IJwtOrApiKeyPayload;
  }
}
