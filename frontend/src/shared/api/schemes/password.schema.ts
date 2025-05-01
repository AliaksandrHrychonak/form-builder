import { z } from 'zod';

// code: z.ZodIssueCode.custom,
//     path: ['name'],
//     params: {
//     // i18n: {
//     //     key: 'errors.password.mismatch',
//     //     values: { /* params */ }
//     // }
// },

export const passwordSchema = z
    .string()
    .min(4)
    .refine((value: string) => value.trim().length > 0);

export const validatePassword = (_password: string, _ctx: z.RefinementCtx): void => {
    const containsUppercase = (ch: string): boolean => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string): boolean => /[a-z]/.test(ch);

    const containsSpecialChar = (ch: string): boolean => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0;
    let countOfLowerCase = 0;
    let countOfNumbers = 0;
    let countOfSpecialChar = 0;

    for (let i = 0; i < _password.length; i++) {
        const ch = _password.charAt(i);

        if (!isNaN(+ch)) countOfNumbers++;
        else if (containsUppercase(ch)) countOfUpperCase++;
        else if (containsLowercase(ch)) countOfLowerCase++;
        else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    if (countOfLowerCase < 1) {
        _ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['password'],
            params: {
                i18n: 'errors.password.lowercase',
            },
        });
    }
    if (countOfNumbers < 1) {
        _ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['password'],
            params: {
                i18n: 'errors.password.number',
            },
        });
    }
    if (countOfUpperCase < 1) {
        _ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['password'],
            params: {
                i18n: 'errors.password.uppercase',
            },
        });
    }
    if (countOfSpecialChar < 1) {
        _ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['password'],
            params: {
                i18n: 'errors.password.special',
            },
        });
    }
};
