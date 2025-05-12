import { baseApi } from '@shared/api';

import type { IResponse, ISupportTicket } from '@shared/api';

export const createSupportTicketApi = async (ticket: ISupportTicket): Promise<IResponse<unknown>> => {
    const fileName = `support-ticket-${Date.now()}.json`;

    const response = await baseApi.post<IResponse<unknown>>('/support/upload', {
        fileName,
        content: JSON.stringify(ticket),
    });

    return response.data;
};
