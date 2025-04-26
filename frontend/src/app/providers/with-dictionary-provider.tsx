'use client';

import { useEffect, useState } from 'react';

import { DictionaryContext, getDictionary } from '@shared/lib';

import type { DictionaryType } from '@shared/config';
import type { FC, ReactNode } from 'react';

interface DictionaryProviderProps {
    lang: string;
    initialDictionary: DictionaryType;
    children: ReactNode;
}

export const WithDictionaryProvider: FC<DictionaryProviderProps> = ({ lang, initialDictionary, children }) => {
    const [dictionary, setDictionary] = useState<DictionaryType>(initialDictionary);

    useEffect(() => {
        const fetchDictionary = async (): Promise<void> => {
            const dict = await getDictionary(lang);
            setDictionary(dict);
        };

        if (!initialDictionary) {
            fetchDictionary().then();
        }
    }, [lang, initialDictionary]);

    return (
        <DictionaryContext.Provider
            value={{
                dictionary,
                lang,
            }}
        >
            {children}
        </DictionaryContext.Provider>
    );
};
