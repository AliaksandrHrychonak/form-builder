import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    TemplateEntity,
    TemplateSchema,
} from 'src/modules/template/repository/entities/template.entity';
import { TemplateRepository } from 'src/modules/template/repository/repositories/template.repository';
import { TemplateCommentRepository } from 'src/modules/template/repository/repositories/template-comment.repository';
import { TemplateFormRepository } from 'src/modules/template/repository/repositories/template-form.repository';
import { TemplateLikeRepository } from 'src/modules/template/repository/repositories/template-like.repository';
import { TemplateQuestionRepository } from 'src/modules/template/repository/repositories/template-question.repository';
import { TemplateTagRepository } from 'src/modules/template/repository/repositories/template-tag.repository';
import {
    TemplateCommentEntity,
    TemplateCommentSchema,
} from 'src/modules/template/repository/entities/template-comment.entity';
import {
    TemplateFormEntity,
    TemplateFormSchema,
} from 'src/modules/template/repository/entities/template-form.entity';
import {
    TemplateLikeEntity,
    TemplateLikeSchema,
} from 'src/modules/template/repository/entities/template-like.entity';
import {
    TemplateQuestionEntity,
    TemplateQuestionSchema,
} from 'src/modules/template/repository/entities/template-question.entity';
import {
    TemplateTagEntity,
    TemplateTagSchema,
} from 'src/modules/template/repository/entities/template-tag.entity';

@Module({
    providers: [
        TemplateRepository,
        TemplateCommentRepository,
        TemplateFormRepository,
        TemplateLikeRepository,
        TemplateQuestionRepository,
        TemplateTagRepository,
    ],
    exports: [
        TemplateRepository,
        TemplateCommentRepository,
        TemplateFormRepository,
        TemplateLikeRepository,
        TemplateQuestionRepository,
        TemplateTagRepository,
    ],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: TemplateEntity.name,
                    schema: TemplateSchema,
                },
                {
                    name: TemplateCommentEntity.name,
                    schema: TemplateCommentSchema,
                },
                {
                    name: TemplateFormEntity.name,
                    schema: TemplateFormSchema,
                },
                {
                    name: TemplateLikeEntity.name,
                    schema: TemplateLikeSchema,
                },
                {
                    name: TemplateQuestionEntity.name,
                    schema: TemplateQuestionSchema,
                },
                {
                    name: TemplateTagEntity.name,
                    schema: TemplateTagSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class TemplateRepositoryModule {}
