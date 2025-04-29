import { useQuery } from '@tanstack/react-query';

import { VIEWER_TAG } from '@shared/api';

import { getUserProfileApi } from '../api';

import type { IErrorException, IResponse, IViewerProfile } from '@shared/api';
import type { UseQueryResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export const useUserProfileQuery = (): UseQueryResult<IResponse<IViewerProfile>, AxiosError<IErrorException>> => {
    return useQuery<IResponse<IViewerProfile>, AxiosError<IErrorException>, IResponse<IViewerProfile>>({
        queryKey: [VIEWER_TAG],
        queryFn: getUserProfileApi,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: false,
        refetchIntervalInBackground: false,

        // TODO if 401,403 skip retry

        // onSuccess: (data) => {
        // },
        // onError: (error) => {
        //
        // },
    });
};
