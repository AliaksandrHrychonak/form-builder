import { Search } from 'lucide-react';
import React from 'react';

import { cn, FormFieldProvider, useClientTranslation } from '@shared/lib';
import { FormControl, FormItem, Input, Skeleton } from '@shared/ui';

import type { ENUM_POLICY_ROLE_TYPE, IRoleBasedSearchTemplateFilters } from '@shared/api';
import type { JSX } from 'react';
import type { Control, FieldPath } from 'react-hook-form';

interface ITemplateSearchQueryFilter<TRole extends ENUM_POLICY_ROLE_TYPE> {
    control: Control<IRoleBasedSearchTemplateFilters<TRole>>;
    isLoading?: boolean;
}

export const TemplateSearchQueryFilter = <TRole extends ENUM_POLICY_ROLE_TYPE>({
    control,
    isLoading,
}: ITemplateSearchQueryFilter<TRole>): JSX.Element => {
    const { t } = useClientTranslation('search');
    if (isLoading) {
        return (
            <FormItem>
                <Skeleton className='h-9 w-[250px]' />
            </FormItem>
        );
    }

    return (
        <FormFieldProvider
            control={control}
            name={'search' as FieldPath<IRoleBasedSearchTemplateFilters<TRole>>}
            render={({ field: { value, ...fieldProps } }) => (
                <FormItem>
                    <FormControl>
                        <div className='relative'>
                            <Search className='absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                            <Input
                                value={String(value ?? '')}
                                {...fieldProps}
                                placeholder={t('fields.search.placeholder')}
                                autoComplete='off'
                                className={cn(
                                    'w-[250px] transition-all duration-400 ease-in-out pl-9',
                                    'focus:w-[300px] focus:scale-105'
                                )}
                            />
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
};
