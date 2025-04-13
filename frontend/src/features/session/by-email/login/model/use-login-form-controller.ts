'use client';

import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { toast } from 'sonner';

import type { LoginFormData } from './login.schema';

interface LoginControllerProps {
    onComplete?: () => void | unknown;
}

export const useLoginFormController = ({
    onComplete,
}: LoginControllerProps): {
    handleSubmit: (data: LoginFormData) => Promise<void>;
} => {
    const { mutate: login } = useMutation({
        mutationFn: async (data: LoginFormData) => {
            const response = await signIn('credentials', {
                ...data,
                callbackUrl: '/',
                redirect: true,
            });

            if (!response?.ok) {
                throw new Error(response?.error || 'Failed to login');
            }

            return response;
        },
        onSuccess: () => {
            onComplete?.();
        },
        onError: (error: Error) => {
            toast.error(JSON.stringify(error));
        },
    });

    const handleSubmit = useCallback(
        async (data: LoginFormData) => {
            try {
                login(data);
            } catch (error) {
                toast.error(JSON.stringify(error));
            }
        },
        [login]
    );

    return { handleSubmit };
};
