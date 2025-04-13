import { useQuery } from '@tanstack/react-query';

import { baseApi } from '@shared/api';

import type { IResponse, IViewerProfile, ISession } from '@shared/api';
import type { UseQueryResult } from '@tanstack/react-query';

export const getUserProfile = async (): Promise<IResponse<IViewerProfile>> => {
    const response = await baseApi.get('/user/user/profile', {
        withCredentials: false,
    });

    return response.data;
};

export const useUserProfileQuery = (): UseQueryResult<IResponse<IViewerProfile>> => {
    return useQuery<IResponse<IViewerProfile>, Error>({
        queryKey: ['viewer'],
        queryFn: getUserProfile,
    });
};
export const refreshAccessToken = async (token: string): Promise<IResponse<ISession>> => {
    const response = await baseApi.post(
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
