import { Inject, Injectable, mixin, PipeTransform, Type } from '@nestjs/common';
import { Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { IRequestApp } from '../../request/interfaces/request.interface';

export function ElasticsearchFilterInPipe(
    field: string,
    options?: { fieldPath?: string }
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class ElasticsearchFilterInPipeMixin implements PipeTransform {
        constructor(@Inject(REQUEST) protected readonly request: IRequestApp) {}

        transform(value: string): Record<string, any> {
            if (!value) {
                return {};
            }

            const values = value.split(',').map(val => val.trim());

            if (!values.length) {
                return {};
            }

            const fieldPath = options?.fieldPath || field;

            this.addToRequestInstance(field, values);

            return {
                _elasticQuery: {
                    filter: [
                        {
                            ...(values.length === 1
                                ? { term: { [fieldPath]: values[0] } }
                                : { terms: { [fieldPath]: values } }),
                        },
                    ],
                },
            };
        }

        addToRequestInstance(field: string, values: string[]): void {
            this.request.__elasticsearch = {
                ...this.request.__elasticsearch,
                filters: {
                    ...(this.request.__elasticsearch?.filters || {}),
                    [field]: values,
                },
            };
        }
    }

    return mixin(ElasticsearchFilterInPipeMixin);
}
