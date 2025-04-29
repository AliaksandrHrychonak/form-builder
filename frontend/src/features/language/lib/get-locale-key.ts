const localeKeys = {
    en: 'locales.en',
    pl: 'locales.pl',
} as const;

export const getLocaleKey = (locale: string): (typeof localeKeys)[keyof typeof localeKeys] => {
    if (locale in localeKeys) {
        return localeKeys[locale as keyof typeof localeKeys];
    }
    return 'locales.en';
};
