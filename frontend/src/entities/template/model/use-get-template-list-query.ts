import { useInfiniteQuery } from '@tanstack/react-query';

import { useSearchTemplateStore } from '@entities/template';
import { getTemplateListApi } from '@entities/template/api';
import { TEMPLATES_TAG } from '@shared/api';

import type { ENUM_POLICY_ROLE_TYPE, IErrorException, IResponseElasticsearch, ISearchTemplate } from '@shared/api';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export const useGetTemplateListQuery = (
    role: ENUM_POLICY_ROLE_TYPE
): UseInfiniteQueryResult<
    InfiniteData<IResponseElasticsearch<ISearchTemplate[]>, unknown>,
    AxiosError<IErrorException>
> => {
    const filters = useSearchTemplateStore(role).getState().filters;

    return useInfiniteQuery({
        queryKey: [TEMPLATES_TAG, filters],
        queryFn: ({ pageParam = filters.page }) =>
            getTemplateListApi({
                ...filters,
                page: pageParam,
            }),
        initialPageParam: filters.page,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalPages = lastPage._metadata?.elasticsearch?.pagination.totalPage;
            return currentPage < (totalPages ?? 0) ? currentPage + 1 : undefined;
        },
        getPreviousPageParam: (_, allPages) => {
            const currentPage = allPages.length;
            return currentPage > 1 ? currentPage - 1 : undefined;
        },
    });
};
