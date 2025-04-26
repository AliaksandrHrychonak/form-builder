'use client';

import { useContext } from 'react';

import { MultiStepFormContext } from './multi-step-form-context';

import type { useMultiStepForm } from './use-multi-step-form';
import type { z } from 'zod';

export const useMultiStepFormContext = <Schema extends z.ZodType>(): ReturnType<typeof useMultiStepForm<Schema>> => {
    const context = useContext(MultiStepFormContext) as ReturnType<typeof useMultiStepForm<Schema>>;
    if (!context) {
        throw new Error('useMultiStepFormContext must be used within a MultiStepFormProvider');
    }
    return context;
};
