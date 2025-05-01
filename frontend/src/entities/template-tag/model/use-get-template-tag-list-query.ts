import { useInfiniteQuery } from '@tanstack/react-query';

import { TEMPLATES_TAG_FILTER_TAG } from '@shared/api';

import { getTemplateTagListApi } from '../api';
import { useSearchTemplateTagStore } from './search-store';

import type { ENUM_POLICY_ROLE_TYPE, IErrorException, IResponsePaging, ITemplateTag } from '@shared/api';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export const useGetTemplateTagListQuery = (
    role: ENUM_POLICY_ROLE_TYPE
): UseInfiniteQueryResult<InfiniteData<IResponsePaging<ITemplateTag[]>, unknown>, AxiosError<IErrorException>> => {
    const filters = useSearchTemplateTagStore(role).filters;

    return useInfiniteQuery({
        queryKey: [TEMPLATES_TAG_FILTER_TAG, filters],
        queryFn: ({ pageParam = filters.page }) =>
            getTemplateTagListApi({
                ...filters,
                page: pageParam,
            }),
        initialPageParam: filters.page,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalPages = lastPage._metadata?.pagination.totalPage;
            return currentPage < (totalPages ?? 0) ? currentPage + 1 : undefined;
        },
        getPreviousPageParam: (_, allPages) => {
            const currentPage = allPages.length;
            return currentPage > 1 ? currentPage - 1 : undefined;
        },
    });
};
