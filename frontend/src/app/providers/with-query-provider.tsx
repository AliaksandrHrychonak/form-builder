'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type JSX, type ReactNode, useMemo } from 'react';

import { Config } from '@shared/config';

const { QUERY_CLIENT } = Config;
const configQueryClient = {
    defaultOptions: {
        queries: {
            staleTime: QUERY_CLIENT.STALE_TIME,
            retry: QUERY_CLIENT.RETRY,
        },
    },
};

export const WithQueryClient = ({ children }: { children: ReactNode }): JSX.Element => {
    const queryClient = useMemo(() => new QueryClient(configQueryClient), []);
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
