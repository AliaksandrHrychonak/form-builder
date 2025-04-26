import type { RegisterFormData } from './register.schema';

export const createDefaultValuesRegister = (): RegisterFormData => {
    return {
        profileInfo: {
            firstName: '',
            lastName: '',
        },
        contactInfo: {
            email: '',
        },
        passwordInfo: {
            password: '',
            confirmPassword: '',
        },
    };
};
