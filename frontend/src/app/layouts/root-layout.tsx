import '../styles/global.css';
import { Geist, Geist_Mono } from 'next/font/google';

import { languages } from '@shared/config';
import { Toaster } from '@shared/ui';

import { WithAuthProvider, WithQueryClient, WithSupportClient, WithThemeProvider, WithZodProvider } from '../providers';

import type { FC, ReactNode } from 'react';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

interface RootLayoutProps {
    children: ReactNode;
    params: {
        lng: string;
    };
}

export async function generateStaticParams(): Promise<{ lng: string }[]> {
    return languages.map((lng) => ({ lng }));
}

export const RootLayout: FC<RootLayoutProps> = async ({ children, params }) => {
    const { lng } = await params;
    return (
        <html lang={lng} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background min-h-svh font-sans antialiased select-none flex flex-col`}
            >
                <WithQueryClient>
                    <WithZodProvider>
                        <WithThemeProvider
                            attribute='class'
                            defaultTheme='light'
                            enableSystem
                            disableTransitionOnChange
                        >
                            <WithAuthProvider>
                                <WithSupportClient>{children}</WithSupportClient>
                            </WithAuthProvider>
                        </WithThemeProvider>
                        <Toaster />
                    </WithZodProvider>
                </WithQueryClient>
            </body>
        </html>
    );
};
