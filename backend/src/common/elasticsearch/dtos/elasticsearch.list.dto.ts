import { ApiHideProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE } from '../constants/elasticsearch.enum.constant';

export class ElasticsearchListDto {
    @ApiHideProperty()
    _elasticQuery?: {
        must?: any[];
        filter?: any[];
        should?: any[];
        minimumShouldMatch?: number;
    };

    @ApiHideProperty()
    @IsOptional()
    _limit?: number;

    @ApiHideProperty()
    @IsOptional()
    _offset?: number;

    @ApiHideProperty()
    @IsOptional()
    _order?: {
        field: string;
        direction: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE;
    };

    @IsOptional()
    search?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    perPage?: number;

    @IsOptional()
    @IsString()
    orderBy?: string;

    @IsOptional()
    @IsEnum(ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE)
    orderDirection?: ENUM_ELASTICSEARCH_ORDER_DIRECTION_TYPE;
}
