import axios from 'axios';
import Cookies from 'js-cookie';
import { getSession, signOut } from 'next-auth/react';

import { errorHandler } from './error-handler';
import { DEFAULT_LOCALE } from '../../config';

export const baseApi = axios.create({
    baseURL: 'http://localhost:8080/api',
    // withCredentials: true,
    headers: {
        Accept: 'application/json',
        'x-api-key': 'v8VB0yY887lMpTA2VJMV:zeZbtGTugBTn3Qd5UXtSZBwt7gn3bg',
        'Content-Type': 'application/json',
    },
});

baseApi.interceptors.request.use(async (config) => {
    const session = await getSession();

    if (session?.accessToken && session?.tokenType) {
        config.headers.Authorization = `${session.tokenType} ${session.accessToken}`;
    }

    config.headers['x-custom-lang'] = Cookies.get('locale') || DEFAULT_LOCALE;

    return config;
});

baseApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const errorResponse = errorHandler.handleError(error.response?.data);

        if (errorResponse.statusCode === 5000 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const session = await getSession();

                if (session?.accessToken) {
                    originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
                    return baseApi(originalRequest);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                await signOut();
            }
        }

        return Promise.reject({
            ...error.response,
            data: errorResponse,
        });
    }
);
