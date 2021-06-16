import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
    constructor() {
        super('NotFound', HttpStatus.NOT_FOUND)
    }
}