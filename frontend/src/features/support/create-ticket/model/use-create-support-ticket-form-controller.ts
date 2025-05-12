'use client';

import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

import { useCreateSupportTicketMutation } from './use-create-support-ticket-mutation';

import type { SupportTicketFormData } from './create-support-ticket.schema';
import type { ISupportTicket } from '@shared/api';

interface CreateSupportTicketControllerProps {
    onComplete?: () => void;
}

export const useCreateSupportTicketFormController = ({
    onComplete,
}: CreateSupportTicketControllerProps): {
    handleSubmit: (data: SupportTicketFormData) => Promise<void>;
} => {
    const { data: session } = useSession();

    const { mutate: createTicket } = useCreateSupportTicketMutation({
        onSuccess: () => {
            onComplete?.();
        },
    });

    const handleSubmit = useCallback(
        async (data: SupportTicketFormData) => {
            const ticket = {
                ...data,
                reportedBy: session?.user?.email || 'anonymous',
                link: window.location.href,
                createdAt: new Date().toISOString(),
            };
            createTicket(<ISupportTicket>ticket);
        },
        [createTicket, session]
    );

    return { handleSubmit };
};
