import { getDictionary } from '../i18n';
import { generateAlternatesMetadata } from './generate-alternates-metadata';
import { generateMetadata } from './generate-metadata';
import { getPageMetadata } from './get-page-metadata';

import type { Metadata } from 'next';

/**
 * Generates localized metadata for a page
 * @param params - Route parameters
 * @param pathname - Page URL path
 * @returns Promise with localized metadata
 */
export const generateLocalizedMetadata = async (params: { lang: string }, pathname: string): Promise<Metadata> => {
    try {
        const { lang } = await params;
        const dictionary = await getDictionary(lang ?? 'en');
        const pageMetadata = getPageMetadata(pathname, dictionary.metadata);
        return {
            ...generateMetadata(pageMetadata),
            ...generateAlternatesMetadata(lang, pathname),
        };
    } catch (error) {
        console.error(`Failed to generate metadata for ${pathname}:`, error);

        return {
            title: 'Page Not Found',
            description: 'The requested page could not be found',
        };
    }
};
