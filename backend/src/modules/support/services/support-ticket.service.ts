import { Injectable } from '@nestjs/common';
import { OneDriveService } from '../../../common/one-drive/services/one-drive.service';
import { CreateSupportTicketDto } from '../dtos/create-support-ticket.dto';
import { ISupportTicket } from '../interfaces/support-ticket.interface';

@Injectable()
export class SupportTicketService {
    constructor(private readonly oneDriveService: OneDriveService) {}

    async createTicket(
        createTicketDto: CreateSupportTicketDto
    ): Promise<ISupportTicket> {
        const ticket: ISupportTicket = {
            ...createTicketDto,
            createdAt: new Date().toISOString(),
        };

        const fileName = `support-ticket-${Date.now()}.json`;
        const content = Buffer.from(JSON.stringify(ticket));

        const fileId = await this.oneDriveService.uploadFile(fileName, content);
        const fileUrl = await this.oneDriveService.getFileUrl(fileId);

        return {
            ...ticket,
            link: fileUrl,
        };
    }
}
