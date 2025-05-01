export interface IResponseCustomProperty {
    statusCode?: number;
    message?: string;
    httpStatus?: string;
    messageProperties?: Record<string, string | number>;
}

export interface IResponseMetadata {
    language?: string;
    timestamp?: number;
    timezone?: string;
    path?: string;
    version?: string;
    repoVersion?: string;

    [key: string]: unknown;
}

export interface IResponsePagingPagination {
    page: number;
    perPage: number;
    totalPage: number;
    total: number;
}

export interface IResponseMetadataPaging extends IResponseMetadata {
    pagination: IResponsePagingPagination;
}

export interface IResponseMetadataElasticsearch extends IResponseMetadata {
    elasticsearch: {
        pagination: IResponsePagingPagination;
        search?: {
            query?: string;
            availableFields?: string[];
            [key: string]: unknown;
        };
        sort?: {
            [key: string]: unknown;
        };
        cursor?: {
            [key: string]: unknown;
        };
        [key: string]: unknown;
    };
}

export interface IResponse<T> extends IResponseCustomProperty {
    data: T;
}

export interface IResponsePaging<T> {
    _metadata?: IResponseMetadataPaging;
    data: T;
}

export interface IResponseElasticsearch<T> {
    _metadata?: IResponseMetadataElasticsearch;
    data: T;
}
