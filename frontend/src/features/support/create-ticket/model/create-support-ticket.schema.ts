import { z } from 'zod';

import { Config } from '@shared/config';

const { SUPPORT } = Config;

export const supportTicketSchema = z
    .object({
        description: z.string().min(1).max(1000),
        priority: z.enum(SUPPORT.DEFAULT_PRIORITY as unknown as [string, ...string[]]),
        reportedBy: z.string().email(),
        link: z.string().url(),
        template: z.string().optional(),
        createdAt: z.string().datetime(),
    })
    .strict();

export type SupportTicketSchemaType = z.infer<typeof supportTicketSchema>;

export const supportTicketFormSchema = z
    .object({
        description: supportTicketSchema.shape.description,
        priority: supportTicketSchema.shape.priority,
    })
    .strict();

export type SupportTicketFormData = z.infer<typeof supportTicketFormSchema>;
