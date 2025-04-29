import { baseApi } from '@shared/api';

import type { IResponse, ISession, IViewerProfile } from '@shared/api';

export const getUserProfileApi = async (): Promise<IResponse<IViewerProfile>> => {
    const response = await baseApi.get<IResponse<IViewerProfile>>('/user/user/profile');

    return response.data;
};

export const refreshTokenApi = async (token: string): Promise<IResponse<ISession>> => {
    const response = await baseApi.post<IResponse<ISession>>(
        '/user/user/refresh',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
