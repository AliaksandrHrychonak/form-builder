'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

import { useClientTranslation } from './use-client-translation';

import type { TFunction } from 'i18next';

export const useZodI18n = (): void => {
    const params = useParams();

    const { t, i18n } = useClientTranslation(['zod', 'zodcustom']);

    useEffect(() => {
        const updateZodI18n = (): void => {
            z.setErrorMap(
                makeZodI18nMap({
                    t: t as unknown as TFunction<'translation', undefined>,
                    ns: ['zod', 'zodcustom'],
                    handlePath: {
                        keyPrefix: 'form.paths',
                    },
                })
            );
        };

        if (i18n.isInitialized) {
            updateZodI18n();
        }

        i18n.on('initialized', updateZodI18n);
        i18n.on('languageChanged', updateZodI18n);

        return (): void => {
            i18n.off('initialized', updateZodI18n);
            i18n.off('languageChanged', updateZodI18n);
        };
    }, [t, i18n, params]);
};
