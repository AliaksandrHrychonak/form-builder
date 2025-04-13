import { z } from 'zod';

export const firstNameScheme = z
    .string()
    .trim()
    .min(1, { message: 'Field required' })
    .max(30, { message: 'Maximum field length 30 characters' });

export const lastNameScheme = z
    .string()
    .trim()
    .min(1, { message: 'Field required' })
    .max(30, { message: 'Maximum field length 30 characters' });
