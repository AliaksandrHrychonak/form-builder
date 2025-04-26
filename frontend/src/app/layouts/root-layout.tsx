import '../styles/global.css';
import { Geist, Geist_Mono } from 'next/font/google';

import { getDictionary } from '@shared/lib/i18n';
import { Toaster } from '@shared/ui';

import { WithAuthProvider, WithDictionaryProvider, WithQueryClient, WithThemeProvider } from '../providers';

import type { FC, ReactNode } from 'react';

const geistSans = Geist({
    subsets: ['latin'],
    variable: '--font-geist-mono',
    display: 'swap',
    preload: true,
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const geistMono = Geist_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-geist-sans',
    preload: true,
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

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
                            <WithAuthProvider>{children}</WithAuthProvider>
                        </WithThemeProvider>
                        <Toaster />
                    </WithQueryClient>
                </body>
            </WithDictionaryProvider>
        </html>
    );
};

export default RootLayout;
