import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Connection } from 'mongoose';
import { DatabaseConnection } from 'src/common/database/decorators/database.decorator';
import {
    Response,
    ResponseElasticsearch,
} from '../../../common/response/decorators/response.decorator';
import { ApiKeyPublicProtected } from '../../../common/api-key/decorators/api-key.decorator';
import { RequestRequiredPipe } from '../../../common/request/pipes/request.required.pipe';
import {
    IResponse,
    IResponseElasticsearch,
} from '../../../common/response/interfaces/response.interface';
import { TemplateDoc } from '../repository/entities/template.entity';
import { TemplateService } from '../services/template.service';
import { TemplateGetResponseDto } from '../dtos/response/template.get.response.dto';
import { ITemplateDoc } from '../interfaces/template.interface';
import { TemplateParsePipe } from '../pipes/template.parse.pipe';
import { TemplateAccessPublicPipe } from '../pipes/template.access-public.pipe';
import { TemplateSearchService } from '../services/template-search.service';
import { ElasticsearchListDto } from '../../../common/elasticsearch/dtos/elasticsearch.list.dto';
import { ElasticsearchQuery } from '../../../common/elasticsearch/decorators/elasticsearch.decorator';
import { ITemplateSearchDoc } from '../interfaces/template-search.interface';
import { ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE } from '../../../common/elasticsearch/constants/elasticsearch.enum.constant';
import {
    TEMPLATE_DEFAULT_PUBLIC_AVAILABLE_ORDER_BY,
    TEMPLATE_DEFAULT_PUBLIC_AVAILABLE_SEARCH,
    TEMPLATE_DEFAULT_PUBLIC_ORDER_BY,
} from '../constants/template.list.constant';

@ApiTags('modules.public.template')
@Controller({
    version: '1',
    path: '/template',
})
export class TemplatePublicController {
    constructor(
        @DatabaseConnection() private readonly databaseConnection: Connection,
        private readonly templateService: TemplateService,
        private readonly templateSearchService: TemplateSearchService
    ) {}

    @ResponseElasticsearch('template.list')
    @ApiKeyPublicProtected()
    @Get('/list')
    async list(
        @ElasticsearchQuery({
            searchFields: TEMPLATE_DEFAULT_PUBLIC_AVAILABLE_SEARCH,
            defaultOrderBy: TEMPLATE_DEFAULT_PUBLIC_ORDER_BY,
            defaultOrderDirection: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE.DESC,
            availableOrderBy: TEMPLATE_DEFAULT_PUBLIC_AVAILABLE_ORDER_BY,
        })
        { _elasticQuery, _limit, _offset, _order }: ElasticsearchListDto
    ): Promise<IResponseElasticsearch<ITemplateSearchDoc>> {
        const filters = {
            filter: [{ term: { isPublic: true } }],
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
    @ApiKeyPublicProtected()
    @Get('/get/:templateId')
    async get(
        @Param(
            'templateId',
            RequestRequiredPipe,
            TemplateParsePipe,
            TemplateAccessPublicPipe
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
