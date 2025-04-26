import { faker } from '@faker-js/faker';
import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';
import { ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE } from '../../elasticsearch/constants/elasticsearch.enum.constant';
import {
    ResponseDto,
    ResponseMetadataDto,
} from 'src/common/response/dtos/response.dto';

export class ResponseElasticsearchMetadataCursorDto {
    @ApiProperty({
        required: true,
        nullable: true,
    })
    nextPage?: string;

    @ApiProperty({
        required: true,
        nullable: true,
    })
    previousPage?: string;

    @ApiProperty({
        required: true,
        nullable: true,
    })
    firstPage?: string;

    @ApiProperty({
        required: true,
        nullable: true,
    })
    lastPage?: string;
}

export class ResponseElasticsearchMetadataBaseDto {
    @ApiProperty({
        required: true,
        nullable: false,
        example: {
            page: 1,
            perPage: 10,
            total: 100,
            totalPage: 10,
        },
    })
    pagination: {
        page: number;
        perPage: number;
        total?: number;
        totalPage?: number;
    };

    @ApiProperty({
        required: true,
        nullable: true,
        example: {
            orderBy: 'createdAt',
            orderDirection: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE.ASC,
            availableOrderBy: ['name', 'createdAt'],
        },
    })
    sort?: {
        orderBy?: string;
        orderDirection?: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE;
        availableOrderBy?: string[];
    };

    @ApiProperty({
        required: true,
        nullable: true,
        example: {
            query: 'search text',
            availableFields: ['name', 'description'],
        },
    })
    search?: {
        query?: string;
        availableFields?: string[];
    };
}

export class ResponseElasticsearchMetadataDto extends ResponseMetadataDto {
    @ApiProperty({
        required: false,
        type: () => ResponseElasticsearchMetadataCursorDto,
    })
    cursor?: ResponseElasticsearchMetadataCursorDto;

    @ApiProperty({
        required: false,
        type: () => ResponseElasticsearchMetadataBaseDto,
    })
    elasticsearch?: ResponseElasticsearchMetadataBaseDto;
}

export class ResponseElasticsearchDto extends PickType(ResponseDto, [
    'statusCode',
    'message',
] as const) {
    @ApiProperty({
        name: '_metadata',
        required: true,
        nullable: false,
        description: 'Contain metadata about API',
        type: () => ResponseElasticsearchMetadataDto,
        example: {
            language: 'en',
            timestamp: 1660190937231,
            timezone: 'Europe/Minsk',
            path: '/api/v1/test/hello',
            version: '1',
            repoVersion: '1.0.0',
            elasticsearch: {
                pagination: {
                    page: 1,
                    perPage: 20,
                    total: 100,
                    totalPage: 5,
                },
                sort: {
                    orderBy: 'createdAt',
                    orderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC,
                    availableOrderBy: ['name', 'createdAt'],
                },
                search: {
                    query: faker.person.fullName(),
                    availableFields: ['name', 'description'],
                },
            },
            cursor: {
                nextPage: `http://217.0.0.1/__path?perPage=10&page=3&search=abc`,
                previousPage: `http://217.0.0.1/__path?perPage=10&page=1&search=abc`,
                firstPage: `http://217.0.0.1/__path?perPage=10&page=1&search=abc`,
                lastPage: `http://217.0.0.1/__path?perPage=10&page=20&search=abc`,
            },
        },
    })
    readonly _metadata: ResponseElasticsearchMetadataDto;

    @ApiHideProperty()
    data?: Record<string, any>[];
}
