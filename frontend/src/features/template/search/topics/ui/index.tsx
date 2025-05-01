import React from 'react';

import { Config } from '@shared/config';
import { cn, FormFieldProvider } from '@shared/lib';
import { Checkbox, FormControl, FormItem, FormLabel, FormMessage, Skeleton } from '@shared/ui';

import type { ENUM_POLICY_ROLE_TYPE, EnumSearchTemplateByTopics, IRoleBasedSearchTemplateFilters } from '@shared/api';
import type { JSX } from 'react';
import type { Control, FieldPath } from 'react-hook-form';

interface ITemplateSearchTopicsFilter<TRole extends ENUM_POLICY_ROLE_TYPE> {
    control: Control<IRoleBasedSearchTemplateFilters<TRole>>;
    isMultipleChoice: boolean;
    isLoading?: boolean;
}

const { TEMPLATE } = Config;

export const TemplateSearchTopicsFilter = <TRole extends ENUM_POLICY_ROLE_TYPE>({
    control,
    isMultipleChoice = false,
    isLoading,
}: ITemplateSearchTopicsFilter<TRole>): JSX.Element => {
    if (isLoading) {
        return (
            <FormItem className='flex gap-2 items-center'>
                {Array.from({ length: TEMPLATE.SEARCH_DEFAULT_TEMPLATE_TOPICS.length }).map((_i, index) => (
                    <Skeleton className='h-9 w-25' key={index} />
                ))}
            </FormItem>
        );
    }

    return (
        <FormFieldProvider
            control={control}
            name={'topics' as FieldPath<IRoleBasedSearchTemplateFilters<TRole>>}
            render={() => (
                <FormItem className='flex flex-wrap gap-2 items-center'>
                    {Object.values(TEMPLATE.SEARCH_DEFAULT_TEMPLATE_TOPICS).map((item) => (
                        <FormFieldProvider
                            key={item}
                            control={control}
                            name={'topics' as FieldPath<IRoleBasedSearchTemplateFilters<TRole>>}
                            render={({ field: { value, onChange, ...fieldProps } }) => {
                                const values = Array.isArray(value) ? (value as EnumSearchTemplateByTopics[]) : [];
                                const isSelected = values.includes(item);

                                const handleChange = (checked: boolean): void => {
                                    if (checked) {
                                        onChange(isMultipleChoice ? [...values, item] : [item]);
                                    } else {
                                        onChange(values.filter((v) => v !== item));
                                    }
                                };

                                return (
                                    <FormItem key={item} className='flex flex-row items-start space-x-3 space-y-0'>
                                        <FormControl>
                                            <Checkbox
                                                {...fieldProps}
                                                checked={isSelected}
                                                onCheckedChange={handleChange}
                                                className='hidden'
                                                id={`checkbox-${item}`}
                                            />
                                        </FormControl>
                                        <FormLabel
                                            htmlFor={`checkbox-${item}`}
                                            className={cn(
                                                'inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:text-muted hover:text-destructive/75 px-2 py-1 capitalize max-[550px]:text-base',
                                                isSelected ? 'text-destructive' : ''
                                            )}
                                        >
                                            {item.toLowerCase()}
                                        </FormLabel>
                                    </FormItem>
                                );
                            }}
                        />
                    ))}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
