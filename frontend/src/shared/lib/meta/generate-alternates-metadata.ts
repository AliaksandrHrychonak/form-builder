import { locales } from '@shared/config';

export const generateAlternatesMetadata = (lang: string, pathname: string): {} => {
    const path = pathname === 'main' ? '' : `/${pathname}`;
    return {
        alternates: {
            canonical: `/${lang}${path}`,
            languages: locales.reduce((acc, locale) => {
                if (locale.code === lang) {
                    return acc;
                }
                return {
                    ...acc,
                    [locale.code]: `/${locale.code}${path}`,
                };
            }, {}),
        },
    };
};
