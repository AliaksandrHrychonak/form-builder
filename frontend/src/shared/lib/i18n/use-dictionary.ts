'use client';

import { useContext } from 'react';

import { DictionaryContext } from './dictionary-context';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useDictionary = () => {
    const context = useContext(DictionaryContext);
    if (!context) {
        throw new Error('useDictionary must be used within DictionaryProvider');
    }
    return context;
};
