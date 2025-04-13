import { z } from 'zod';

export const emailScheme = z.string().min(1, { message: 'Field required' }).email({
    message: 'Must be a valid email',
});
