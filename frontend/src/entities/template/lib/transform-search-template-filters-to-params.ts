import type { ENUM_POLICY_ROLE_TYPE, IRoleBasedSearchTemplateFilters } from '@shared/api';

export const transformSearchTemplateFiltersToParams = <R extends ENUM_POLICY_ROLE_TYPE>({
    search,
    page,
    perPage,
    orderBy,
    orderDirection,
    topics,
    tags,
}: IRoleBasedSearchTemplateFilters<R>): URLSearchParams => {
    const params = new URLSearchParams();

    if (search) params.append('search', search);
    if (page) params.append('page', page.toString());
    if (perPage) params.append('perPage', perPage.toString());

    if (orderBy) params.append('orderBy', orderBy);
    if (orderDirection) params.append('orderDirection', orderDirection);

    if (topics?.length) params.append('topics', topics.join(','));
    if (tags?.length) params.append('tags', tags.join(','));

    return params;
};
