import { Module } from '@nestjs/common';
import { OneDriveModule } from '../../common/one-drive/one-drive.module';
import { SupportTicketService } from './services/support-ticket.service';
import { SupportPublicController } from './controllers/support.public.controller';

@Module({
    imports: [OneDriveModule],
    controllers: [SupportPublicController],
    providers: [SupportTicketService],
    exports: [SupportTicketService],
})
export class SupportModule {}
