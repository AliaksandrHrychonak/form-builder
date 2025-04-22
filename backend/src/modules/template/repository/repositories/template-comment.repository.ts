import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { TemplateEntity } from 'src/modules/template/repository/entities/template.entity';
import {
    TemplateCommentDoc,
    TemplateCommentEntity,
} from 'src/modules/template/repository/entities/template-comment.entity';

@Injectable()
export class TemplateCommentRepository extends DatabaseMongoUUIDRepositoryAbstract<
    TemplateCommentEntity,
    TemplateCommentDoc
> {
    constructor(
        @DatabaseModel(TemplateCommentEntity.name)
        private readonly templateCommentModel: Model<TemplateCommentEntity>
    ) {
        super(templateCommentModel, [
            {
                path: 'templates',
                localField: 'template',
                foreignField: '_id',
                model: TemplateEntity.name,
            },
        ]);
    }
}
