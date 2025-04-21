import { Connection } from 'mongoose';
import { DatabaseConnection } from 'src/common/database/decorators/database.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('modules.admin.template')
@Controller({
    version: '1',
    path: '/template',
})
export class TemplateAdminController {
    constructor(
        @DatabaseConnection() private readonly databaseConnection: Connection
    ) {}
}
