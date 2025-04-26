import { Request } from 'express';
import { ResponsePagingMetadataPaginationDto } from 'src/common/response/dtos/response.paging.dto';
import { ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE } from '../../elasticsearch/constants/elasticsearch.enum.constant';

interface IElasticsearchRequest {
    pagination?: {
        page: number;
        perPage: number;
    };
    search?: {
        query: string;
        availableFields: string[];
    };
    sort?: {
        orderBy: string;
        orderDirection: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE;
        availableOrderBy: string[];
        availableOrderDirection: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE[];
    };
}

export interface IRequestApp<
    T = Record<string, any>,
    N = Record<string, any>,
    B = Record<string, any>,
    C = Record<string, any>,
    F = Record<string, any>,
> extends Request {
    apiKey?: B;
    user?: T;
    template?: C;
    __user?: N;
    __template?: F;

    __language: string;
    __version: string;

    __pagination?: ResponsePagingMetadataPaginationDto;

    __elasticsearch?: IElasticsearchRequest;
}
