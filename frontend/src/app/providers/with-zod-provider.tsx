'use client';

import { useZodI18n } from '@shared/lib';

import type { JSX, ReactNode } from 'react';

export const WithZodProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    useZodI18n();
    return <>{children}</>;
};
