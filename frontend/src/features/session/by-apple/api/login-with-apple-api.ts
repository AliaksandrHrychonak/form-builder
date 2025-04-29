import { baseApi } from '@shared/api';

import type { IResponse, ISession } from '@shared/api';

export const loginWithAppleApi = async (token: string | undefined): Promise<IResponse<ISession>> => {
    const response = await baseApi.post<IResponse<ISession>>(
        '/user/user/login/social/apple',
        {},
        {
            headers: {
                // TODO add dinamic token type
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
