/*
 * Terminology
 * Locale = An identifier for a set of language and formatting preferences.
 * This usually includes the preferred language of the user and possibly their geographic region.
 * e.g. en-US: English as spoken in the United States
 */

import type { Locale } from '../types';

export const locales: Locale[] = [
    { code: 'en', name: 'English' },
    { code: 'pl', name: 'Polish' },
];

export const DEFAULT_LOCALE = locales[0].code;
