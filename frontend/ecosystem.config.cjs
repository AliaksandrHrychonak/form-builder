module.exports = {
    apps: [
        {
            name: 'FRONTEND',
            script: 'server.js',
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
                NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
                NEXT_PUBLIC_API_WITH_CREDENTIALS: process.env.NEXT_PUBLIC_API_WITH_CREDENTIALS,
                NEXT_PUBLIC_API_KEY_HEADER: process.env.NEXT_PUBLIC_API_KEY_HEADER,
                NEXT_PUBLIC_API_LANG_HEADER: process.env.NEXT_PUBLIC_API_LANG_HEADER,
                NEXT_PUBLIC_DEFAULT_DELAY: process.env.NEXT_PUBLIC_DEFAULT_DELAY,
                NEXT_PUBLIC_UI_COOKIE_MAX_AGE: process.env.NEXT_PUBLIC_UI_COOKIE_MAX_AGE,
                NEXT_PUBLIC_UI_MOBILE_BREAKPOINT: process.env.NEXT_PUBLIC_UI_MOBILE_BREAKPOINT,
                NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,

                API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
                NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
                NEXTAUTH_URL: process.env.NEXTAUTH_URL,
                GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
                GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
                APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
                APPLE_CLIENT_SECRET: process.env.APPLE_CLIENT_SECRET,
            },
        },
    ],
};
