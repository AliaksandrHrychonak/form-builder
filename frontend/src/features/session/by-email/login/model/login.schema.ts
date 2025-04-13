import { z } from 'zod';

import { emailScheme, passwordScheme } from '@shared/api';

const emailSchema = z.object({
    email: emailScheme,
});

const passwordSchema = z.object({
    password: passwordScheme,
});

// zod: Refine validations on object definitions don't get triggered until all fields in the object exist. https://github.com/colinhacks/zod/issues/479
export const LoginFormSchema = z.intersection(emailSchema, passwordSchema);

export type LoginFormData = z.infer<typeof LoginFormSchema>;
