'use client';

import { createContext } from 'react';

import type { DictionaryType } from '@shared/config';

interface DictionaryContextProps {
    dictionary: DictionaryType;
    lang: string;
}

export const DictionaryContext = createContext<DictionaryContextProps>({} as DictionaryContextProps);
