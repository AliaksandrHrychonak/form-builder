'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { useClientTranslation } from '@shared/lib';

import type { LoginFormData } from '@features/session';
import type { IErrorException } from '@shared/api';
import type { SignInResponse } from 'next-auth/react';

interface UseLoginMutationOptions {
    onSuccess?: () => void;
}

export const useLoginWithCredentialsMutation = ({ onSuccess }: UseLoginMutationOptions = {}): ReturnType<
    typeof useMutation<SignInResponse | undefined, string, LoginFormData>
> => {
    const { t } = useClientTranslation('auth');
    const router = useRouter();
    return useMutation({
        mutationFn: async (data: LoginFormData): Promise<SignInResponse | undefined> => {
            const result = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (result?.error) {
                throw result.error;
            }

            return result;
        },
        onSuccess: () => {
            onSuccess?.();
            // Need to go to the previous page, but not to registration
            router.push('/');
        },
        onError: (error: string) => {
            try {
                const errorData = JSON.parse(error) as IErrorException;
                toast.error(`${errorData.statusCode} ${errorData.message}`);
            } catch {
                toast.error(t('errors.unknown'));
            }
        },
    });
};
