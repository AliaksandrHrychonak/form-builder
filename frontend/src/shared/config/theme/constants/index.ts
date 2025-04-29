import type { ThemeType } from '../types';

export const themeOptions = [
    { value: 'light', label: 'light' },
    { value: 'dark', label: 'dark' },
    { value: 'system', label: 'system' },
] as const;

export const DEFAULT_THEME: ThemeType = themeOptions[0].value;
