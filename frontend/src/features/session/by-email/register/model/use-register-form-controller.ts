'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useRegisterMutation } from '../api';

import type { RegisterFormData } from './register.schema';
import type { IRequestSignUp } from '@shared/api';

interface RegisterControllerProps {
    onComplete?: () => void;
}

export const useRegisterFormController = ({
    onComplete,
}: RegisterControllerProps): {
    handleSubmit: (data: RegisterFormData) => Promise<void>;
} => {
    const { mutate: register } = useRegisterMutation();

    const handleSubmit = useCallback(
        async (data: RegisterFormData) => {
            try {
                const viewer: IRequestSignUp = {
                    firstName: data.profileInfo.firstName,
                    lastName: data.profileInfo.lastName,
                    email: data.contactInfo.email,
                    password: data.passwordInfo.password,
                };
                register(viewer);
                onComplete?.();
                // TODO Texts should be in the config, need fix after review
                toast.success('Register successfully');
            } catch (error) {
                toast.error(JSON.stringify(error));
            }
        },
        [onComplete, register]
    );

    return { handleSubmit };
};
