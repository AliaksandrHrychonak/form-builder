import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { ElasticsearchService } from '../services/elasticsearch.service';

export function ElasticsearchSearchPipe(
    searchFields?: Array<{ field: string; boost?: number }>
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class ElasticsearchSearchPipeMixin implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly elasticsearchService: ElasticsearchService
        ) {}

        transform(value: Record<string, any>): Record<string, any> {
            if (!value) {
                return {};
            }

            this.addToRequestInstance(
                value?.search,
                searchFields?.map(field => field.field) || []
            );

            if (!searchFields?.length || !value?.search) {
                return value;
            }

            const searchQuery = this.elasticsearchService.buildSearch(
                searchFields,
                value.search
            );

            if (!searchQuery) {
                return value;
            }

            return {
                ...value,
                _elasticQuery: {
                    ...value._elasticQuery,
                    must: [...(value._elasticQuery?.must || []), searchQuery],
                },
                _availableSearchFields: searchFields,
            };
        }

        addToRequestInstance(
            search: string,
            availableSearchFields: string[]
        ): void {
            this.request.__elasticsearch = {
                ...this.request.__elasticsearch,
                search: {
                    query: search,
                    availableFields: availableSearchFields,
                },
            };
        }
    }

    return mixin(ElasticsearchSearchPipeMixin);
}
