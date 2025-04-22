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
import { TemplateQuestionService } from '../services/template-question.service';
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
import { TemplateUpdateManyIdsRequestDto } from '../dtos/request/template-many-ids.update.request.dto';
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
import { TemplateQuestionAccessPipe } from '../pipes/template-question.access.pipe';
import { TemplateQuestionCreateRequestDto } from '../dtos/request/template-question.create.request.dto';
import { TemplateQuestionUpdateRequestDto } from '../dtos/request/template-question.update.request.dto';
import { ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';

@ApiTags('modules.template.user')
@Controller({
    version: '1',
    path: '/template',
})
export class TemplateQuestionUserController {
    constructor(
        @DatabaseConnection() private readonly databaseConnection: Connection,
        private readonly templateService: TemplateService,
        private readonly templateQuestionService: TemplateQuestionService,
        private readonly userService: UserService,
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
            TemplateAccessPipe
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
    @Get('/question/get/:questionId')
    async get(
        @Param(
            'questionId',
            RequestRequiredPipe,
            TemplateQuestionParsePipe,
            TemplateQuestionAccessPipe
        )
        question: TemplateQuestionDoc
    ): Promise<IResponse<TemplateQuestionGetResponseDto>> {
        const templateWithRelations: ITemplateQuestionDoc =
            await this.templateQuestionService.joinWithRelations(question);
        const mapped: TemplateQuestionGetResponseDto =
            await this.templateQuestionService.mapGetTemplateQuestion(
                templateWithRelations
            );

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
            TemplateAccessPipe
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
        }: TemplateQuestionCreateRequestDto
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

    @Response('template.question.update')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Patch('/question/update/:questionId')
    async update(
        @Param(
            'questionId',
            RequestRequiredPipe,
            TemplateQuestionParsePipe,
            TemplateQuestionAccessPipe
        )
        question: TemplateQuestionDoc,
        @Body()
        {
            title,
            description,
            options,
            required,
            validation,
            type,
        }: TemplateQuestionUpdateRequestDto
    ): Promise<void> {
        try {
            await this.templateQuestionService.update(question, {
                title,
                description,
                options,
                required,
                validation,
                type,
            });
            return;
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }

    // @Response('template.question.reorder')
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.TEMPLATE,
    //     action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    // })
    // @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    // @UserProtected()
    // @AuthJwtAccessProtected()
    // @ApiKeyPublicProtected()
    // @Patch('/:templateId/question/update/:questionId/reorder')
    // async public(
    //     @Param(
    //         'templateId',
    //         RequestRequiredPipe,
    //         TemplateParsePipe,
    //         TemplateAccessPipe
    //     )
    //     template: TemplateDoc
    // ): Promise<void> {
    //     try {
    //         await this.templateQuestionService.reorder(template);
    //         return;
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
    //             message: 'http.serverError.internalServerError',
    //             _error: err.message,
    //         });
    //     }
    // }

    @Response('template.question.selfDeleteMany')
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
    @Patch('/:templateId/question/delete/many')
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
        const uniqueQuestionsIds = [...new Set(ids)];
        const promises: Promise<any>[] = [
            this.templateQuestionService.existsByIds(uniqueQuestionsIds),
        ];

        const [checkQuestions] = await Promise.all(promises);

        if (!checkQuestions) {
            throw new NotFoundException({
                statusCode:
                    ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                message: 'template.question.error.notFound',
            });
        }

        const findDeleteCriteria = {
            _id: { $in: uniqueQuestionsIds },
        };

        const session: ClientSession =
            await this.databaseConnection.startSession();
        session.startTransaction();
        try {
            await this.templateQuestionService.selfDeleteMany(
                findDeleteCriteria
            );

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

    @Response('template.question.selfDelete')
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
    @Patch('/:templateId/question/delete/:questionId')
    async delete(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessPipe
        )
        template: TemplateDoc,
        @Param(
            'questionId',
            RequestRequiredPipe,
            TemplateQuestionParsePipe,
            TemplateQuestionAccessPipe
        )
        question: TemplateQuestionDoc
    ): Promise<void> {
        const newQuestions: string[] = template.questions.filter(
            q => q !== question._id
        );

        const session: ClientSession =
            await this.databaseConnection.startSession();
        session.startTransaction();

        try {
            await this.templateService.updateQuestions(template, newQuestions, {
                session,
            });

            await this.templateQuestionService.selfDelete(question);

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
