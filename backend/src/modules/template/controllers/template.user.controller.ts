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
import { TemplateCommentService } from '../services/template-comment.service';
import { TemplateFormService } from '../services/template-form.service';
import { TemplateTagService } from '../services/template-tag.service';
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
import {
    TEMPLATE_DEFAULT_USER_AVAILABLE_ORDER_BY,
    TEMPLATE_DEFAULT_USER_AVAILABLE_SEARCH,
    TEMPLATE_DEFAULT_USER_ORDER_BY,
} from '../constants/template.list.constant';
import { PaginationListDto } from '../../../common/pagination/dtos/pagination.list.dto';
import { UserDoc } from '../../user/repository/entities/user.entity';
import {
    IResponse,
    IResponsePaging,
} from '../../../common/response/interfaces/response.interface';
import { TemplateListResponseDto } from '../dtos/response/template.list.response.dto';
import { TemplateDoc } from '../repository/entities/template.entity';
import { RequestRequiredPipe } from '../../../common/request/pipes/request.required.pipe';
import { TemplateParsePipe } from '../pipes/template.parse.pipe';
import { TemplateAccessPipe } from '../pipes/template.access.pipe';
import { TemplateGetResponseDto } from '../dtos/response/template.get.response.dto';
import { ITemplateDoc } from '../interfaces/template.interface';
import { TemplateCreateRequestDto } from '../dtos/request/template.create.request.dto';
import { DatabaseIdResponseDto } from '../../../common/database/dtos/response/database.id.response.dto';
import { ENUM_APP_STATUS_CODE_ERROR } from '../../../app/constants/app.status-code.constant';
import { TemplateUpdateManyIdsRequestDto } from '../dtos/request/template-many-ids.update.request.dto';
import { TemplateSharedManyRequestDto } from '../dtos/request/template-shared-many.update.request.dto';

@ApiTags('modules.template.user')
@Controller({
    version: '1',
    path: '/template',
})
export class TemplateUserController {
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
            defaultOrderBy: TEMPLATE_DEFAULT_USER_ORDER_BY,
            availableOrderBy: TEMPLATE_DEFAULT_USER_AVAILABLE_ORDER_BY,
            availableSearch: TEMPLATE_DEFAULT_USER_AVAILABLE_SEARCH,
        })
        { _search, _limit, _offset, _order }: PaginationListDto,
        @User() user: UserDoc
    ): Promise<IResponsePaging<TemplateListResponseDto>> {
        const find: Record<string, any> = {
            ..._search,
            $or: [{ owner: user._id }, { sharedUsers: user._id }],
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
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Get('/get/:templateId')
    async get(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessPipe
        )
        template: TemplateDoc
    ): Promise<IResponse<TemplateGetResponseDto>> {
        const templateWithRelations: ITemplateDoc =
            await this.templateService.joinWithRelations(template);
        const mapped: TemplateGetResponseDto =
            await this.templateService.mapGetTemplate(templateWithRelations);

        return { data: mapped };
    }

    @Response('template.create')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Post('/create')
    async create(
        @Body()
        {
            title,
            description,
            isPublic,
            forms,
            questions,
            sharedUsers,
            tags,
            topic,
        }: TemplateCreateRequestDto,
        @User() user: UserDoc
    ): Promise<IResponse<DatabaseIdResponseDto>> {
        const promises: Promise<any>[] = [
            this.templateFormService.existsByIds(forms),
            this.templateQuestionService.existsByIds(questions),
            this.templateTagService.existsByIds(tags),
            this.userService.existsByIds(sharedUsers),
        ];

        const [checkForms, checkQuestions, checkTags, checkUsers] =
            await Promise.all(promises);

        if (!checkForms) {
            throw new NotFoundException({
                statusCode: 404,
                message: 'checkForms',
            });
        } else if (!checkQuestions) {
            throw new NotFoundException({
                statusCode: 404,
                message: 'checkQuestions',
            });
        } else if (!checkTags) {
            throw new NotFoundException({
                statusCode: 404,
                message: 'checkTags',
            });
        } else if (!checkUsers) {
            throw new NotFoundException({
                statusCode: 404,
                message: 'checkUsers',
            });
        }

        const session: ClientSession =
            await this.databaseConnection.startSession();
        session.startTransaction();

        try {
            const created = await this.templateService.create(
                {
                    title,
                    description,
                    isPublic,
                    forms,
                    owner: user._id,
                    questions,
                    sharedUsers,
                    tags,
                    topic,
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

    @Response('template.public')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Patch('/update/:templateId/public')
    async public(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessPipe
        )
        template: TemplateDoc
    ): Promise<void> {
        try {
            await this.templateService.public(template);
            return;
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }

    @Response('template.publicMany')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Patch('/update/many/public')
    async publicMany(
        @Body()
        { ids }: TemplateUpdateManyIdsRequestDto,
        @User() user: UserDoc
    ): Promise<void> {
        try {
            await this.templateService.publicMany(ids, [user._id]);
            return;
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }

    @Response('template.private')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Patch('/update/:templateId/private')
    async private(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessPipe
        )
        template: TemplateDoc
    ): Promise<void> {
        try {
            await this.templateService.private(template);
            return;
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }

    @Response('template.privateMany')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Patch('/update/many/private')
    async privateMany(
        @Body()
        { ids }: TemplateUpdateManyIdsRequestDto,
        @User() user: UserDoc
    ): Promise<void> {
        try {
            await this.templateService.privateMany(ids, [user._id]);
            return;
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }

    @Response('template.shared')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Patch('/update/:templateId/shared')
    async shared(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessPipe
        )
        template: TemplateDoc,
        @Body()
        { ids: owners }: TemplateUpdateManyIdsRequestDto
    ): Promise<void> {
        try {
            await this.templateService.shared(template, owners);
            return;
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }

    @Response('template.sharedMany')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.TEMPLATE,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    })
    @PolicyRoleProtected(ENUM_POLICY_ROLE_TYPE.USER)
    @UserProtected()
    @AuthJwtAccessProtected()
    @ApiKeyPublicProtected()
    @Patch('/update/many/shared')
    async sharedMany(
        @Body()
        { sharedUsers, templateIds }: TemplateSharedManyRequestDto,
        @User() user: UserDoc
    ): Promise<void> {
        const checkedSharedUsers =
            await this.userService.existsByIds(sharedUsers);

        if (!checkedSharedUsers) {
            throw new NotFoundException({
                statusCode: 404,
                message: 'checkedSharedUsers',
            });
        }

        try {
            await this.templateService.sharedMany(
                templateIds,
                [user._id],
                sharedUsers
            );
            return;
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }

    @Response('template.selfDeleteMany')
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
    @Patch('/delete/many')
    async deleteMany(
        @Body()
        { ids }: TemplateUpdateManyIdsRequestDto,
        @User() user: UserDoc
    ): Promise<void> {
        const session: ClientSession =
            await this.databaseConnection.startSession();
        session.startTransaction();
        try {
            await this.templateService.selfDeleteMany(ids, [user._id]);
            // TODO add self delete template deps
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

    @Response('template.selfDelete')
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
    @Patch('/delete/:templateId')
    async delete(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessPipe
        )
        template: TemplateDoc
    ): Promise<void> {
        const session: ClientSession =
            await this.databaseConnection.startSession();
        session.startTransaction();

        try {
            await this.templateService.selfDelete(template, {
                session,
            });

            // TODO add self delete template deps

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
