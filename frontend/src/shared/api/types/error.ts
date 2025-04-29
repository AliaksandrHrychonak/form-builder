import type { IResponseMetadata } from '@shared/api';

export interface IMessageValidationError {
    property: string;
    message: string;
}

export interface ValidationError {
    target?: object;
    property: string;
    message: string;
    value?: unknown;
    constraints?: {
        [type: string]: string;
    };
    children?: ValidationError[];
    contexts?: {
        [type: string]: unknown;
    };
}

export interface IMessageValidationImportErrorParam {
    sheetName: string;
    row: number;
    error: ValidationError[];
}

export interface IMessageValidationImportError extends Omit<IMessageValidationImportErrorParam, 'error'> {
    errors: IMessageValidationError[];
}

export interface IErrorException {
    statusCode: number;
    message: string;
    errors?: IMessageValidationError[] | ValidationError[];
    data?: Record<string, unknown>;
    _metadata?: IResponseMetadata;
}

export interface IErrorImportException extends Omit<IErrorException, 'errors'> {
    statusCode: number;
    message: string;
    errors?: IMessageValidationImportErrorParam[] | IMessageValidationImportError[];
    data?: Record<string, unknown>;
    _metadata?: IResponseMetadata;
}
