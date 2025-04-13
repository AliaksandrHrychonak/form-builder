import type {
    IErrorException,
    IErrorImportException,
    IMessageValidationError,
    IMessageValidationImportError,
    IMessageValidationImportErrorParam,
    ValidationError,
} from '../types';

interface IErrorHandler {
    formatValidationErrors: (errors: ValidationError[]) => IMessageValidationError[];
    formatImportErrors: (errors: IMessageValidationImportErrorParam[]) => IMessageValidationImportError[];
    handleError: (error: IErrorException | IErrorImportException) => {
        message: string;
        statusCode: number;
        errors: IMessageValidationError[] | IMessageValidationImportError[];
    };
}

export class ErrorHandler implements IErrorHandler {
    private static instance: ErrorHandler;

    private constructor() {}

    public static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    public formatValidationErrors(errors: ValidationError[]): IMessageValidationError[] {
        if (!errors) {
            return [];
        }

        return errors.map(
            (error: ValidationError): IMessageValidationError => ({
                property: error.property,
                message: Object.values(error.constraints ?? {})[0] ?? 'Unknown validation error',
            })
        );
    }

    public formatImportErrors(errors: IMessageValidationImportErrorParam[]): IMessageValidationImportError[] {
        return errors.map((error) => ({
            sheetName: error.sheetName,
            row: error.row,
            errors: this.formatValidationErrors(error.error),
        }));
    }

    public handleError(error: IErrorException | IErrorImportException): {
        message: string;
        statusCode: number;
        errors: IMessageValidationError[] | IMessageValidationImportError[];
    } {
        const isImportError =
            error.errors?.length && 'sheetName' in (error.errors[0] as IMessageValidationImportErrorParam);

        return {
            message: error.message,
            statusCode: error.statusCode,
            errors: isImportError
                ? this.formatImportErrors(error.errors as IMessageValidationImportErrorParam[])
                : this.formatValidationErrors(error.errors as ValidationError[]),
        };
    }
}

export const errorHandler = ErrorHandler.getInstance();
