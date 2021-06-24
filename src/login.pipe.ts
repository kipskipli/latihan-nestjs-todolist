import * as Joi from 'joi';
import { JoiValidationPipe } from './common/pipe/joi_validation.pipe';
export class LoginPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<any>({
            username: Joi.string().required(),
            password: Joi.string().required().min(5)
        });

    }
}