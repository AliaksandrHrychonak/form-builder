import '../styles/global.css';
import { Geist, Geist_Mono } from 'next/font/google';

import { getDictionary } from '@shared/lib/i18n';
import { Toaster } from '@shared/ui';

import { WithDictionaryProvider, WithQueryClient, WithThemeProvider } from '../providers';

import type { Metadata } from 'next';
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
}

export const metadata: Metadata = {
    title: 'Book sample generator',
};

interface RootLayoutProps {
    children: ReactNode;
}

interface RootLayoutProps {
    children: ReactNode;
    params: {
        lang: string;
    };
}

const RootLayout: FC<RootLayoutProps> = async ({ children, params }) => {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);
    return (
        <html lang={lang} suppressHydrationWarning>
            <WithDictionaryProvider lang={lang} initialDictionary={dictionary}>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} bg-background min-h-svh font-sans antialiased select-none flex flex-col`}
                >
                    <WithQueryClient>
                        <WithThemeProvider
                            attribute='class'
                            defaultTheme='light'
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}
                        </WithThemeProvider>
                        <Toaster />
                    </WithQueryClient>
                </body>
            </WithDictionaryProvider>
        </html>
    );
};

export default RootLayout;
