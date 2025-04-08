export interface IResponseCustomPropertyMetadata {}

export interface IResponse<T> extends IResponseCustomPropertyMetadata {
    data: T;
}
