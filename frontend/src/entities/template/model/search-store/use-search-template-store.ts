import { ENUM_POLICY_ROLE_TYPE } from '@shared/api';

import { createSearchTemplatesStore } from './create-search-template-store';

import type { ITemplateSearchFiltersStore } from './create-search-template-store';
import type { StoreApi } from 'zustand';

export const usePublicTemplateStore = createSearchTemplatesStore(ENUM_POLICY_ROLE_TYPE.PUBLIC);
export const useUserTemplateStore = createSearchTemplatesStore(ENUM_POLICY_ROLE_TYPE.USER);
export const useMemberTemplateStore = createSearchTemplatesStore(ENUM_POLICY_ROLE_TYPE.MEMBER);
export const useAdminTemplateStore = createSearchTemplatesStore(ENUM_POLICY_ROLE_TYPE.ADMIN);
export const useSuperAdminTemplateStore = createSearchTemplatesStore(ENUM_POLICY_ROLE_TYPE.SUPER_ADMIN);

export const useSearchTemplateStore = (
    role: ENUM_POLICY_ROLE_TYPE
): StoreApi<ITemplateSearchFiltersStore<typeof role>> => {
    const storeMap: Record<ENUM_POLICY_ROLE_TYPE, StoreApi<ITemplateSearchFiltersStore<typeof role>>> = {
        PUBLIC: usePublicTemplateStore,
        USER: useUserTemplateStore,
        MEMBER: useMemberTemplateStore,
        ADMIN: useAdminTemplateStore,
        SUPER_ADMIN: useSuperAdminTemplateStore,
    };

    return storeMap[role];
};
