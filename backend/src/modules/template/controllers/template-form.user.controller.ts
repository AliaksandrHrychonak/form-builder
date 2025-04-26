import { ClientSession, Connection } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { DatabaseConnection } from '../../../common/database/decorators/database.decorator';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
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
import { User, UserProtected } from '../../user/decorators/user.decorator';
import { AuthJwtAccessProtected } from '../../../common/auth/decorators/auth.jwt.decorator';
import { ApiKeyPublicProtected } from '../../../common/api-key/decorators/api-key.decorator';
import { PaginationQuery } from '../../../common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from '../../../common/pagination/dtos/pagination.list.dto';
import { UserDoc } from '../../user/repository/entities/user.entity';
import {
    IResponse,
    IResponsePaging,
} from '../../../common/response/interfaces/response.interface';
import { TemplateDoc } from '../repository/entities/template.entity';
import { RequestRequiredPipe } from '../../../common/request/pipes/request.required.pipe';
import { TemplateParsePipe } from '../pipes/template.parse.pipe';
import { TemplateAccessOwnerPipe } from '../pipes/template.access-owner.pipe';
import { DatabaseIdResponseDto } from '../../../common/database/dtos/response/database.id.response.dto';
import { ENUM_APP_STATUS_CODE_ERROR } from '../../../app/constants/app.status-code.constant';
import {
    TEMPLATE_FORM_DEFAULT_USER_AVAILABLE_ORDER_BY,
    TEMPLATE_FORM_DEFAULT_USER_ORDER_BY,
} from '../constants/template-form.list.constant';
import { TemplateFormService } from '../services/template-form.service';
import { TemplateFormCreateRequestDto } from '../dtos/request/template-form.create.request.dto';
import { TemplateFormDoc } from '../repository/entities/template-form.entity';
import { TemplateFormParsePipe } from '../pipes/template-form.parse.pipe';
import { TemplateFormGetResponseDto } from '../dtos/response/template-form.get.response.dto';
import { ITemplateFormDoc } from '../interfaces/template-form.interface';
import { TemplateFormListResponseDto } from '../dtos/response/template-form.list.response.dto';
import { ENUM_TEMPLATE_FORM_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';
import { TemplateSearchService } from '../services/template-search.service';
import {
    TEMPLATE_DEFAULT_POPULARITY_SCORE_DECREMENT,
    TEMPLATE_DEFAULT_POPULARITY_SCORE_INCREMENT,
} from '../constants/template-form.constant';
import { TemplateFormBulkDeleteRequestDto } from '../dtos/request/template-form-bulk.delete.request.dto';
import { TemplateAccessSharedPipe } from '../pipes/template.access-shared.pipe';
import { TemplateFormAccessSharedPipe } from '../pipes/template-form.access-shared.pipe';

@ApiTags('modules.template.user')
@Controller({
    version: '1',
    path: '/template',
})
export class TemplateFormUserController {
    constructor(
        @DatabaseConnection() private readonly databaseConnection: Connection,
        private readonly templateFormService: TemplateFormService,
        private readonly paginationService: PaginationService,
        private readonly templateSearchService: TemplateSearchService
    ) {}

    @ResponsePaging('template.form.list')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Get('/:templateId/form/list')
    async list(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessSharedPipe
        )
        template: TemplateDoc,
        @PaginationQuery({
            defaultOrderBy: TEMPLATE_FORM_DEFAULT_USER_ORDER_BY,
            availableOrderBy: TEMPLATE_FORM_DEFAULT_USER_AVAILABLE_ORDER_BY,
        })
        { _limit, _offset, _order }: PaginationListDto
    ): Promise<IResponsePaging<TemplateFormListResponseDto>> {
        const find: Record<string, any> = {
            template,
        };

        const forms: TemplateFormDoc[] = await this.templateFormService.findAll(
            find,
            {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
            }
        );
        const total: number = await this.templateFormService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        const mapped = await this.templateFormService.mapList(forms);

        return {
            _pagination: { total, totalPage },
            data: mapped,
        };
    }

    @Response('template.form.get')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Get('/:templateId/form/get/:formId')
    async get(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessSharedPipe
        )
        template: TemplateDoc,
        @Param(
            'formId',
            RequestRequiredPipe,
            TemplateFormParsePipe,
            TemplateFormAccessSharedPipe
        )
        form: ITemplateFormDoc
    ): Promise<IResponse<TemplateFormGetResponseDto>> {
        const mapped: TemplateFormGetResponseDto =
            await this.templateFormService.mapGetTemplateForm(form);

        return { data: mapped };
    }

    @Response('template.form.create')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Post('/:templateId/form/create')
    async create(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessOwnerPipe
        )
        template: TemplateDoc,
        @Body()
        { answers }: TemplateFormCreateRequestDto,
        @User() user: UserDoc
    ): Promise<IResponse<DatabaseIdResponseDto>> {
        try {
            const created = await this.templateFormService.create({
                template: template._id,
                answers,
                user: user._id,
            });

            await this.templateSearchService.updatePopularityScore(
                template._id,
                TEMPLATE_DEFAULT_POPULARITY_SCORE_INCREMENT
            );

            return {
                data: { _id: created._id },
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }

    @Response('template.form.selfDeleteBulk')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [
            ENUM_POLICY_ACTION.READ,
            ENUM_POLICY_ACTION.UPDATE,
            ENUM_POLICY_ACTION.DELETE,
        ],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Patch('/:templateId/form/delete/bulk')
    async deleteBulk(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessOwnerPipe
        )
        template: TemplateDoc,
        @Body()
        { ids }: TemplateFormBulkDeleteRequestDto
    ): Promise<void> {
        const uniqueFormIds = [...new Set(ids)];

        const findCriteria: Record<string, any> = {
            _id: { $in: ids },
            template: template._id,
        };

        const session: ClientSession =
            await this.databaseConnection.startSession();
        session.startTransaction();
        try {
            const exist = await this.templateFormService.exists(findCriteria, {
                session,
            });

            if (!exist) {
                throw new NotFoundException({
                    statusCode:
                        ENUM_TEMPLATE_FORM_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                    message: 'template.form.error.notFound',
                });
            }

            await this.templateFormService.selfDeleteBulk(findCriteria, {
                session,
            });

            await this.templateSearchService.updatePopularityScore(
                template._id,
                uniqueFormIds.length *
                    TEMPLATE_DEFAULT_POPULARITY_SCORE_DECREMENT
            );

            await session.commitTransaction();
            await session.endSession();

            return;
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
