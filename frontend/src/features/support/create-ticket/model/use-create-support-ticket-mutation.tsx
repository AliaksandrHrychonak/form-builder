'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useClientTranslation } from '@shared/lib';
import { ToasterValidationErrorDescriptionMessage } from '@shared/ui';

import { createSupportTicketApi } from '../api';

import type { IErrorException, IResponse, ISupportTicket } from '@shared/api';
import type { UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

interface UseSupportTicketMutationOptions {
    onSuccess?: () => void;
}

export const useCreateSupportTicketMutation = ({ onSuccess }: UseSupportTicketMutationOptions = {}): UseMutationResult<
    IResponse<unknown>,
    AxiosError<IErrorException, unknown>,
    ISupportTicket,
    unknown
> => {
    const { t } = useClientTranslation('support');

    return useMutation({
        mutationFn: async (ticket: ISupportTicket): Promise<IResponse<unknown>> => {
            return await createSupportTicketApi(ticket);
        },
        onSuccess: () => {
            toast.success(t('ticket.success'));
            onSuccess?.();
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
