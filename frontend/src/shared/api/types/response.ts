export interface IResponseCustomProperty {
    statusCode?: number;
    message?: string;
    httpStatus?: string;
    messageProperties?: Record<string, string | number>;
}

export interface IResponseMetadata {
    customProperty?: IResponseCustomProperty;
    [key: string]: unknown;
}

export interface IResponse<T> extends IResponseCustomProperty {
    data: T;
}
