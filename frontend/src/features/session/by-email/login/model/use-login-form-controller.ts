'use client';

import { useCallback } from 'react';

import { useLoginWithCredentialsMutation } from './use-login-with-credentials-mutation';

import type { LoginFormData } from './login.schema';

interface LoginControllerProps {
    onComplete?: () => void;
}

export const useLoginFormController = ({
    onComplete,
}: LoginControllerProps): {
    handleSubmit: (data: LoginFormData) => Promise<void>;
} => {
    const { mutate: login } = useLoginWithCredentialsMutation({
        onSuccess: () => {
            onComplete?.();
        },
    });

    const handleSubmit = useCallback(async (data: LoginFormData) => login(data), [login]);

    return { handleSubmit };
};
