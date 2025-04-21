import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientSession, Connection } from 'mongoose';
import { DatabaseConnection } from 'src/common/database/decorators/database.decorator';
import {
    Response,
    ResponsePaging,
} from '../../../common/response/decorators/response.decorator';
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
import { ApiKeyPublicProtected } from '../../../common/api-key/decorators/api-key.decorator';
import { RequestRequiredPipe } from '../../../common/request/pipes/request.required.pipe';
import {
    IResponse,
    IResponsePaging,
} from '../../../common/response/interfaces/response.interface';
import { TemplateDoc } from '../repository/entities/template.entity';
import { TemplateAccessPipe } from '../pipes/template.access.pipe';
import { DatabaseIdResponseDto } from '../../../common/database/dtos/response/database.id.response.dto';
import { ENUM_APP_STATUS_CODE_ERROR } from '../../../app/constants/app.status-code.constant';
import { TemplateCreateRequestDto } from '../dtos/request/template.create.request.dto';
import { TemplateCommentService } from '../services/template-comment.service';
import { TemplateService } from '../services/template.service';
import { TemplateFormService } from '../services/template-form.service';
import { TemplateTagService } from '../services/template-tag.service';
import { TemplateQuestionService } from '../services/template-question.service';
import { User, UserProtected } from '../../user/decorators/user.decorator';
import { UserDoc } from '../../user/repository/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { TemplateGetResponseDto } from '../dtos/response/template.get.response.dto';
import { ITemplateDoc } from '../interfaces/template.interface';
import { TemplateParsePipe } from '../pipes/template.parse.pipe';
import { PaginationQuery } from '../../../common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from '../../../common/pagination/dtos/pagination.list.dto';
import {
    TEMPLATE_DEFAULT_PUBLIC_AVAILABLE_ORDER_BY,
    TEMPLATE_DEFAULT_PUBLIC_ORDER_BY,
    TEMPLATE_DEFAULT_USER_AVAILABLE_ORDER_BY,
    TEMPLATE_DEFAULT_USER_AVAILABLE_SEARCH,
    TEMPLATE_DEFAULT_USER_ORDER_BY,
} from '../constants/template.list.constant';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
import { TemplateListResponseDto } from '../dtos/response/template.list.response.dto';
import { TemplateUpdateManyIdsRequestDto } from '../dtos/request/template-many-ids.update.request.dto';
import { TemplateSharedManyRequestDto } from '../dtos/request/template-shared-many.update.request.dto';
import { TemplatePublicPipe } from '../pipes/template.public.pipe';

@ApiTags('modules.public.template')
@Controller({
    version: '1',
    path: '/template',
})
export class TemplatePublicController {
    constructor(
        @DatabaseConnection() private readonly databaseConnection: Connection,
        private readonly templateService: TemplateService,
        private readonly templateCommentService: TemplateCommentService,
        private readonly templateFormService: TemplateFormService,
        private readonly templateTagService: TemplateTagService,
        private readonly templateQuestionService: TemplateQuestionService,
        private readonly userService: UserService,
        private readonly paginationService: PaginationService
    ) {}

    @ResponsePaging('template.list')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Get('/list')
    async list(
        @PaginationQuery({
            defaultOrderBy: TEMPLATE_DEFAULT_PUBLIC_ORDER_BY,
            availableOrderBy: TEMPLATE_DEFAULT_PUBLIC_AVAILABLE_ORDER_BY,
        })
        { _search, _limit, _offset, _order }: PaginationListDto
    ): Promise<IResponsePaging<TemplateListResponseDto>> {
        const find: Record<string, any> = {
            ..._search,
        };

        const templates: TemplateDoc[] = await this.templateService.findAll(
            find,
            {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
            }
        );
        const total: number = await this.templateService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        const mapped = await this.templateService.mapList(templates);

        return {
            _pagination: { total, totalPage },
            data: mapped,
        };
    }

    @Response('template.get')
    @ApiKeyPublicProtected()
    @Get('/get/:templateId')
    async get(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplatePublicPipe
        )
        template: TemplateDoc
    ): Promise<IResponse<TemplateGetResponseDto>> {
        const templateWithRelations: ITemplateDoc =
            await this.templateService.joinWithRelations(template);
        const mapped: TemplateGetResponseDto =
            await this.templateService.mapGetTemplate(templateWithRelations);

        return { data: mapped };
    }
}
