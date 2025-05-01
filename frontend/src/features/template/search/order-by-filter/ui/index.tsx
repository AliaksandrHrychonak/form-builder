import { ListOrdered } from 'lucide-react';
import React from 'react';

import { Config } from '@shared/config';
import { FormFieldProvider, useClientTranslation } from '@shared/lib';
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

import type { ENUM_POLICY_ROLE_TYPE, IRoleBasedSearchTemplateFilters } from '@shared/api';
import type { JSX } from 'react';
import type { Control, FieldPath } from 'react-hook-form';

interface ITemplateSearchOrderByFilter<TRole extends ENUM_POLICY_ROLE_TYPE> {
    control: Control<IRoleBasedSearchTemplateFilters<TRole>>;
    isLoading?: boolean;
}

const { TEMPLATE } = Config;

export const TemplateSearchOrderByFilter = <TRole extends ENUM_POLICY_ROLE_TYPE>({
    control,
    isLoading,
}: ITemplateSearchOrderByFilter<TRole>): JSX.Element => {
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
            name={'orderBy' as FieldPath<IRoleBasedSearchTemplateFilters<TRole>>}
            render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem className='min-w-[140px]'>
                    <Select onValueChange={onChange} defaultValue={String(value)} {...fieldProps}>
                        <FormControl>
                            <SelectTrigger className='flex items-center gap-1'>
                                <ListOrdered className='h-4 w-4' />
                                <SelectValue placeholder={t('fields.orderBy.placeholder')} className='w-full' />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {TEMPLATE.SEARCH_DEFAULT_ORDER_BY.map((i) => (
                                <SelectItem value={i} key={i}>
                                    {t(`fields.orderBy.options.${i}` as const)}
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
