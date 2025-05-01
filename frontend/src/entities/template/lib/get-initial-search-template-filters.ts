import { ENUM_POLICY_ROLE_TYPE } from '@shared/api';
import { Config } from '@shared/config';

import type { IBaseSearchTemplateFilters, IRoleBasedSearchTemplateFilters } from '@shared/api';

const { TEMPLATE } = Config;

export const getInitialSearchTemplateFilters = <R extends ENUM_POLICY_ROLE_TYPE>(
    role: R
): IRoleBasedSearchTemplateFilters<R> => {
    const base: IBaseSearchTemplateFilters = {
        orderBy: 'popularityScore',
        orderDirection: 'desc',
        page: 1,
        perPage: TEMPLATE.SEARCH_DEFAULT_PAGE_SIZE,
        tags: [],
        topics: [],
    };

    switch (role) {
        case ENUM_POLICY_ROLE_TYPE.SUPER_ADMIN:
            return {
                ...base,
            } as IRoleBasedSearchTemplateFilters<R>;
        case ENUM_POLICY_ROLE_TYPE.ADMIN:
            return {
                ...base,
            } as IRoleBasedSearchTemplateFilters<R>;
        case ENUM_POLICY_ROLE_TYPE.MEMBER:
            return {
                ...base,
            } as IRoleBasedSearchTemplateFilters<R>;
        case ENUM_POLICY_ROLE_TYPE.USER:
            return {
                ...base,
            } as IRoleBasedSearchTemplateFilters<R>;
        default:
            return {
                ...base,
            } as IRoleBasedSearchTemplateFilters<R>;
    }
};
