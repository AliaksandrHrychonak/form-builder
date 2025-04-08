import { z } from 'zod';

import { userNameScheme } from '@shared/api';

export const AuthByUsernameFormSchema = z.object({
    username: userNameScheme,
});

export type AuthByUsernameFormData = z.infer<typeof AuthByUsernameFormSchema>;
