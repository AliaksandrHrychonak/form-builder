'use client';

import { createContext } from 'react';

import type { useMultiStepForm } from './use-multi-step-form';

export const MultiStepFormContext = createContext<ReturnType<typeof useMultiStepForm> | null>(null);
