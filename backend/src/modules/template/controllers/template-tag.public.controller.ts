import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Connection } from 'mongoose';
import { DatabaseConnection } from 'src/common/database/decorators/database.decorator';
import { ResponsePaging } from '../../../common/response/decorators/response.decorator';
import { ApiKeyPublicProtected } from '../../../common/api-key/decorators/api-key.decorator';
import { IResponsePaging } from '../../../common/response/interfaces/response.interface';
import {
    PaginationQuery,
    PaginationQueryFilterNinIds,
} from '../../../common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from '../../../common/pagination/dtos/pagination.list.dto';
import {
    TEMPLATE_TAG_PUBLIC_DEFAULT_AVAILABLE_ORDER_BY,
    TEMPLATE_TAG_PUBLIC_DEFAULT_AVAILABLE_SEARCH,
    TEMPLATE_TAG_PUBLIC_DEFAULT_ORDER_BY,
} from '../constants/template-tag.list.constant';
import { TemplateTagService } from '../services/template-tag.service';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
import { ITemplateTagDoc } from '../interfaces/template-tag.interface';
import { TemplateTagListResponseDto } from '../dtos/response/template-tag.list.response.dto';

@ApiTags('modules.public.template')
@Controller({
    version: '1',
    path: '/template',
})
export class TemplateTagPublicController {
    constructor(
        @DatabaseConnection() private readonly databaseConnection: Connection,
        private readonly templateTagService: TemplateTagService,
        private readonly paginationService: PaginationService
    ) {}

    @ResponsePaging('template.tag.list')
    @ApiKeyPublicProtected()
    @Get('/tag/list')
    async list(
        @PaginationQuery({
            defaultOrderBy: TEMPLATE_TAG_PUBLIC_DEFAULT_ORDER_BY,
            availableOrderBy: TEMPLATE_TAG_PUBLIC_DEFAULT_AVAILABLE_ORDER_BY,
            availableSearch: TEMPLATE_TAG_PUBLIC_DEFAULT_AVAILABLE_SEARCH,
        })
        { _search, _limit, _offset, _order }: PaginationListDto,
        @PaginationQueryFilterNinIds('_id', {
            queryField: 'excludeIds',
        })
        excludeIds: Record<string, any>
    ): Promise<IResponsePaging<TemplateTagListResponseDto>> {
        const find: Record<string, any> = {
            ..._search,
            ...excludeIds,
        };

        const tags: ITemplateTagDoc[] = await this.templateTagService.findAll(
            find,
            {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
            }
        );
        const total: number = await this.templateTagService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        const mapped = await this.templateTagService.mapList(tags);

        return {
            _pagination: { total, totalPage },
            data: mapped,
        };
    }
}
