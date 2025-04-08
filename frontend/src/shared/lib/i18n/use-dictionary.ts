'use client';

import { useContext } from 'react';

import { DictionaryContext } from './dictionary-context';

import type { DictionaryContextProps } from './dictionary-context';

export const useDictionary = (): DictionaryContextProps => {
    const context = useContext(DictionaryContext);
    if (!context) {
        throw new Error('useDictionary must be used within DictionaryProvider');
    }
    return context;
};
