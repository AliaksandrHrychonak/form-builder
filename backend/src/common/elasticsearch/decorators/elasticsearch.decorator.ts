import { Query } from '@nestjs/common';

import { IElasticsearchQueryOptions } from '../interfaces/elasticsearch.interface';
import { ElasticsearchSearchPipe } from '../pipes/elasticsearch.search.pipe';
import { ElasticsearchPagingPipe } from '../pipes/elasticsearch.paging.pipe';
import { ElasticsearchOrderPipe } from '../pipes/elasticsearch.order.pipe';

export function ElasticsearchQuery(
    options?: IElasticsearchQueryOptions
): ParameterDecorator {
    return Query(
        ElasticsearchSearchPipe(options?.searchFields),
        ElasticsearchPagingPipe(options?.defaultPerPage),
        ElasticsearchOrderPipe(
            options?.defaultOrderBy,
            options?.defaultOrderDirection,
            options?.availableOrderBy
        )
    );
}
