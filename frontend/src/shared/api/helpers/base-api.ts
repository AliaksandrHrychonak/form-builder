import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

import { Config, fallbackLng } from '@shared/config';

import { errorHandler } from './error-handler';

import type { IErrorException, IErrorImportException } from '../types';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const { BASE_API_URL, API_KEY_PUBLIC, API_WITH_CREDENTIALS, API_KEY_HEADER, API_LANG_HEADER } = Config;

const createBaseApi = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: BASE_API_URL,
        withCredentials: API_WITH_CREDENTIALS,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(async (config) => {
        const session = await getSession();

        if (session?.accessToken && session?.tokenType) {
            config.headers.Authorization = `${session.tokenType} ${session.accessToken}`;
        }

        config.headers[API_KEY_HEADER] = API_KEY_PUBLIC;

        try {
            const pathname = window.location.pathname;
            const langFromPath = pathname.split('/')[1];

            config.headers[API_LANG_HEADER] = langFromPath?.length === 2 ? langFromPath : fallbackLng;

            return config;
        } catch {
            config.headers[API_LANG_HEADER] = fallbackLng;
            return config;
        }
    });

    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError<IErrorException | IErrorImportException>) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

            const errorResponse = errorHandler.handleError(
                error.response?.data as IErrorException | IErrorImportException
            );

            if (errorResponse.statusCode === 5000 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const session = await getSession();

                    if (session?.accessToken) {
                        originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
                        return baseApi(originalRequest);
                    }
                } catch {
                    await signOut();
                }
            }

            return Promise.reject(
                Object.assign(error, {
                    response: {
                        ...error.response,
                        data: errorResponse,
                    },
                })
            );
        }
    );

    return instance;
};

export const baseApi = createBaseApi();
