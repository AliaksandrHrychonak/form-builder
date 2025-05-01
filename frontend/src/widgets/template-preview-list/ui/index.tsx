'use client';

import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useStore } from 'zustand';

import {
    TemplateCard,
    TemplateCardSkeleton,
    useGetTemplateListQuery,
    useSearchTemplateStore,
} from '@entities/template';
import { useGetTemplateTagListQuery } from '@entities/template-tag';
import { ENUM_POLICY_ROLE_TYPE } from '@shared/api';
import { useClientTranslation } from '@shared/lib';

import type { ISearchTemplate } from '@shared/api';
import type { JSX } from 'react';

export const TemplateSearchPreviewList = (): JSX.Element => {
    const { t } = useClientTranslation('template');
    const { data: session } = useSession();
    const role = session?.roleType ?? ENUM_POLICY_ROLE_TYPE.PUBLIC;
    const store = useSearchTemplateStore(role);

    const hasHydrated = useStore(store, (state) => state._hasHydrated);
    const filters = useStore(store, (state) => state.filters);

    const { isSuccess: isTagsLoaded } = useGetTemplateTagListQuery(role);

    const isDependenciesReady = hasHydrated && isTagsLoaded;

    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetTemplateListQuery({
        filters,
        enabled: isDependenciesReady,
    });

    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '100px',
    });

    const templates: ISearchTemplate[] = data?.pages?.flatMap((page) => page.data ?? []) ?? [];

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

    if (isLoading) {
        return (
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <TemplateCardSkeleton key={index} />
                ))}
            </section>
        );
    }

    if (!data?.pages?.[0]?.data?.length) {
        return (
            <section className='flex items-center justify-center p-58 text-muted-foreground'>{t('notFound')}</section>
        );
    }

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {templates.map((template) => (
                <TemplateCard key={template._id} {...template} />
            ))}

            <div ref={ref} className='col-span-full h-4'>
                {hasNextPage && isFetchingNextPage && (
                    <div className='flex justify-center p-4'>
                        <Loader2 className='h-6 w-6 animate-spin' />
                    </div>
                )}
            </div>
        </section>
    );
};
