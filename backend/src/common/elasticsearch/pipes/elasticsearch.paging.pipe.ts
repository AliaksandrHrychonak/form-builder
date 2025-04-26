import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { ElasticsearchService } from '../services/elasticsearch.service';
import {
    ELASTICSEARCH_DEFAULT_MAX_PAGE,
    ELASTICSEARCH_DEFAULT_MAX_PER_PAGE,
    ELASTICSEARCH_DEFAULT_PAGE,
} from '../constants/elasticsearch.constant';

export function ElasticsearchPagingPipe(
    defaultPerPage: number = ELASTICSEARCH_DEFAULT_PAGE
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class ElasticsearchPagingPipeMixin implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly elasticsearchService: ElasticsearchService
        ) {}

        transform(value: Record<string, any>): Record<string, any> {
            if (!value) {
                return {};
            }

            const page = this.normalizePage(
                value?.page ? Number.parseInt(value.page) : 1
            );

            const perPage = this.normalizePerPage(
                Number.parseInt(value?.perPage ?? defaultPerPage)
            );

            const pagination = this.elasticsearchService.buildPaging(
                page,
                perPage
            );

            this.addToRequestInstance(page, perPage);

            return {
                ...value,
                page,
                perPage,
                _limit: perPage,
                _offset: pagination.from,
                _pagination: pagination,
            };
        }

        private normalizePage(page: number): number {
            if (isNaN(page) || page < 1) {
                return 1;
            }
            return page > ELASTICSEARCH_DEFAULT_MAX_PAGE
                ? ELASTICSEARCH_DEFAULT_MAX_PAGE
                : page;
        }

        private normalizePerPage(perPage: number): number {
            if (isNaN(perPage) || perPage < 1) {
                return ELASTICSEARCH_DEFAULT_PAGE;
            }
            return perPage > ELASTICSEARCH_DEFAULT_MAX_PER_PAGE
                ? ELASTICSEARCH_DEFAULT_MAX_PER_PAGE
                : perPage;
        }

        private addToRequestInstance(page: number, perPage: number): void {
            this.request.__elasticsearch = {
                ...this.request.__elasticsearch,
                pagination: {
                    page,
                    perPage,
                },
            };
        }
    }

    return mixin(ElasticsearchPagingPipeMixin);
}
