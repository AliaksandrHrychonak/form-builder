import { z } from 'zod';

export const firstNameSchema = z.string().trim().min(1).max(50);

export const lastNameSchema = z.string().trim().min(1).max(50);
