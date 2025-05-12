import type { Config } from '@shared/config';

type SUPPORT_DEFAULT_PRIORITY = typeof Config.SUPPORT.DEFAULT_PRIORITY;
export type EnumSupportDefaultPriority = SUPPORT_DEFAULT_PRIORITY[number];

export interface ISupportTicket {
    reportedBy: string;
    template?: string;
    link: string;
    priority: EnumSupportDefaultPriority;
    description: string;
    createdAt: string;
}
