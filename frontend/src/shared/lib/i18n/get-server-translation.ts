'use server';

import { headers } from 'next/headers';

import { fallbackLng, headerName } from '@shared/config';

import { i18next } from './i18next';

import type { FlatNamespace, KeyPrefix, Namespace } from 'i18next';
import type { FallbackNs } from 'react-i18next';

type $Tuple<T> = readonly [T?, ...T[]];
type $FirstNamespace<Ns extends Namespace> = Ns extends readonly never[] ? Ns[0] : Ns;

export async function getServerTranslation<
    Ns extends FlatNamespace | $Tuple<FlatNamespace>,
    KPrefix extends KeyPrefix<
        FallbackNs<Ns extends FlatNamespace ? FlatNamespace : $FirstNamespace<FlatNamespace>>
    > = undefined,
>(
    ns?: Ns,
    options: { keyPrefix?: KPrefix } = {}
): Promise<{ t: ReturnType<typeof i18next.getFixedT>; i18n: typeof i18next }> {
    const headerList = await headers();
    const lng = headerList.get(headerName) ?? fallbackLng;
    if (lng && i18next.resolvedLanguage !== lng) {
        await i18next.changeLanguage(lng);
    }
    if (ns && !i18next.hasLoadedNamespace(ns as string | string[])) {
        await i18next.loadNamespaces(ns as string | string[]);
    }
    return {
        t: Array.isArray(ns)
            ? i18next.getFixedT(lng, ns[0], options.keyPrefix as KPrefix)
            : i18next.getFixedT(lng, ns as FlatNamespace, options.keyPrefix as KPrefix),
        i18n: i18next,
    };
}
