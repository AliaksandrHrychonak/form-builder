import type { Metadata } from 'next';

export const BASE_META: Metadata = {
    title: 'Form Builder',
    // description: '',
    applicationName: 'Form Builder',
    // keywords: [],

    referrer: 'origin-when-cross-origin',
    // authors: [],

    creator: 'Form Builder Team',
    publisher: 'Form Builder Publisher',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://form-builder.monster'),

    // Open Graph
    // openGraph: {
    //     title: 'OG title',
    //     description: 'OG description',
    //     url: 'https://example.com',
    //     siteName: 'Site name',
    //     images: [
    //         {
    //             url: 'https://example.com/og-image.jpg',
    //             width: 1200,
    //             height: 630,
    //             alt: 'OG image',
    //             secureUrl: 'https://example.com/secure-og-image.jpg',
    //             type: 'image/jpeg',
    //         },
    //     ],
    //     locale: 'en_US',
    //     type: 'website',
    //     determiner: 'auto',
    //     audio: [
    //         {
    //             url: 'https://example.com/audio.mp3',
    //             secureUrl: 'https://example.com/secure-audio.mp3',
    //             type: 'audio/mpeg',
    //         },
    //     ],
    //     videos: [
    //         {
    //             url: 'https://example.com/video.mp4',
    //             secureUrl: 'https://example.com/secure-video.mp4',
    //             type: 'video/mp4',
    //             width: 1920,
    //             height: 1080,
    //         },
    //     ],
    //     emails: ['contact@example.com'],
    //     phoneNumbers: ['+1-123-456-7890'],
    //     faxNumbers: ['+1-123-456-7891'],
    //     countryName: 'United States',
    //     locality: 'New York',
    //     region: 'NY',
    //     postalCode: '10001',
    //     streetAddress: 'Example Street, 123',
    // },
    //
    // // Twitter
    // twitter: {
    //     card: 'summary_large_image',
    //     title: 'Twitter title',
    //     description: 'Twitter description',
    //     siteId: '1234567',
    //     creator: '@username',
    //     creatorId: '1234567',
    //     images: [
    //         {
    //             url: 'https://example.com/twitter-image.jpg',
    //             alt: 'Twitter image',
    //             secureUrl: 'https://example.com/secure-twitter-image.jpg',
    //             type: 'image/jpeg',
    //             width: 1200,
    //             height: 630,
    //         },
    //     ],
    //     app: {
    //         name: {
    //             iPhone: 'App Name iOS',
    //             iPad: 'App Name iPad',
    //             googlePlay: 'App Name Android',
    //         },
    //         id: {
    //             iPhone: 'id123456',
    //             iPad: 'id123456',
    //             googlePlay: 'com.example.app',
    //         },
    //         url: {
    //             iPhone: 'example://app',
    //             iPad: 'example://app',
    //             googlePlay: 'example://app',
    //         },
    //     },
    // },

    robots: {
        index: true,
        follow: true,
        nocache: true,
        noarchive: false,
        nosnippet: false,
        noimageindex: false,
        notranslate: false,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
        },
    },

    icons: {
        icon: [
            { url: '/favicons/favicon.ico' },
            {
                url: '/favicons/favicon-16.png',
                type: 'image/png',
                sizes: '16x16',
            },
            {
                url: '/favicons/favicon-32.png',
                type: 'image/png',
                sizes: '32x32',
            },
            {
                url: '/favicons/favicon-48.png',
                type: 'image/png',
                sizes: '48x48',
            },
            {
                url: '/favicons/favicon-64.png',
                type: 'image/png',
                sizes: '64x64',
            },
            { url: '/favicons/logo.svg', type: 'image/svg+xml' },
        ],
        apple: [
            { url: '/favicons/apple-touch-icon-57x57.png', sizes: '57x57' },
            { url: '/favicons/apple-touch-icon-60x60.png', sizes: '60x60' },
            { url: '/favicons/apple-touch-icon-72x72.png', sizes: '72x72' },
            { url: '/favicons/apple-touch-icon-76x76.png', sizes: '76x76' },
            { url: '/favicons/apple-touch-icon-114x114.png', sizes: '114x114' },
            { url: '/favicons/apple-touch-icon-120x120.png', sizes: '120x120' },
            { url: '/favicons/apple-touch-icon-144x144.png', sizes: '144x144' },
            { url: '/favicons/apple-touch-icon-152x152.png', sizes: '152x152' },
            { url: '/favicons/apple-touch-icon-180x180.png', sizes: '180x180' },
        ],
        other: [
            {
                rel: 'android-chrome-icon',
                url: '/favicons/android-chrome-36x36.png',
                sizes: '36x36',
            },
            {
                rel: 'android-chrome-icon',
                url: '/favicons/android-chrome-48x48.png',
                sizes: '48x48',
            },
            {
                rel: 'android-chrome-icon',
                url: '/favicons/android-chrome-72x72.png',
                sizes: '72x72',
            },
            {
                rel: 'android-chrome-icon',
                url: '/favicons/android-chrome-96x96.png',
                sizes: '96x96',
            },
            {
                rel: 'android-chrome-icon',
                url: '/favicons/android-chrome-144x144.png',
                sizes: '144x144',
            },
            {
                rel: 'android-chrome-icon',
                url: '/favicons/android-chrome-192x192.png',
                sizes: '192x192',
            },
            {
                rel: 'android-chrome-icon',
                url: '/favicons/android-chrome-512x512.png',
                sizes: '512x512',
            },
        ],
    },

    // verification: {
    //     appleSignin: 'appleSignin-site-verification-code',
    //     yandex: 'yandex-verification-code',
    //     yahoo: 'yahoo-site-verification-code',
    //     bing: 'bing-site-verification-code',
    //     me: ['me-verification-code'],
    //     other: {
    //         'baidu-site-verification': ['baidu-verification-code'],
    //     },
    // },

    generator: 'Next.js',

    appleWebApp: {
        capable: true,
        title: 'Form Builder App',
        statusBarStyle: 'black-translucent',
        // startupImage: ['/startup-640x1136.png', '/startup-750x1334.png'],
    },
};
