import { baseApi } from '@shared/api';

import type { IResponse, ISession } from '@shared/api';

export const loginWithGoogleApi = async (token: string | undefined): Promise<IResponse<ISession>> => {
    const response = await baseApi.post<IResponse<ISession>>(
        '/user/user/login/social/google',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
