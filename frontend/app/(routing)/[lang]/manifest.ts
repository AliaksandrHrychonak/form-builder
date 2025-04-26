import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Form Builder PWA',
        short_name: 'Form Builder PWA',
        description: 'A Progressive Web App built with Next.js',
        scope: '/',
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        orientation: 'any',
        background_color: '#ffffff',
        theme_color: '#000000',
        lang: 'en',
        dir: 'ltr',
        prefer_related_applications: false,
        icons: [
            {
                src: '/favicons/favicon-16.png',
                type: 'image/png',
                sizes: '16x16',
            },
            {
                src: '/favicons/favicon-32.png',
                type: 'image/png',
                sizes: '32x32',
            },
            {
                src: '/favicons/android-chrome-36x36.png',
                sizes: '36x36',
                type: 'image/png',
            },
            {
                src: '/favicons/android-chrome-48x48.png',
                sizes: '48x48',
                type: 'image/png',
            },
            {
                src: '/favicons/android-chrome-72x72.png',
                sizes: '72x72',
                type: 'image/png',
            },
            {
                src: '/favicons/android-chrome-96x96.png',
                sizes: '96x96',
                type: 'image/png',
            },
            {
                src: '/favicons/android-chrome-144x144.png',
                sizes: '144x144',
                type: 'image/png',
            },
            {
                src: '/favicons/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/favicons/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
