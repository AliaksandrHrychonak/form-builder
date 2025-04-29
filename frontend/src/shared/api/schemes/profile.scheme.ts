import { z } from 'zod';

export const firstNameScheme = z.string().trim().min(1).max(50);

export const lastNameScheme = z.string().trim().min(1).max(50);
