import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { TemplateEntity } from 'src/modules/template/repository/entities/template.entity';
import {
    TemplateQuestionDoc,
    TemplateQuestionEntity,
} from 'src/modules/template/repository/entities/template-question.entity';

@Injectable()
export class TemplateQuestionRepository extends DatabaseMongoUUIDRepositoryAbstract<
    TemplateQuestionEntity,
    TemplateQuestionDoc
> {
    constructor(
        @DatabaseModel(TemplateQuestionEntity.name)
        private readonly templateQuestionModel: Model<TemplateQuestionEntity>
    ) {
        super(templateQuestionModel, [
            {
                path: 'templates',
                localField: 'template',
                foreignField: '_id',
                model: TemplateEntity.name,
            },
        ]);
    }
}
