import * as Joi from "joi";
import { Injectable, PipeTransform } from "@nestjs/common";
import { BadRequestException } from "../server/response/http-exception";

@Injectable()
export abstract class JoiValidationPipe implements PipeTransform<unknown> {
  public transform(value: unknown): unknown {
    const result = this.buildSchema().validate(value);

    if (result.error) {
      throw new BadRequestException(result.error.message.replace(/"/g, `'`));
    }

    return result.value;
  }

  public abstract buildSchema(): Joi.Schema;
}
