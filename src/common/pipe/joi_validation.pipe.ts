import * as Joi from "joi";
import { Injectable, PipeTransform } from "@nestjs/common";
import { BadRequestException } from "../server/response/http-exception";

@Injectable()
export abstract class JoiValidationPipe implements PipeTransform<unknown> {
  public transform(value: unknown): unknown {
    const result = this.buildSchema().validate(value);
    let validation = this._transformValidationMessage(result.error);
    if (result.error) {
      throw new BadRequestException(validation);
    }

    return result.value;
  }

  _transformValidationMessage(error) {
      let message = {};
      error.details.forEach(err => {
          message[err.path] = [err.message.replace(/"/g, ``)];
      });
      return message;
  }

  public abstract buildSchema(): Joi.Schema;
}
