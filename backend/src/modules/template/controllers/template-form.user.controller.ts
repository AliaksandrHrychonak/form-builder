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
import { TemplateService } from '../services/template.service';
import { UserService } from '../../user/services/user.service';
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
import { TemplateAccessPipe } from '../pipes/template.access.pipe';
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
import { TemplateFormAccessPipe } from '../pipes/template-form.access.pipe';
import { TemplateFormGetResponseDto } from '../dtos/response/template-form.get.response.dto';
import { ITemplateFormDoc } from '../interfaces/template-form.interface';
import { TemplateFormListResponseDto } from '../dtos/response/template-form.list.response.dto';
import { TemplateUpdateManyIdsRequestDto } from '../dtos/request/template-many-ids.update.request.dto';
import {
    ENUM_TEMPLATE_FORM_STATUS_CODE_ERROR,
    ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR,
} from '../constants/template.status-code.constant';
import { TemplateQuestionParsePipe } from '../pipes/template-question.parse.pipe';
import { TemplateQuestionAccessPipe } from '../pipes/template-question.access.pipe';
import { TemplateQuestionDoc } from '../repository/entities/template-question.entity';

@ApiTags('modules.template.user')
@Controller({
    version: '1',
    path: '/template',
})
export class TemplateFormUserController {
    constructor(
        @DatabaseConnection() private readonly databaseConnection: Connection,
        private readonly templateService: TemplateService,
        private readonly templateFormService: TemplateFormService,
        private readonly userService: UserService,
        private readonly paginationService: PaginationService
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
            TemplateAccessPipe
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
            TemplateAccessPipe
        )
        template: TemplateDoc,
        @Param(
            'formId',
            RequestRequiredPipe,
            TemplateFormParsePipe,
            TemplateFormAccessPipe
        )
        form: TemplateFormDoc
    ): Promise<IResponse<TemplateFormGetResponseDto>> {
        const templateFormWithRelations: ITemplateFormDoc =
            await this.templateFormService.joinWithRelations(form);
        const mapped: TemplateFormGetResponseDto =
            await this.templateFormService.mapGetTemplateForm(
                templateFormWithRelations
            );

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
            TemplateAccessPipe
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

    @Response('template.form.selfDeleteMany')
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
    @Patch('/:templateId/form/delete/many')
    async deleteMany(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessPipe
        )
        template: TemplateDoc,
        @Body()
        { ids }: TemplateUpdateManyIdsRequestDto,
        @User() user: UserDoc
    ): Promise<void> {
        const uniqueFormIds = [...new Set(ids)];

        const promises: Promise<any>[] = [
            this.templateFormService.existsByIds(uniqueFormIds),
        ];

        const [checkForms] = await Promise.all(promises);

        if (!checkForms) {
            throw new NotFoundException({
                statusCode:
                    ENUM_TEMPLATE_FORM_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                message: 'template.form.error.notFound',
            });
        }

        const session: ClientSession =
            await this.databaseConnection.startSession();
        session.startTransaction();
        try {
            await this.templateFormService.selfDeleteMany(uniqueFormIds, [
                user._id,
            ]);

            // TODO delete ids drom template

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

    @Response('template.form.selfDelete')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [
            ENUM_POLICY_ACTION.DELETE,
            ENUM_POLICY_ACTION.UPDATE,
            ENUM_POLICY_ACTION.READ,
        ],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Patch('/:templateId/form/delete/:formId')
    async delete(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessPipe
        )
        template: TemplateDoc,
        @Param(
            'formId',
            RequestRequiredPipe,
            TemplateFormParsePipe,
            TemplateFormAccessPipe
        )
        form: TemplateFormDoc
    ): Promise<void> {
        const newForms: string[] = template.forms.filter(f => f !== form._id);

        const session: ClientSession =
            await this.databaseConnection.startSession();
        session.startTransaction();

        try {
            await this.templateService.updateForms(template, newForms, {
                session,
            });

            await this.templateFormService.selfDelete(form);

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
