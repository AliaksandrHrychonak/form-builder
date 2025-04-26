import { dictionariesList } from '@shared/config';

import type { DictionaryType } from '@shared/config';

/**
 * Asynchronously retrieves a dictionary based on the specified locale.
 * @param locale The locale for which to retrieve the dictionary.
 * @returns A Promise that resolves to the dictionary for the specified locale.
 */
export const getDictionary = async (locale: string): Promise<DictionaryType> => {
    const dictionary = dictionariesList[locale];
    if (!dictionary) {
        throw new Error(`Dictionary for locale "${locale}" not found`);
    }
    return dictionary();
};
