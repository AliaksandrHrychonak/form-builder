import { SUPPORT_CONFIG } from '../configs/support.config';

type SUPPORT_DEFAULT_PRIORITY = typeof SUPPORT_CONFIG.DEFAULT_PRIORITY;
export type EnumSupportDefaultPriority = SUPPORT_DEFAULT_PRIORITY[number];

export interface ISupportTicket {
    reportedBy: string;
    template?: string;
    link: string;
    priority: EnumSupportDefaultPriority;
    description: string;
    createdAt: string;
}
