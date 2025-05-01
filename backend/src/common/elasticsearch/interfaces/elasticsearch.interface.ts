import { ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE } from '../constants/elasticsearch.enum.constant';

export interface IElasticsearchQueryOptions {
    defaultPerPage?: number;
    defaultOrderBy?: string;
    defaultOrderDirection?: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE;
    availableOrderBy?: string[];
    searchFields?: Array<{
        field: string;
        boost?: number;
    }>;
}

export interface IElasticsearchQuery {
    must?: any[];
    filter?: any[];
    should?: any[];
    must_not?: any[];
}

export interface IElasticsearchPagination {
    page: number;
    perPage: number;
    from: number;
    size: number;
}
