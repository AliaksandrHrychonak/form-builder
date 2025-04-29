'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type JSX, type ReactNode, useMemo } from 'react';

import { useZodI18n } from '@shared/lib/i18n/use-zod-i18n';

const configQueryClient = {
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
        },
    },
};

export const WithQueryClient = ({ children }: { children: ReactNode }): JSX.Element => {
    const queryClient = useMemo(() => new QueryClient(configQueryClient), []);

    // TODO useZodI18n to provider
    useZodI18n();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
