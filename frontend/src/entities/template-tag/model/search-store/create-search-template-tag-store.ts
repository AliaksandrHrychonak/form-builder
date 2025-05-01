import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { getInitialSearchTemplateTagFilters } from '../../lib';

import type { ENUM_POLICY_ROLE_TYPE, IRoleBasedSearchTemplateTagFilters } from '@shared/api';
import type { StoreApi } from 'zustand';

export interface ITemplateTagSearchFiltersStore<R extends ENUM_POLICY_ROLE_TYPE> {
    filters: IRoleBasedSearchTemplateTagFilters<R>;
    setFilters: (filters: Partial<IRoleBasedSearchTemplateTagFilters<R>>) => void;
    resetFilters: () => void;
    getDefaultFilters: () => IRoleBasedSearchTemplateTagFilters<R>;
}

export const createSearchTemplateTagStore = <R extends ENUM_POLICY_ROLE_TYPE>(
    role: R
): StoreApi<ITemplateTagSearchFiltersStore<R>> =>
    create<ITemplateTagSearchFiltersStore<R>>()(
        devtools(
            (set) => ({
                filters: getInitialSearchTemplateTagFilters(role),
                setFilters: (newFilters) =>
                    set((state) => ({
                        filters: { ...state.filters, ...newFilters },
                    })),
                resetFilters: () => set({ filters: getInitialSearchTemplateTagFilters(role) }),
                getDefaultFilters: () => getInitialSearchTemplateTagFilters(role),
            }),
            { name: `search-templates-tags-store-${role}` }
        )
    );
