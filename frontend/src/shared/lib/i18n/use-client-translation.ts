'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18next } from './i18next';

import type { KeyPrefix, Resources } from 'i18next';
import type { FallbackNs, UseTranslationOptions, UseTranslationResponse } from 'react-i18next';

const runsOnServerSide = typeof window === 'undefined';

export function useClientTranslation<
    Ns extends keyof Resources | (keyof Resources)[],
    KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(ns?: Ns, options?: UseTranslationOptions<KPrefix>): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
    const lng = useParams()?.lang;
    if (typeof lng !== 'string') throw new Error('useClientTranslation is only available inside /app/[lang]');

    if (runsOnServerSide && i18next.resolvedLanguage !== lng) {
        i18next.changeLanguage(lng);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (activeLng === i18next.resolvedLanguage) return;
            setActiveLng(i18next.resolvedLanguage);
        }, [activeLng, i18next.resolvedLanguage]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (!lng || i18next.resolvedLanguage === lng) return;
            i18next.changeLanguage(lng);
        }, [lng, i18next]);
    }
    return useTranslation(ns, options);
}
