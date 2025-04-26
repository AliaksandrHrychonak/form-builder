import { Injectable } from '@nestjs/common';
import { ElasticsearchService as BaseElasticsearchService } from '@nestjs/elasticsearch';
import {
    IndexRequest,
    IndicesCreateRequest,
    IndicesExistsRequest,
    SearchRequest,
    SearchResponse,
} from '@elastic/elasticsearch/lib/api/types';
import { IElasticsearchPagination } from '../interfaces/elasticsearch.interface';

@Injectable()
export class ElasticsearchService {
    constructor(
        private readonly elasticsearchService: BaseElasticsearchService
    ) {}

    async createIndex(params: IndicesCreateRequest) {
        return await this.elasticsearchService.indices.create(params);
    }

    async indexExists(params: IndicesExistsRequest) {
        return await this.elasticsearchService.indices.exists(params);
    }

    async searchWithSettings<T>(
        params: SearchRequest
    ): Promise<SearchResponse<T>> {
        return await this.elasticsearchService.search(params);
    }

    async index(params: IndexRequest) {
        return await this.elasticsearchService.index(params);
    }

    buildSearch(
        searchFields: Array<{ field: string; boost?: number }>,
        query?: string
    ): any {
        if (!query) {
            return null;
        }

        return {
            multi_match: {
                query,
                fields: searchFields.map(field =>
                    field.boost ? `${field.field}^${field.boost}` : field.field
                ),
                type: 'best_fields',
            },
        };
    }

    buildPaging(page = 1, perPage = 10): IElasticsearchPagination {
        const validPage = Math.max(1, page);
        const validPerPage = Math.max(1, perPage);

        return {
            page: validPage,
            perPage: validPerPage,
            from: (validPage - 1) * validPerPage,
            size: validPerPage,
        };
    }

    async bulk(params: {
        refresh?: boolean | 'true' | 'false' | 'wait_for';
        operations: Array<{
            index: {
                _index: string;
                _id: string;
            };
            doc: any;
        }>;
    }): Promise<any> {
        const body = params.operations.flatMap(op => [
            { index: { _index: op.index._index, _id: op.index._id } },
            op.doc,
        ]);

        return await this.elasticsearchService.bulk({
            refresh: params.refresh,
            body,
        });
    }

    async bulkDelete(params: { index: string; ids: string[] }): Promise<any> {
        const operations = {
            body: params.ids.flatMap(id => [
                {
                    delete: {
                        _index: params.index,
                        _id: id,
                    },
                },
            ]),
        };

        return await this.elasticsearchService.bulk(operations);
    }

    async update(params: {
        index: string;
        id: string;
        doc?: any;
        script?: {
            source: string;
            params?: Record<string, any>;
        };
        refresh?: boolean | 'true' | 'false' | 'wait_for';
    }): Promise<any> {
        const updateParams: any = {
            index: params.index,
            id: params.id,
            refresh: params.refresh,
        };

        if (params.doc) {
            updateParams.doc = params.doc;
        }

        if (params.script) {
            updateParams.script = params.script;
        }

        return await this.elasticsearchService.update(updateParams);
    }
}
