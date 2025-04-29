export * from './theme';
export * from './i18n';
export * from './meta';

export const Config = {
    BASE_API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api',
    API_KEY_PUBLIC: process.env.NEXT_PUBLIC_API_KEY || '',
    API_WITH_CREDENTIALS: process.env.NEXT_PUBLIC_API_WITH_CREDENTIALS === 'true',
    API_KEY_PRIVATE: process.env.API_KEY_PRIVATE || '',
    API_KEY_HEADER: process.env.NEXT_PUBLIC_API_KEY_HEADER ?? 'x-api-key',
    API_LANG_HEADER: process.env.NEXT_PUBLIC_API_LANG_HEADER ?? 'x-custom-lang',
    APP_ROUTES: {
        SIGN_IN: 'auth/signin',
        SIGN_UP: 'auth/signup',
        SIGN_OUT_CALLBACK: '/',
        TERMS_SERVICE: 'auth/terms',
        PRIVACY_POLICY: 'auth/privacy',
        FORGOT_PASSWORD: 'auth/forgot-password',
    },
    DEFAULT_DELAY: Number(process.env.NEXT_PUBLIC_DEFAULT_DELAY),
    UI_COOKIE_MAX_AGE: Number(process.env.NEXT_PUBLIC_UI_COOKIE_MAX_AGE),
    UI_MOBILE_BREAKPOINT: Number(process.env.NEXT_PUBLIC_UI_MOBILE_BREAKPOINT),
} as const;

export type Config = typeof Config;
