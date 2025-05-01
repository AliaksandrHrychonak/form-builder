import { ENUM_POLICY_ROLE_TYPE } from '@shared/api';
import { Config } from '@shared/config';

import type { IBaseSearchTemplateTagFilters, IRoleBasedSearchTemplateTagFilters } from '@shared/api';

const { TEMPLATE_TAG } = Config;

export const getInitialSearchTemplateTagFilters = <R extends ENUM_POLICY_ROLE_TYPE>(
    role: R
): IRoleBasedSearchTemplateTagFilters<R> => {
    const base: IBaseSearchTemplateTagFilters = {
        orderBy: 'createdAt',
        orderDirection: 'desc',
        page: 1,
        perPage: TEMPLATE_TAG.SEARCH_DEFAULT_PAGE_SIZE,
        excludeIds: [],
    };

    switch (role) {
        case ENUM_POLICY_ROLE_TYPE.SUPER_ADMIN:
            return {
                ...base,
            } as IRoleBasedSearchTemplateTagFilters<R>;
        case ENUM_POLICY_ROLE_TYPE.ADMIN:
            return {
                ...base,
            } as IRoleBasedSearchTemplateTagFilters<R>;
        case ENUM_POLICY_ROLE_TYPE.MEMBER:
            return {
                ...base,
            } as IRoleBasedSearchTemplateTagFilters<R>;
        case ENUM_POLICY_ROLE_TYPE.USER:
            return {
                ...base,
            } as IRoleBasedSearchTemplateTagFilters<R>;
        default:
            return {
                ...base,
            } as IRoleBasedSearchTemplateTagFilters<R>;
    }
};
