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
import { TemplateQuestionService } from '../services/template-question.service';
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
    TEMPLATE_QUESTION_DEFAULT_USER_AVAILABLE_ORDER_BY,
    TEMPLATE_QUESTION_DEFAULT_USER_AVAILABLE_SEARCH,
    TEMPLATE_QUESTION_DEFAULT_USER_ORDER_BY,
} from '../constants/template-question.list.constant';
import { TemplateQuestionDoc } from '../repository/entities/template-question.entity';
import { ITemplateQuestionDoc } from '../interfaces/template-question.interface';
import { TemplateQuestionGetResponseDto } from '../dtos/response/template-question.get.response.dto';
import { TemplateQuestionListResponseDto } from '../dtos/response/template-queston.list.response.dto';
import { TemplateQuestionParsePipe } from '../pipes/template-question.parse.pipe';
import { TemplateQuestionCreateRequestDto } from '../dtos/request/template-question.create.request.dto';
import { TemplateQuestionBulkDeleteRequestDto } from '../dtos/request/template-question-bulk.delete.request.dto';
import { ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';
import { TemplateSearchService } from '../services/template-search.service';
import { UserDoc } from '../../user/repository/entities/user.entity';
import { TemplateAccessSharedPipe } from '../pipes/template.access-shared.pipe';
import { TemplateQuestionAccessSharedPipe } from '../pipes/template-question.access-shared.pipe';

@ApiTags('modules.template.user')
@Controller({
    version: '1',
    path: '/template',
})
export class TemplateQuestionUserController {
    constructor(
        @DatabaseConnection() private readonly databaseConnection: Connection,
        private readonly templateQuestionService: TemplateQuestionService,
        private readonly templateSearchService: TemplateSearchService,
        private readonly paginationService: PaginationService
    ) {}

    @ResponsePaging('template.question.list')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Get('/:templateId/question/list')
    async list(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessSharedPipe
        )
        template: TemplateDoc,
        @PaginationQuery({
            defaultOrderBy: TEMPLATE_QUESTION_DEFAULT_USER_ORDER_BY,
            availableOrderBy: TEMPLATE_QUESTION_DEFAULT_USER_AVAILABLE_ORDER_BY,
            availableSearch: TEMPLATE_QUESTION_DEFAULT_USER_AVAILABLE_SEARCH,
        })
        { _search, _limit, _offset, _order }: PaginationListDto
    ): Promise<IResponsePaging<TemplateQuestionListResponseDto>> {
        const find: Record<string, any> = {
            ..._search,
            template,
        };

        const questions: TemplateQuestionDoc[] =
            await this.templateQuestionService.findAll(find, {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
            });
        const total: number = await this.templateQuestionService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        const mapped = await this.templateQuestionService.mapList(questions);

        return {
            _pagination: { total, totalPage },
            data: mapped,
        };
    }

    @Response('template.question.get')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Get('/:templateId/question/get/:questionId')
    async get(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessSharedPipe
        )
        template: TemplateDoc,
        @Param(
            'questionId',
            RequestRequiredPipe,
            TemplateQuestionParsePipe,
            TemplateQuestionAccessSharedPipe
        )
        question: ITemplateQuestionDoc
    ): Promise<IResponse<TemplateQuestionGetResponseDto>> {
        const mapped: TemplateQuestionGetResponseDto =
            await this.templateQuestionService.mapGetTemplateQuestion(question);

        return { data: mapped };
    }

    @Response('template.question.create')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Post('/:templateId/question/create')
    async create(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessOwnerPipe
        )
        template: TemplateDoc,
        @Body()
        {
            title,
            description,
            options,
            order,
            required,
            validation,
            type,
        }: TemplateQuestionCreateRequestDto,
        @User() user: UserDoc
    ): Promise<IResponse<DatabaseIdResponseDto>> {
        try {
            const created = await this.templateQuestionService.create({
                title,
                description,
                template: template._id,
                options,
                order,
                required,
                validation,
                type,
                user: user._id,
            });

            await this.templateSearchService.addQuestions(template._id, [
                {
                    title: created.title,
                    description: created.description,
                    _id: created._id,
                },
            ]);

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

    @Response('template.question.selfDeleteBulk')
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
    @Patch('/:templateId/question/delete/bulk')
    async deleteBulk(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessOwnerPipe
        )
        template: TemplateDoc,
        @Body()
        { ids }: TemplateQuestionBulkDeleteRequestDto
    ): Promise<void> {
        const uniqueQuestionsIds = [...new Set(ids)];

        const findCriteria: Record<string, any> = {
            _id: { $in: ids },
            template: template._id,
        };

        const session: ClientSession =
            await this.databaseConnection.startSession();
        session.startTransaction();
        try {
            const exist = await this.templateQuestionService.exists({
                findCriteria,
                session,
            });

            if (!exist) {
                throw new NotFoundException({
                    statusCode:
                        ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                    message: 'template.question.error.notFound',
                });
            }

            await this.templateQuestionService.selfDeleteBulk(findCriteria, {
                session,
            });

            await this.templateSearchService.removeQuestions(
                template._id,
                uniqueQuestionsIds
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
