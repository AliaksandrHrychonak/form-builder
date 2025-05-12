import { SupportTicketService } from '../services/support-ticket.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateSupportTicketDto } from '../dtos/create-support-ticket.dto';
import { Response } from '../../../common/response/decorators/response.decorator';
import { ApiKeyPublicProtected } from '../../../common/api-key/decorators/api-key.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('modules.public.support')
@Controller({
    version: '1',
    path: '/support',
})
export class SupportPublicController {
    constructor(private readonly supportTicketService: SupportTicketService) {}

    @Response('support.createTicket')
    @ApiKeyPublicProtected()
    @Post('/create/ticket')
    async createTicket(@Body() createTicketDto: CreateSupportTicketDto) {
        await this.supportTicketService.createTicket(createTicketDto);

        return;
    }
}
