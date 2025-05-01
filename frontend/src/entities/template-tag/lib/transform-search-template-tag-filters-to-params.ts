import type { ENUM_POLICY_ROLE_TYPE, IRoleBasedSearchTemplateTagFilters } from '@shared/api';

export const transformSearchTemplateTagFiltersToParams = <R extends ENUM_POLICY_ROLE_TYPE>({
    search,
    page,
    perPage,
    orderBy,
    orderDirection,
    excludeIds,
}: IRoleBasedSearchTemplateTagFilters<R>): URLSearchParams => {
    const params = new URLSearchParams();

    if (search) params.append('search', search);
    if (page) params.append('page', page.toString());
    if (perPage) params.append('perPage', perPage.toString());

    if (orderBy) params.append('orderBy', orderBy);
    if (orderDirection) params.append('orderDirection', orderDirection);

    if (excludeIds?.length) params.append('excludeIds', excludeIds.join(','));

    return params;
};
