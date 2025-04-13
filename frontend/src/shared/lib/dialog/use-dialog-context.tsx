'use client';

import { useContext } from 'react';

import { DialogContext } from './dialog-context';

import type { DialogContextState } from './dialog-context';

export const useDialogContext = (): DialogContextState => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialogContext must be used within DialogStateProvider');
    }
    return context;
};
