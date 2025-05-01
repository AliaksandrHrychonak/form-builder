import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';
import React, { memo } from 'react';

import { Config } from '@shared/config';
import { cn, FormFieldProvider, useClientTranslation } from '@shared/lib';
import {
    FormControl,
    FormItem,
    FormMessage,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Skeleton,
} from '@shared/ui';

import type {
    ENUM_POLICY_ROLE_TYPE,
    IRoleBasedSearchTemplateFilters,
    OrderDirectionSearchTemplateByField,
    OrderDirectionSearchTemplateTagByField,
} from '@shared/api';
import type { JSX } from 'react';
import type { Control, FieldPath } from 'react-hook-form';

interface ITemplateSearchOrderDirectionFilter<TRole extends ENUM_POLICY_ROLE_TYPE> {
    control: Control<IRoleBasedSearchTemplateFilters<TRole>>;
    isLoading?: boolean;
}

const { TEMPLATE } = Config;

export const TemplateSearchOrderDirectionFilter = <TRole extends ENUM_POLICY_ROLE_TYPE>({
    control,
    isLoading,
}: ITemplateSearchOrderDirectionFilter<TRole>): JSX.Element => {
    const { t } = useClientTranslation('search');
    if (isLoading) {
        return (
            <FormItem>
                <Skeleton className='h-9 w-[140px]' />
            </FormItem>
        );
    }
    return (
        <FormFieldProvider
            control={control}
            name={'orderDirection' as FieldPath<IRoleBasedSearchTemplateFilters<TRole>>}
            render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem className='min-w-[140px]'>
                    <Select onValueChange={onChange} defaultValue={String(value) ?? 'asc'} {...fieldProps}>
                        <FormControl>
                            <SelectTrigger className='flex items-center gap-1'>
                                <DirectionIcon direction={value as OrderDirectionSearchTemplateByField} />
                                <SelectValue placeholder={t('fields.orderDirection.placeholder')} className='w-full' />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {TEMPLATE.SEARCH_DEFAULT_ORDER_DIRECTION_TYPE.map((i) => (
                                <SelectItem value={i} key={i}>
                                    {t(`fields.orderDirection.options.${i}` as const)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

const DirectionIcon = memo(({ direction }: { direction?: OrderDirectionSearchTemplateTagByField }) => {
    return (
        <div className='relative h-4 w-4'>
            <ArrowUpNarrowWide
                className={cn(
                    'absolute h-4 w-4 inset-0 transition-opacity duration-200',
                    direction === 'asc' ? 'opacity-100' : 'opacity-0'
                )}
            />
            <ArrowDownNarrowWide
                className={cn(
                    'absolute h-4 w-4 inset-0 transition-opacity duration-200',
                    direction === 'desc' ? 'opacity-100' : 'opacity-0'
                )}
            />
        </div>
    );
});
DirectionIcon.displayName = 'DirectionIcon';
