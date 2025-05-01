import { ClientSession, Connection } from 'mongoose';
import { DatabaseConnection } from 'src/common/database/decorators/database.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    InternalServerErrorException,
    Post,
} from '@nestjs/common';
import { Response } from '../../../common/response/decorators/response.decorator';
import {
    PolicyAbilityProtected,
    PolicyRoleProtected,
} from '../../../common/policy/decorators/policy.decorator';
import {
    ENUM_POLICY_ACTION,
    ENUM_POLICY_ROLE_TYPE,
    ENUM_POLICY_SUBJECT,
} from '../../../common/policy/constants/policy.enum.constant';
import { AuthJwtAccessProtected } from '../../../common/auth/decorators/auth.jwt.decorator';
import { IResponse } from '../../../common/response/interfaces/response.interface';
import { DatabaseIdResponseDto } from '../../../common/database/dtos/response/database.id.response.dto';
import { ENUM_APP_STATUS_CODE_ERROR } from '../../../app/constants/app.status-code.constant';
import { TemplateTagService } from '../services/template-tag.service';
import { TemplateTagCreateRequestDto } from '../dtos/request/template-tag.create.request.dto';

@ApiTags('modules.admin.template')
@Controller({
    version: '1',
    path: '/template',
})
export class TemplateTagAdminController {
    constructor(
        @DatabaseConnection() private readonly databaseConnection: Connection,
        private readonly templateTagService: TemplateTagService
    ) {}

    @Response('template.tag.create')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.ADMIN)
    @AuthJwtAccessProtected()
    @Post('/tag/create')
    async create(
        @Body()
        { name, description, color }: TemplateTagCreateRequestDto
    ): Promise<IResponse<DatabaseIdResponseDto>> {
        const session: ClientSession =
            await this.databaseConnection.startSession();
        session.startTransaction();

        try {
            const created = await this.templateTagService.create(
                {
                    name,
                    description,
                    color,
                },
                { session }
            );

            await session.commitTransaction();
            await session.endSession();

            return {
                data: { _id: created._id },
            };
        } catch (err: any) {
            await session.abortTransaction();
            await session.endSession();

            throw new InternalServerErrorException({
                statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }
}
