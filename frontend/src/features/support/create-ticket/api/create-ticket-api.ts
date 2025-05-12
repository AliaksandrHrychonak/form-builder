import { baseApi } from '@shared/api';

import type { IResponse, ISupportTicket } from '@shared/api';

export const createSupportTicketApi = async (ticket: ISupportTicket): Promise<IResponse<unknown>> => {
    const response = await baseApi.post<IResponse<unknown>>('public/support/create/ticket', ticket);

    return response.data;
};
