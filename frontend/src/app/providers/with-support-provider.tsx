'use client';

import { DialogProvider } from '@shared/lib';
import { SupportButton } from '@widgets/support-button';

import type { JSX, ReactNode } from 'react';

export const WithSupportClient = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <>
            <DialogProvider>
                {children}
                <SupportButton />
            </DialogProvider>
        </>
    );
};
