'use client';

import { useCallback } from 'react';

import { useRegisterMutation } from './use-register-mutation';

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
    const { mutate: register } = useRegisterMutation({
        onSuccess: () => {
            onComplete?.();
        },
    });

    const handleSubmit = useCallback(
        async (data: RegisterFormData) => {
            const viewer: IRequestSignUp = {
                firstName: data.profileInfo.firstName,
                lastName: data.profileInfo.lastName,
                email: data.contactInfo.email,
                password: data.passwordInfo.password,
            };
            register(viewer);
        },
        [register]
    );

    return { handleSubmit };
};
