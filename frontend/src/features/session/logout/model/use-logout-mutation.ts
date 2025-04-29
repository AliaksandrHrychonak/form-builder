'use client';

import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Config, fallbackLng } from '@shared/config';
import { useClientTranslation } from '@shared/lib';

import { logoutApi } from '../api';

import type { UseMutationResult } from '@tanstack/react-query';
import type { SignOutParams } from 'next-auth/react';

const { APP_ROUTES } = Config;

interface UseLogoutMutationOptions {
    onSuccess?: () => void;
}

export const useLogoutMutation = ({ onSuccess }: UseLogoutMutationOptions = {}): UseMutationResult<
    void,
    unknown,
    SignOutParams<true> | undefined,
    unknown
> => {
    const { t } = useClientTranslation('auth');
    const router = useRouter();
    const params = useParams();
    const lng = String(params?.lang ?? fallbackLng);

    return useMutation({
        mutationFn: async (data) => {
            await logoutApi(data);
        },
        onSuccess: () => {
            onSuccess?.();
            // TODO: Need to go to the previous page, but not to registration
            router.push(`/${lng}/${APP_ROUTES.SIGN_OUT_CALLBACK}`);
        },
        onError: () => {
            toast.error(t('errors.logout'));
        },
    });
};
