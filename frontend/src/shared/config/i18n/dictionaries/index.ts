// This file defines the structure of the 'dictionary' object used in the application.
// Make sure the structure of all your dictionaries (en.json, de.json, etc.) is the same.
// This helps in getting type suggestions when using the 'dictionary' object provided by the Context API.

// Directly import the JSON file synchronously
import type en from './en.json';
export type DictionaryType = typeof en;

/**
 * Object containing functions that import and return dictionaries based on the specified language key.
 */
export const dictionariesList: Record<string, () => Promise<DictionaryType>> = {
    en: () => import('./en.json').then((module) => module.default),
    pl: () => import('./pl.json').then((module) => module.default),
};
