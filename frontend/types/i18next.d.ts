import 'i18next';
import type { Resources } from '../src/shared/config/i18n';

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: Resources;
    }
}
