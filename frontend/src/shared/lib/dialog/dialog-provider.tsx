'use client';

import { useState } from 'react';

import { DialogContext } from './dialog-context';

import type { DialogContextState } from './dialog-context';
import type { JSX, ReactNode } from 'react';

export const DialogProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const value: DialogContextState = {
        isOpen,
        openDialog: () => setOpen(true),
        closeDialog: () => setOpen(false),
    };

    return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};
