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
    // TODO Error texts should be in the config, need fix after review
    passwordInfo: z
        .object({
            password: passwordScheme,
            confirmPassword: z.string().nonempty({ message: 'Confirm the password' }).optional(),
        })
        .superRefine(({ password, confirmPassword }, ctx) => {
            validatePassword(password, ctx);
            if (confirmPassword !== password) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['confirmPassword'],
                    message: 'Password mismatch',
                });
            }
        }),
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
