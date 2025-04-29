'use client';

import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Config, fallbackLng } from '@shared/config';
import { useClientTranslation, wait } from '@shared/lib';
import { ToasterValidationErrorDescriptionMessage } from '@shared/ui';

import { registerApi } from '../api';

import type { IErrorException, IRequestSignUp, IResponse } from '@shared/api';
import type { UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

const { APP_ROUTES } = Config;

interface UseRegisterMutationOptions {
    onSuccess?: () => void;
}

export const useRegisterMutation = ({ onSuccess }: UseRegisterMutationOptions = {}): UseMutationResult<
    IResponse<unknown>,
    AxiosError<IErrorException, unknown>,
    IRequestSignUp,
    unknown
> => {
    const { t } = useClientTranslation('auth');
    const router = useRouter();
    const params = useParams();
    const lng = String(params?.lang ?? fallbackLng);
    return useMutation({
        mutationFn: async (data: IRequestSignUp): Promise<IResponse<unknown>> => {
            return await registerApi(data);
        },
        onSuccess: (data) => {
            toast.promise(wait(2000), {
                loading: `${data.statusCode} ${data.message}`,
                success: () => {
                    onSuccess?.();
                    router.push(`/${lng}/${APP_ROUTES.SIGN_IN}`);
                    return t('helpers.redirect');
                },
                error: toast.error(t('errors.redirect')),
            });
        },
        onError: (error) => {
            try {
                const errorData = error.response?.data as IErrorException;
                toast.error(`${errorData.statusCode} ${errorData.message}`, {
                    description: <ToasterValidationErrorDescriptionMessage data={errorData.errors} />,
                });
            } catch {
                toast.error(t('errors.unknown'));
            }
        },
    });
};
