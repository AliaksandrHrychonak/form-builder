'use client';

import { SupportButton } from '@widgets/support-button';

import type { JSX, ReactNode } from 'react';

export const WithSupportClient = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <>
            {children}
            <SupportButton />
        </>
    );
};
