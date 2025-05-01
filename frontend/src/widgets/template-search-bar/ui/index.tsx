'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { useStore } from 'zustand';

import { useSearchTemplateStore } from '@entities/template';
import {
    TemplateSearchOrderByFilter,
    TemplateSearchOrderDirectionFilter,
    TemplateSearchQueryFilter,
    TemplateSearchTagsFilter,
    TemplateSearchTopicsFilter,
} from '@features/template';
import { ENUM_POLICY_ROLE_TYPE } from '@shared/api';
import { Form } from '@shared/ui';

import { getSearchSchema } from '../model';

import type { IRoleBasedSearchTemplateFilters } from '@shared/api';
import type { JSX } from 'react';

export const TemplateSearchBar = (): JSX.Element => {
    // const { t } = useClientTranslation();
    const { data: session } = useSession();
    const role = session?.roleType ?? ENUM_POLICY_ROLE_TYPE.PUBLIC;

    const store = useSearchTemplateStore(role);
    const hasHydrated = useStore(store, (state) => state._hasHydrated);
    const filters = useStore(store, (state) => state.filters);
    const setFilters = useStore(store, (state) => state.setFilters);
    const searchSchema = getSearchSchema(role);

    const form = useForm<IRoleBasedSearchTemplateFilters<typeof role>>({
        resolver: zodResolver(searchSchema),
        defaultValues: filters,
        mode: 'all',
    });

    const onSubmit = useDebouncedCallback((values: IRoleBasedSearchTemplateFilters<typeof role>) => {
        setFilters(values);
    }, 500);

    useEffect(() => {
        if (hasHydrated) {
            Object.entries(filters).forEach(([key, value]) => {
                form.setValue(
                    key as keyof IRoleBasedSearchTemplateFilters<typeof role>,
                    value as IRoleBasedSearchTemplateFilters<typeof role>[keyof IRoleBasedSearchTemplateFilters<
                        typeof role
                    >]
                );
            });
        }
    }, [form, hasHydrated, filters]);

    useEffect(() => {
        const subscription = form.watch((value) => {
            onSubmit(value as IRoleBasedSearchTemplateFilters<typeof role>);
        });

        return (): void => subscription.unsubscribe();
    }, [form, onSubmit]);

    const canView = [!hasHydrated].some(Boolean);

    return (
        <Form {...form}>
            <form noValidate className='w-full flex size-full flex-col gap-8 my-8' onSubmit={(e) => e.preventDefault()}>
                <div className='flex items-center justify-between max-[850px]:flex-col-reverse max-[850px]:items-start gap-8 mx-[50px] w-[calc(100%-100px)] max-[850px]:mx-[10px] max-[850px]:w-[calc(100%-20px)] py-1'>
                    <TemplateSearchTopicsFilter<typeof role>
                        control={form.control}
                        isMultipleChoice={false}
                        isLoading={canView}
                    />
                    <TemplateSearchQueryFilter<typeof role> control={form.control} isLoading={canView} />
                </div>

                <TemplateSearchTagsFilter<typeof role> control={form.control} role={role} isLoading={canView}>
                    <TemplateSearchOrderByFilter<typeof role> control={form.control} isLoading={canView} />
                    <TemplateSearchOrderDirectionFilter<typeof role> control={form.control} isLoading={canView} />
                </TemplateSearchTagsFilter>
            </form>
        </Form>
    );
};
