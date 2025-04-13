import { baseApi } from '@shared/api';

import type { IResponse, ISession } from '@shared/api';

export const appleSignin = async (token: string | undefined): Promise<IResponse<ISession>> => {
    const response = await baseApi.post(
        '/user/user/login/social/appleSignin',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
