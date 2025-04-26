import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from '../constants/request.status-code.constant';

export class RequestValidationException extends Error {
    readonly httpStatus: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
    readonly statusCode: number =
        ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR;
    readonly errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super('request.validation');

        this.errors = errors;
    }
}
