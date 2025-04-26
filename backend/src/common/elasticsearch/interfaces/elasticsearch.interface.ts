import { ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE } from '../constants/elasticsearch.enum.constant';

export interface IElasticsearchQueryOptions {
    defaultPerPage?: number;
    defaultOrderBy?: string;
    defaultOrderDirection?: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE;
    searchFields?: Array<{
        field: string;
        boost?: number;
    }>;
    availableOrderBy?: string[];
}

export interface IElasticsearchFilterOptions {
    queryField?: string;
    boost?: number;
}

export interface IElasticsearchFilterRangeOptions
    extends IElasticsearchFilterOptions {
    format?: string;
}

export interface IElasticsearchFilterMatchOptions
    extends IElasticsearchFilterOptions {
    operator?: 'and' | 'or';
    fuzziness?: string | number;
}

export interface IElasticsearchQuery {
    must?: any[];
    filter?: any[];
    should?: any[];
    must_not?: any[];
}

export interface IElasticsearchSort {
    field: string;
    order: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE;
}

export interface IElasticsearchPagination {
    page: number;
    perPage: number;
    from: number;
    size: number;
}

export type IElasticsearchOrder = Record<
    string,
    ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE
>;
