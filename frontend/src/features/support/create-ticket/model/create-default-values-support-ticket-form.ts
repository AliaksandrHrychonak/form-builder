import type { SupportTicketFormData } from './create-support-ticket.schema';

export const createDefaultValuesSupportTicketForm = (): SupportTicketFormData => {
    return {
        description: '',
        priority: 'Average',
    };
};
