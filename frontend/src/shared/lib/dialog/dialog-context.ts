import { createContext } from 'react';

export interface DialogContextState {
    isOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextState | null>(null);
