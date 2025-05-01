import { z } from 'zod';

import { emailSchema as emailSchemaBase, passwordSchema as passwordSchemaBase } from '@shared/api';

const emailSchema = z.object({
    email: emailSchemaBase,
});

const passwordSchema = z.object({
    password: passwordSchemaBase,
});

// zod: Refine validations on object definitions don't get triggered until all fields in the object exist. https://github.com/colinhacks/zod/issues/479
export const LoginFormSchema = z.intersection(emailSchema, passwordSchema);

export type LoginFormData = z.infer<typeof LoginFormSchema>;
