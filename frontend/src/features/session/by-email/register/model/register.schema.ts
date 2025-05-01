import { z } from 'zod';

import { emailSchema, firstNameSchema, lastNameSchema, passwordSchema, validatePassword } from '@shared/api';
import { createStepSchema } from '@shared/lib';

export const RegisterFormSchema = createStepSchema({
    profileInfo: z.object({
        firstName: firstNameSchema,
        lastName: lastNameSchema,
    }),
    contactInfo: z.object({
        email: emailSchema,
    }),
    passwordInfo: z
        .object({
            password: passwordSchema,
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
