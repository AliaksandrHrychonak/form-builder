'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, type JSX, useMemo } from 'react';

const configQueryClient = {
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
        },
    },
};

export const WithQueryClient = ({ children }: { children: ReactNode }): JSX.Element => {
    const queryClient = useMemo(() => new QueryClient(configQueryClient), []);

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
