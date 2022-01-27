import { HttpStatus } from "@nestjs/common";
import { HTTPError } from "got/dist/source";
import { InternalServerErrorException } from "../exceptions";

export class GotApiBaseService {
  protected errorHandler(e: HTTPError) {
    if (e.response) {
      const { statusCode } = e.response;
      const err = this.createApiRequestError(e);
      if (statusCode === HttpStatus.NOT_FOUND) {
        return null;
      }
      throw new InternalServerErrorException(err);
    } else {
      throw new InternalServerErrorException(e);
    }
  }

  protected createApiRequestError(e: HTTPError) {
    return {
      requestApi: {
        url: e.response.requestUrl,
        method: e.options.method,
        data: e.response.body || "Internal Server Error"
      }
    };
  }
}
