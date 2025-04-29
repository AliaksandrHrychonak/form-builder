import { z } from 'zod';

import { emailScheme, firstNameScheme, lastNameScheme, passwordScheme, validatePassword } from '@shared/api';
import { createStepSchema } from '@shared/lib';

export const RegisterFormSchema = createStepSchema({
    profileInfo: z.object({
        firstName: firstNameScheme,
        lastName: lastNameScheme,
    }),
    contactInfo: z.object({
        email: emailScheme,
    }),
    passwordInfo: z
        .object({
            password: passwordScheme,
            confirmPassword: z.string().nonempty().optional(),
        })
        .superRefine(({ password, confirmPassword }, ctx) => {
            validatePassword(password, ctx);
            if (confirmPassword !== password) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['confirmPassword'],
                    params: {
                        i18n: 'errors.password.mismatch',
                    },
                });
            }
        }),
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
