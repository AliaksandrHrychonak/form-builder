import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SUPPORT_CONFIG } from '../configs/support.config';
import type { EnumSupportDefaultPriority } from '../interfaces/support-ticket.interface';

export class CreateSupportTicketDto {
    @IsString()
    @IsNotEmpty()
    reportedBy: string;

    @IsString()
    @IsOptional()
    template?: string;

    @IsString()
    @IsNotEmpty()
    link: string;

    @IsEnum(SUPPORT_CONFIG.DEFAULT_PRIORITY)
    priority: EnumSupportDefaultPriority;

    @IsString()
    @IsNotEmpty()
    description: string;
}
