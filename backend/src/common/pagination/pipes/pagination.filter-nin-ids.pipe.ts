import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { IPaginationFilterOptions } from 'src/common/pagination/interfaces/pagination.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';

export function PaginationFilterNinIdsPipe(
    field: string,
    options?: IPaginationFilterOptions
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class MixinPaginationFilterNinIdsPipe implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly paginationService: PaginationService
        ) {}

        async transform(value: string): Promise<Record<string, any>> {
            if (!value) {
                return undefined;
            }

            if (options?.raw) {
                this.addToRequestInstance(value);
                return {
                    [field]: value,
                };
            }

            const finalValue: string[] = value
                ? value.split(',').filter(Boolean)
                : [];

            this.addToRequestInstance(finalValue);
            return this.paginationService.filterNin(field, finalValue);
        }

        addToRequestInstance(value: any): void {
            this.request.__pagination = {
                ...this.request.__pagination,
                filters: this.request.__pagination?.filters
                    ? {
                          ...this.request.__pagination?.filters,
                          [field]: value,
                      }
                    : { [field]: value },
            };
        }
    }

    return mixin(MixinPaginationFilterNinIdsPipe);
}
