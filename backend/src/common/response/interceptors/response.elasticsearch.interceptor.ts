import { Reflector } from '@nestjs/core';
import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import qs from 'qs';
import { Response } from 'express';
import { MessageService } from '../../message/services/message.service';
import { ConfigService } from '@nestjs/config';
import { HelperDateService } from '../../helper/services/helper.date.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseElasticsearch } from '../interfaces/response.interface';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { IRequestApp } from '../../request/interfaces/request.interface';
import {
    RESPONSE_MESSAGE_PATH_META_KEY,
    RESPONSE_MESSAGE_PROPERTIES_META_KEY,
} from '../constants/response.constant';
import { IMessageOptionsProperties } from '../../message/interfaces/message.interface';
import { ResponseElasticsearchMetadataDto } from '../dtos/response.elasticsearch.dto';

@Injectable()
export class ResponseElasticsearchInterceptor
    implements NestInterceptor<Promise<any>>
{
    constructor(
        private readonly reflector: Reflector,
        private readonly messageService: MessageService,
        private readonly configService: ConfigService,
        private readonly helperDateService: HelperDateService
    ) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<Promise<any>> {
        if (context.getType() === 'http') {
            return next.handle().pipe(
                map(async (res: Promise<IResponseElasticsearch<any>>) => {
                    const ctx: HttpArgumentsHost = context.switchToHttp();
                    const response: Response = ctx.getResponse();
                    const request: IRequestApp = ctx.getRequest<IRequestApp>();

                    let messagePath: string = this.reflector.get<string>(
                        RESPONSE_MESSAGE_PATH_META_KEY,
                        context.getHandler()
                    );
                    let messageProperties: IMessageOptionsProperties =
                        this.reflector.get<IMessageOptionsProperties>(
                            RESPONSE_MESSAGE_PROPERTIES_META_KEY,
                            context.getHandler()
                        );

                    let httpStatus: HttpStatus = response.statusCode;
                    let statusCode: number = response.statusCode;
                    let data: Record<string, any>[] = [];

                    const xPath = request.path;
                    const xElasticsearch = request.__elasticsearch;
                    const xLanguage: string =
                        request.__language ?? this.messageService.getLanguage();
                    const xTimestamp = this.helperDateService.createTimestamp();
                    const xTimezone =
                        Intl.DateTimeFormat().resolvedOptions().timeZone;
                    const xVersion =
                        request.__version ??
                        this.configService.get<string>(
                            'app.urlVersion.version'
                        );
                    const xRepoVersion =
                        this.configService.get<string>('app.version');

                    let metadata: ResponseElasticsearchMetadataDto = {
                        language: xLanguage,
                        timestamp: xTimestamp,
                        timezone: xTimezone,
                        path: xPath,
                        version: xVersion,
                        repoVersion: xRepoVersion,
                    };

                    const responseData = await res;
                    if (
                        !responseData?.data ||
                        !Array.isArray(responseData.data)
                    ) {
                        throw new Error('Field data must be an array');
                    }

                    const { _metadata } = responseData;

                    data = responseData.data;
                    httpStatus =
                        _metadata?.customProperty?.httpStatus ?? httpStatus;
                    statusCode =
                        _metadata?.customProperty?.statusCode ?? statusCode;
                    messagePath =
                        _metadata?.customProperty?.message ?? messagePath;
                    messageProperties =
                        _metadata?.customProperty?.messageProperties ??
                        messageProperties;

                    delete _metadata?.customProperty;

                    const { query } = request;
                    delete query.perPage;
                    delete query.page;

                    const total: number = responseData._pagination.total;
                    const totalPage: number =
                        responseData._pagination.totalPage;
                    const perPage: number = xElasticsearch.pagination.perPage;
                    const page: number = xElasticsearch.pagination.page;

                    const queryString = qs.stringify(query, { encode: false });

                    metadata = {
                        ...metadata,
                        ..._metadata,
                        elasticsearch: {
                            pagination: {
                                page,
                                perPage,
                                total,
                                totalPage: data.length > 0 ? totalPage : 0,
                            },
                            search: {
                                query: xElasticsearch.search?.query,
                                availableFields:
                                    xElasticsearch.search?.availableFields,
                            },
                            sort: {
                                orderBy: xElasticsearch.sort?.orderBy,
                                orderDirection:
                                    xElasticsearch.sort?.orderDirection,
                                availableOrderBy:
                                    xElasticsearch.sort?.availableOrderBy,
                            },
                        },
                    };

                    if (data.length > 0) {
                        metadata.cursor = {
                            nextPage:
                                page < totalPage
                                    ? `${xPath}?perPage=${perPage}&page=${page + 1}${queryString ? `&${queryString}` : ''}`
                                    : undefined,
                            previousPage:
                                page > 1
                                    ? `${xPath}?perPage=${perPage}&page=${page - 1}${queryString ? `&${queryString}` : ''}`
                                    : undefined,
                            firstPage:
                                totalPage > 1
                                    ? `${xPath}?perPage=${perPage}&page=1${queryString ? `&${queryString}` : ''}`
                                    : undefined,
                            lastPage:
                                totalPage > 1
                                    ? `${xPath}?perPage=${perPage}&page=${totalPage}${queryString ? `&${queryString}` : ''}`
                                    : undefined,
                        };
                    }

                    const message: string = this.messageService.setMessage(
                        messagePath,
                        {
                            customLanguage: xLanguage,
                            properties: messageProperties,
                        }
                    );

                    response.setHeader('x-custom-lang', xLanguage);
                    response.setHeader('x-timestamp', xTimestamp);
                    response.setHeader('x-timezone', xTimezone);
                    response.setHeader('x-version', xVersion);
                    response.setHeader('x-repo-version', xRepoVersion);
                    response.status(httpStatus);

                    return {
                        statusCode,
                        message,
                        _metadata: metadata,
                        data,
                    };
                })
            );
        }

        return next.handle();
    }
}
