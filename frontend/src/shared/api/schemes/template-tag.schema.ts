import { z } from 'zod';

export const templateTagSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    color: z.string().optional(),
});
