import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { ElasticsearchService } from '../services/elasticsearch.service';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE } from '../constants/elasticsearch.enum.constant';
import {
    ELASTICSEARCH_DEFAULT_AVAILABLE_ORDER_BY,
    ELASTICSEARCH_DEFAULT_AVAILABLE_ORDER_DIRECTION,
    ELASTICSEARCH_DEFAULT_ORDER_BY,
} from '../constants/elasticsearch.constant';

export function ElasticsearchOrderPipe(
    defaultOrderBy: string = ELASTICSEARCH_DEFAULT_ORDER_BY,
    defaultOrderDirection: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE,
    availableOrderBy: string[] = ELASTICSEARCH_DEFAULT_AVAILABLE_ORDER_BY
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class ElasticsearchOrderPipeMixin implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly elasticsearchService: ElasticsearchService
        ) {}

        transform(value: Record<string, any>): Record<string, any> {
            if (!value) {
                return {};
            }

            const orderBy = this.validateOrderBy(
                value?.orderBy,
                defaultOrderBy,
                availableOrderBy
            );
            const orderDirection = this.validateOrderDirection(
                value?.orderDirection,
                defaultOrderDirection
            );

            const availableOrderDirection =
                ELASTICSEARCH_DEFAULT_AVAILABLE_ORDER_DIRECTION;

            this.addToRequestInstance(
                orderBy,
                orderDirection,
                availableOrderBy,
                availableOrderDirection
            );

            return {
                ...value,
                orderBy,
                orderDirection,
                _order: {
                    field: orderBy,
                    direction:
                        orderDirection.toLowerCase() as ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE,
                },
                _availableOrderBy: availableOrderBy,
                _availableOrderDirection: availableOrderDirection,
            };
        }

        private validateOrderBy(
            orderBy: string,
            defaultOrderBy: string,
            availableOrderBy: string[]
        ): string {
            return availableOrderBy.includes(orderBy)
                ? orderBy
                : defaultOrderBy;
        }

        private validateOrderDirection(
            direction: string,
            defaultDirection: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE
        ): ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE {
            const normalizedDirection = direction;
            return Object.values(
                ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE
            ).includes(
                normalizedDirection as ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE
            )
                ? (normalizedDirection as ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE)
                : defaultDirection;
        }

        private addToRequestInstance(
            orderBy: string,
            orderDirection: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE,
            availableOrderBy: string[],
            availableOrderDirection: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE[]
        ): void {
            this.request.__elasticsearch = {
                ...this.request.__elasticsearch,
                sort: {
                    orderBy,
                    orderDirection,
                    availableOrderBy,
                    availableOrderDirection,
                },
            };
        }
    }

    return mixin(ElasticsearchOrderPipeMixin);
}
