import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { getInitialSearchTemplateFilters } from '../../lib';

import type { ENUM_POLICY_ROLE_TYPE, IRoleBasedSearchTemplateFilters } from '@shared/api';
import type { StoreApi } from 'zustand';

export interface ITemplateSearchFiltersStore<R extends ENUM_POLICY_ROLE_TYPE> {
    filters: IRoleBasedSearchTemplateFilters<R>;
    setFilters: (filters: Partial<IRoleBasedSearchTemplateFilters<R>>) => void;
    resetFilters: () => void;
    getDefaultFilters: () => IRoleBasedSearchTemplateFilters<R>;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

export const createSearchTemplatesStore = <R extends ENUM_POLICY_ROLE_TYPE>(
    role: R
): StoreApi<ITemplateSearchFiltersStore<R>> =>
    create<ITemplateSearchFiltersStore<R>>()(
        devtools(
            persist<ITemplateSearchFiltersStore<R>>(
                (set) => ({
                    _hasHydrated: false,
                    setHasHydrated: (state) => set({ _hasHydrated: state }),
                    filters: getInitialSearchTemplateFilters(role),
                    setFilters: (newFilters): void =>
                        set((state) => ({
                            filters: { ...state.filters, ...newFilters },
                        })),
                    resetFilters: (): void => set({ filters: getInitialSearchTemplateFilters(role) }),
                    getDefaultFilters: (): IRoleBasedSearchTemplateFilters<R> => getInitialSearchTemplateFilters(role),
                }),
                {
                    name: `search-templates-store-${role}`,
                    storage: createJSONStorage(() => localStorage),
                    onRehydrateStorage: () => (state) => {
                        state?.setHasHydrated(true);
                    },
                }
            )
        )
    );
