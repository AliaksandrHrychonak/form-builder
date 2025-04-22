import { HttpStatus } from '@nestjs/common';
import { ENUM_FILE_STATUS_CODE_ERROR } from 'src/common/file/constants/file.status-code.constant';
import { IMessageValidationImportErrorParam } from 'src/common/message/interfaces/message.interface';

export class FileImportException extends Error {
    readonly httpStatus: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
    readonly statusCode: number =
        ENUM_FILE_STATUS_CODE_ERROR.VALIDATION_DTO_ERROR;
    readonly errors: IMessageValidationImportErrorParam[];

    constructor(errors: IMessageValidationImportErrorParam[]) {
        super('file.error.validationDto');

        this.errors = errors;
    }
}
