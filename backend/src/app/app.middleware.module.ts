import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import {
    ThrottlerGuard,
    ThrottlerModule,
    ThrottlerModuleOptions,
} from '@nestjs/throttler';
import { AppGeneralFilter } from 'src/app/filters/app.general.filter';
import { AppHttpFilter } from 'src/app/filters/app.http.filter';
import { AppValidationImportFilter } from 'src/app/filters/app.validation-import.filter';
import { AppValidationFilter } from 'src/app/filters/app.validation.filter';
import {
    JsonBodyParserMiddleware,
    RawBodyParserMiddleware,
    TextBodyParserMiddleware,
    UrlencodedBodyParserMiddleware,
} from 'src/app/middlewares/body-parser.middleware';
import { CorsMiddleware } from 'src/app/middlewares/cors.middleware';
import { MessageCustomLanguageMiddleware } from 'src/app/middlewares/custom-language.middleware';
import { HelmetMiddleware } from 'src/app/middlewares/helmet.middleware';
import { ResponseTimeMiddleware } from 'src/app/middlewares/response-time.middleware';
import { UrlVersionMiddleware } from 'src/app/middlewares/url-version.middleware';
import { SentryModule } from '@sentry/nestjs/setup';

@Module({
    controllers: [],
    exports: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_FILTER,
            useClass: AppGeneralFilter,
        },
        {
            provide: APP_FILTER,
            useClass: AppValidationFilter,
        },
        {
            provide: APP_FILTER,
            useClass: AppValidationImportFilter,
        },
        {
            provide: APP_FILTER,
            useClass: AppHttpFilter,
        },
    ],
    imports: [
        SentryModule.forRoot(),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService): ThrottlerModuleOptions => ({
                throttlers: [
                    {
                        ttl: config.get('middleware.throttle.ttl'),
                        limit: config.get('middleware.throttle.limit'),
                    },
                ],
            }),
        }),
    ],
})
export class AppMiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(
                CorsMiddleware,
                HelmetMiddleware,
                JsonBodyParserMiddleware,
                TextBodyParserMiddleware,
                RawBodyParserMiddleware,
                UrlencodedBodyParserMiddleware,
                UrlVersionMiddleware,
                ResponseTimeMiddleware,
                MessageCustomLanguageMiddleware
            )
            .forRoutes('*');
    }
}
