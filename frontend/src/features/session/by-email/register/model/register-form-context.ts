import { createContext } from 'react';

import type { RegisterFormData } from './register.schema';
import type { UseFormReturn } from 'react-hook-form';

export interface RegisterFormContextState {
    handleSubmit: (data: RegisterFormData) => Promise<void>;
    form: UseFormReturn<RegisterFormData>;
}

export const RegisterFormContext = createContext<RegisterFormContextState | null>(null);
