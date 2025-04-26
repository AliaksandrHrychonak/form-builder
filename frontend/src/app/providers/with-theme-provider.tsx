'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

import type { ComponentProps, FC } from 'react';

type TThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export const WithThemeProvider: FC<TThemeProviderProps> = ({ children, ...props }) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
