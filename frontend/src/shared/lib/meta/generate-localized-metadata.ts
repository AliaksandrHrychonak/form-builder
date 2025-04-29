import { BASE_META } from '@shared/config';

import { getServerTranslation } from '../i18n';
import { generateAlternatesMetadata } from './generate-alternates-metadata';

import type { Resources } from 'i18next';
import type { Metadata } from 'next';

/**
 * Generates localized metadata for a page
 * @param params - Route parameters
 * @param pathname - Page URL path
 * @returns Promise with localized metadata
 */
export const generateLocalizedMetadata = async (params: { lang: string }, pathname: string): Promise<Metadata> => {
    try {
        const { t } = await getServerTranslation('metadata');

        const pageKey =
            pathname === '/' ? 'main' : ((pathname.split('/').pop() ?? 'main') as keyof Resources['metadata']);

        return {
            ...BASE_META,
            title: t(`${pageKey}.title`),
            description: t(`${pageKey}.description`),
            keywords: t(`${pageKey}.keywords`, { returnObjects: true }),
            alternates: generateAlternatesMetadata(params.lang, pathname),
        };
    } catch (error) {
        console.error(`Failed to generate metadata for ${pathname}: ${JSON.stringify(error)}`);
        return BASE_META;
    }
};
