import { z } from 'zod';

export const emailScheme = z.string().min(1).email();
