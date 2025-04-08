import type { AuthByUsernameFormData } from './auth-by-username.schema';

export const createDefaultValues = (): AuthByUsernameFormData => {
    return {
        username: '',
    };
};
