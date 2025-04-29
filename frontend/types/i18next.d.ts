import 'i18next';
import type auth from '@shared/config/i18n/locales/en/auth.json';
import type language from '@shared/config/i18n/locales/en/language.json';
import type metadata from '@shared/config/i18n/locales/en/metadata.json';
import type signin from '@shared/config/i18n/locales/en/signin.json';
import type signup from '@shared/config/i18n/locales/en/signup.json';
import type theme from '@shared/config/i18n/locales/en/theme.json';
import type translation from '@shared/config/i18n/locales/en/translation.json';
import type zod from '@shared/config/i18n/locales/en/zod.json';
import type zodcustom from '@shared/config/i18n/locales/en/zodcustom.json';

interface Resources {
    auth: typeof auth;
    translation: typeof translation;
    zod: typeof zod;
    zodcustom: typeof zodcustom;
    theme: typeof theme;
    language: typeof language;
    metadata: typeof metadata;
    signin: typeof signin;
    signup: typeof signup;
}

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: Resources;
    }
}
