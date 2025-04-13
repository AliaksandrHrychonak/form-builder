'use client';

import { useContext } from 'react';

import { RegisterFormContext } from './register-form-context';

import type { RegisterFormContextState } from './register-form-context';

export const useRegisterFormContext = (): RegisterFormContextState => {
    const context = useContext(RegisterFormContext);
    if (!context) {
        throw new Error('useRegisterFormContext must be used within RegisterFormProvider');
    }
    return context;
};
