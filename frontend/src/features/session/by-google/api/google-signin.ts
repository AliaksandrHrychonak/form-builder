import { baseApi } from '@shared/api';

import type { IResponse, ISession } from '@shared/api';

export const googleSignin = async (token: string | undefined): Promise<IResponse<ISession>> => {
    const response = await baseApi.post(
        '/user/user/login/social/googleSignin',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
