import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import configs from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseOptionsService } from '@common/database/services/database.options.service';
import * as Joi from 'joi';
import { ENUM_APP_ENVIRONMENT } from '@app/app/constants/app.enum.constant';
import { APP_LANGUAGE } from '@app/app/constants/app.constant';
import { HelperModule } from '@common/helper/helper.module';
import { ENUM_MESSAGE_LANGUAGE } from '@common/message/constants/message.enum.constant';

@Module({
    controllers: [],
    imports: [
        ConfigModule.forRoot({
            load: configs,
            isGlobal: true,
            cache: true,
            envFilePath: ['.env'],
            expandVariables: true,
            validationSchema: Joi.object({
                APP_NAME: Joi.string().required(),
                APP_ENV: Joi.string()
                    .valid(...Object.values(ENUM_APP_ENVIRONMENT))
                    .default('development')
                    .required(),
                APP_LANGUAGE: Joi.string()
                    .valid(...Object.values(ENUM_MESSAGE_LANGUAGE))
                    .default(APP_LANGUAGE)
                    .required(),

                HTTP_ENABLE: Joi.boolean().default(true).required(),
                HTTP_HOST: [Joi.string().ip({ version: 'ipv4' }).required(), Joi.valid('localhost').required()],
                HTTP_PORT: Joi.number().default(3000).required(),
                HTTP_VERSIONING_ENABLE: Joi.boolean().default(true).required(),
                HTTP_VERSION: Joi.number().required(),

                DATABASE_HOST: Joi.string().default('localhost').required(),
                DATABASE_PORT: Joi.string().default('5432').required(),
                DATABASE_NAME: Joi.string().default('forms_builder_db').required(),
                DATABASE_USER: Joi.string().allow(null, '').optional(),
                DATABASE_PASSWORD: Joi.string().allow(null, '').optional(),
                DATABASE_DEBUG: Joi.boolean().default(false).required(),
                DATABASE_OPTIONS: Joi.string().allow(null, '').optional(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: DatabaseOptionsService,
            inject: [ConfigService],
        }),
        HelperModule,
    ],
})
export class CommonModule {}
