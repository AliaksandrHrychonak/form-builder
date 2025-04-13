import type { LoginFormData } from './login.schema';

export const createDefaultValuesLogin = (): LoginFormData => {
    return {
        email: '',
        password: '',
    };
};
