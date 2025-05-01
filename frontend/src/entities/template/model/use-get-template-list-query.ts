import { useInfiniteQuery } from '@tanstack/react-query';

import { getTemplateListApi } from '@entities/template/api';
import { TEMPLATES_TAG } from '@shared/api';

import type {
    ENUM_POLICY_ROLE_TYPE,
    IErrorException,
    IResponseElasticsearch,
    IRoleBasedSearchTemplateFilters,
    ISearchTemplate,
} from '@shared/api';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

interface UseGetTemplateListQueryProps<R extends ENUM_POLICY_ROLE_TYPE> {
    filters: IRoleBasedSearchTemplateFilters<R>;
    enabled?: boolean;
}

export const useGetTemplateListQuery = <R extends ENUM_POLICY_ROLE_TYPE>({
    filters,
    enabled,
}: UseGetTemplateListQueryProps<R>): UseInfiniteQueryResult<
    InfiniteData<IResponseElasticsearch<ISearchTemplate[]>, unknown>,
    AxiosError<IErrorException>
> => {
    return useInfiniteQuery({
        enabled,
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
