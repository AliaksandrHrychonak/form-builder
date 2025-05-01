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
    Query,
} from '@nestjs/common';
import { DatabaseConnection } from '../../../common/database/decorators/database.decorator';
import { TemplateService } from '../services/template.service';
import { TemplateQuestionService } from '../services/template-question.service';
import { UserService } from '../../user/services/user.service';
import {
    Response,
    ResponseElasticsearch,
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
import {
    TEMPLATE_DEFAULT_USER_AVAILABLE_ORDER_BY,
    TEMPLATE_DEFAULT_USER_AVAILABLE_SEARCH,
    TEMPLATE_DEFAULT_USER_ORDER_BY,
} from '../constants/template.list.constant';
import { UserDoc } from '../../user/repository/entities/user.entity';
import {
    IResponse,
    IResponseElasticsearch,
} from '../../../common/response/interfaces/response.interface';
import { TemplateDoc } from '../repository/entities/template.entity';
import { RequestRequiredPipe } from '../../../common/request/pipes/request.required.pipe';
import { TemplateParsePipe } from '../pipes/template.parse.pipe';
import { TemplateGetResponseDto } from '../dtos/response/template.get.response.dto';
import { ITemplateDoc } from '../interfaces/template.interface';
import { TemplateCreateRequestDto } from '../dtos/request/template.create.request.dto';
import { DatabaseIdResponseDto } from '../../../common/database/dtos/response/database.id.response.dto';
import { ENUM_APP_STATUS_CODE_ERROR } from '../../../app/constants/app.status-code.constant';
import { ENUM_TEMPLATE_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';
import { TemplateBulkDeleteRequestDto } from '../dtos/request/template-bulk.delete.request.dto';
import { ElasticsearchQuery } from '../../../common/elasticsearch/decorators/elasticsearch.decorator';
import { ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE } from '../../../common/elasticsearch/constants/elasticsearch.enum.constant';
import { ElasticsearchListDto } from '../../../common/elasticsearch/dtos/elasticsearch.list.dto';
import { ITemplateSearchDoc } from '../interfaces/template-search.interface';
import { TemplateSearchService } from '../services/template-search.service';
import { TemplateFormService } from '../services/template-form.service';
import { TemplateCommentService } from '../services/template-comment.service';
import { TemplateLikeService } from '../services/template-like.service';
import { TemplateTagService } from '../services/template-tag.service';
import { TemplateAccessSharedPipe } from '../pipes/template.access-shared.pipe';
import { ElasticsearchFilterInPipe } from '../../../common/elasticsearch/pipes/elasticsearch.filter-in.pipe';

@ApiTags('modules.template.user')
@Controller({
    version: '1',
    path: '/template',
})
export class TemplateUserController {
    constructor(
        @DatabaseConnection() private readonly databaseConnection: Connection,
        private readonly templateService: TemplateService,
        private readonly templateQuestionService: TemplateQuestionService,
        private readonly templateFormService: TemplateFormService,
        private readonly templateSearchService: TemplateSearchService,
        private readonly templateTagService: TemplateTagService,
        private readonly templateLikeService: TemplateLikeService,
        private readonly templateCommentService: TemplateCommentService,
        private readonly userService: UserService
    ) {}

    @ResponseElasticsearch('template.list')
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
        @User() user: UserDoc,
        @ElasticsearchQuery({
            searchFields: TEMPLATE_DEFAULT_USER_AVAILABLE_SEARCH,
            defaultOrderBy: TEMPLATE_DEFAULT_USER_ORDER_BY,
            defaultOrderDirection: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE.DESC,
            availableOrderBy: TEMPLATE_DEFAULT_USER_AVAILABLE_ORDER_BY,
        })
        { _elasticQuery, _limit, _offset, _order }: ElasticsearchListDto,
        @Query(
            'tags',
            ElasticsearchFilterInPipe('tags', { fieldPath: 'tags._id' })
        )
        tagsFilter: Record<string, any>,
        @Query('topics', ElasticsearchFilterInPipe('topics'))
        topicsFilter: Record<string, any>
    ): Promise<IResponseElasticsearch<ITemplateSearchDoc>> {
        const filters = {
            filter: [
                ...(tagsFilter._elasticQuery?.filter || []),
                ...(topicsFilter._elasticQuery?.filter || []),
            ],
            should: [
                { term: { 'owner._id': user._id } },
                { term: { 'sharedUsers._id': user._id } },
            ],
            minimumShouldMatch: 1,
        };

        const { items, total, totalPage } =
            await this.templateSearchService.search(
                filters,
                _elasticQuery,
                _limit,
                _offset,
                _order
            );

        return {
            data: items,
            _pagination: {
                total,
                totalPage,
            },
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
            TemplateAccessSharedPipe
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
            sharedUsers,
            topics,
            tags,
        }: TemplateCreateRequestDto,
        @User() user: UserDoc
    ): Promise<IResponse<DatabaseIdResponseDto>> {
        const uniqueSharedUsersIds = [...new Set(sharedUsers)];
        const uniqueTopics = [...new Set(topics)];
        const uniqueTags = [...new Set(tags)];

        const checkUsers =
            await this.userService.existsByIds(uniqueSharedUsersIds);
        const checkTags =
            await this.templateTagService.existsByIds(uniqueSharedUsersIds);

        if (!checkUsers) {
            throw new NotFoundException({
                statusCode:
                    ENUM_TEMPLATE_STATUS_CODE_ERROR.NOT_FOUND_SHARED_USERS_ERROR,
                message: 'template.error.notFoundSharedUsers',
            });
        }

        if (!checkTags) {
            throw new NotFoundException({
                statusCode:
                    ENUM_TEMPLATE_STATUS_CODE_ERROR.NOT_FOUND_SHARED_USERS_ERROR,
                message: 'template.error.notTags',
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
                    owner: user._id,
                    sharedUsers: uniqueSharedUsersIds,
                    topics: uniqueTopics,
                    tags: uniqueTags,
                },
                { session }
            );

            const createdWithRelations =
                await this.templateService.joinWithRelations(created);

            await this.templateSearchService.indexTemplate(
                createdWithRelations
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

    @Response('template.selfDeleteBulk')
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
    @Patch('/delete/bulk')
    async deleteMany(
        @Body()
        { ids }: TemplateBulkDeleteRequestDto,
        @User() user: UserDoc
    ): Promise<void> {
        const findTemplateCriteria = {
            owner: user._id,
            _id: { $in: ids },
        };

        const findRelationsDeleteCriteria = {
            template: { $in: ids },
            user: user._id,
        };

        const exist = await this.templateService.exists(findTemplateCriteria);

        if (!exist) {
            throw new NotFoundException({
                statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                message: 'template.error.notFound',
            });
        }

        const session: ClientSession =
            await this.databaseConnection.startSession();
        session.startTransaction();
        try {
            await this.templateService.selfDeleteBulk(findTemplateCriteria, {
                session,
            });

            await this.templateQuestionService.selfDeleteBulk(
                findRelationsDeleteCriteria,
                { session }
            );

            await this.templateFormService.selfDeleteBulk(
                findRelationsDeleteCriteria,
                {
                    session,
                }
            );

            await this.templateCommentService.selfDeleteBulk(
                findRelationsDeleteCriteria,
                {
                    session,
                }
            );

            await this.templateLikeService.selfDeleteBulk(
                findRelationsDeleteCriteria,
                {
                    session,
                }
            );

            await this.templateSearchService.deleteTemplates(ids);

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
