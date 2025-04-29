import { languages } from '@shared/config';

export const generateAlternatesMetadata = (lang: string, pathname: string): {} => {
    const path = pathname === 'main' ? '' : `/${pathname}`;
    return {
        alternates: {
            canonical: `/${lang}${path}`,
            languages: languages.reduce((acc, locale) => {
                if (locale === lang) {
                    return acc;
                }
                return {
                    ...acc,
                    [locale]: `/${locale}${path}`,
                };
            }, {}),
        },
    };
};
