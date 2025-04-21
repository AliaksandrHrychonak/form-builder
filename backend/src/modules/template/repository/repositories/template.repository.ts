import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    TemplateDoc,
    TemplateEntity,
} from 'src/modules/template/repository/entities/template.entity';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { TemplateQuestionEntity } from 'src/modules/template/repository/entities/template-question.entity';
import { TemplateFormEntity } from 'src/modules/template/repository/entities/template-form.entity';
import { TemplateCommentEntity } from 'src/modules/template/repository/entities/template-comment.entity';
import { TemplateLikeEntity } from 'src/modules/template/repository/entities/template-like.entity';
import { TemplateTagEntity } from 'src/modules/template/repository/entities/template-tag.entity';

@Injectable()
export class TemplateRepository extends DatabaseMongoUUIDRepositoryAbstract<
    TemplateEntity,
    TemplateDoc
> {
    constructor(
        @DatabaseModel(TemplateEntity.name)
        private readonly templateModel: Model<TemplateEntity>
    ) {
        super(templateModel, [
            {
                path: 'owner',
                localField: 'owner',
                foreignField: '_id',
                model: UserEntity.name,
            },
            {
                path: 'sharedUsers',
                localField: 'sharedUsers',
                foreignField: '_id',
                model: UserEntity.name,
            },
            {
                path: 'questions',
                localField: 'questions',
                foreignField: '_id',
                model: TemplateQuestionEntity.name,
            },
            {
                path: 'forms',
                localField: 'forms',
                foreignField: '_id',
                model: TemplateFormEntity.name,
            },
            {
                path: 'comments',
                localField: 'comments',
                foreignField: '_id',
                model: TemplateCommentEntity.name,
            },
            {
                path: 'likes',
                localField: 'likes',
                foreignField: '_id',
                model: TemplateLikeEntity.name,
            },
            {
                path: 'tags',
                localField: 'tags',
                foreignField: '_id',
                model: TemplateTagEntity.name,
            },
        ]);
    }
}
