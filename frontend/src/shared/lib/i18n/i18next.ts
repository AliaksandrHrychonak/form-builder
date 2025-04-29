import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { defaultNS, fallbackLng, languages } from '@shared/config';

import type { Resources } from 'i18next';

const runsOnServerSide = typeof window === 'undefined';

const namespaces = Object.keys({} as Resources) as Array<keyof Resources>;

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend(
            (language: string, namespace: string) => import(`../../config/i18n/locales/${language}/${namespace}.json`)
        )
    )
    .init({
        supportedLngs: languages,
        fallbackLng,
        fallbackNS: defaultNS,
        defaultNS,
        ns: namespaces,
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'navigator'],
        },
        preload: runsOnServerSide ? languages : [],
    } as const);

export { i18next };
