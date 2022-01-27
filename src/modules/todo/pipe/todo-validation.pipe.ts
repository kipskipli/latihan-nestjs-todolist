import Joi from "joi";
import { JoiValidationPipe } from "src/common/pipe";
import { CreateTodoDto } from "../dto";

export class TodoValidationPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<CreateTodoDto>({
      title: Joi.string().required().min(3),
      description: Joi.string().required().min(3)
    });
  }
}
