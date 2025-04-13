import { z } from 'zod';

export const createStepSchema = <T extends Record<string, z.ZodType>>(steps: T): z.ZodObject<T> => {
    return z.object(steps);
};
