import { IPaginateQuery } from "@inspigoid/inspigo-utils-ts/lib/interface";
import Joi from "joi";
import { JoiValidationPipe } from "./joi-validation.pipe";

export class PaginationQueryValidationPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<IPaginateQuery>({
      limit: Joi.number().min(1).max(1000).default(10),
      skip: Joi.number().min(0).default(0)
    }).unknown();
  }
}
