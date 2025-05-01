import { useStore } from 'zustand';

import { ENUM_POLICY_ROLE_TYPE } from '@shared/api';

import { createSearchTemplateTagStore } from './create-search-template-tag-store';

import type { ITemplateTagSearchFiltersStore } from './create-search-template-tag-store';
import type { StoreApi } from 'zustand';

export const usePublicTemplateTagStore = createSearchTemplateTagStore(ENUM_POLICY_ROLE_TYPE.PUBLIC);
export const useUserTemplateTagStore = createSearchTemplateTagStore(ENUM_POLICY_ROLE_TYPE.USER);
export const useMemberTemplateTagStore = createSearchTemplateTagStore(ENUM_POLICY_ROLE_TYPE.MEMBER);
export const useAdminTemplateTagStore = createSearchTemplateTagStore(ENUM_POLICY_ROLE_TYPE.ADMIN);
export const useSuperAdminTemplateTagStore = createSearchTemplateTagStore(ENUM_POLICY_ROLE_TYPE.SUPER_ADMIN);

export const useSearchTemplateTagStore = (
    role: ENUM_POLICY_ROLE_TYPE
): ITemplateTagSearchFiltersStore<ENUM_POLICY_ROLE_TYPE> => {
    const storeMap: Record<ENUM_POLICY_ROLE_TYPE, StoreApi<ITemplateTagSearchFiltersStore<typeof role>>> = {
        PUBLIC: usePublicTemplateTagStore,
        USER: useUserTemplateTagStore,
        MEMBER: useMemberTemplateTagStore,
        ADMIN: useAdminTemplateTagStore,
        SUPER_ADMIN: useSuperAdminTemplateTagStore,
    };

    return useStore(storeMap[role]);
};
