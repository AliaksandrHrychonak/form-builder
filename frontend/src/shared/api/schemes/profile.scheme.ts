import { z } from 'zod';

export const userNameScheme = z
    .string()
    .trim()
    .min(1, { message: 'Field required' })
    .max(30, { message: 'Maximum field length 30 characters' });
