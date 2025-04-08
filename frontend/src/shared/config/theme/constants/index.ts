import type { ThemeType } from '../types';

export const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
] as const;

export const DEFAULT_THEME: ThemeType = themeOptions[0].value;
