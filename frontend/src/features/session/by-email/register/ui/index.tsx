'use client';

import { MultiStepFormStep } from '@shared/ui';

import { ProfileStep, PasswordStep, ContactStep, ReviewStep } from './steps';
import { RegisterFormProvider } from '../model';

import type { FC } from 'react';

interface RegisterFormProps {
    onComplete?: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onComplete }) => {
    return (
        <RegisterFormProvider onComplete={onComplete}>
            <MultiStepFormStep name='contactInfo'>
                <ContactStep />
            </MultiStepFormStep>
            <MultiStepFormStep name='profileInfo'>
                <ProfileStep />
            </MultiStepFormStep>
            <MultiStepFormStep name='passwordInfo'>
                <PasswordStep />
            </MultiStepFormStep>
            <MultiStepFormStep name='review'>
                <ReviewStep />
            </MultiStepFormStep>
        </RegisterFormProvider>
    );
};
