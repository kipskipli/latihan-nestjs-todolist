import * as Joi from "joi";
import { Injectable, PipeTransform } from "@nestjs/common";
import { BadRequestException } from "../exceptions";

@Injectable()
export abstract class JoiValidationPipe implements PipeTransform<unknown> {
  public transform(value: unknown): unknown {
    const result = this.buildSchema().validate(value);
    if (result.error) {
      const validation = this._transformValidationMessage(result.error);
      throw new BadRequestException(validation);
    }

    return result.value;
  }

  private _transformValidationMessage(error) {
    const message = {};
    error.details.forEach(err => {
      message[err.path] = [err.message.replace(/"/g, ``)];
    });
    return message;
  }

  public abstract buildSchema(): Joi.Schema;
}
