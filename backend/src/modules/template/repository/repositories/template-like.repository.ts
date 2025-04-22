import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { TemplateEntity } from 'src/modules/template/repository/entities/template.entity';
import {
    TemplateLikeDoc,
    TemplateLikeEntity,
} from 'src/modules/template/repository/entities/template-like.entity';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';

@Injectable()
export class TemplateLikeRepository extends DatabaseMongoUUIDRepositoryAbstract<
    TemplateLikeEntity,
    TemplateLikeDoc
> {
    constructor(
        @DatabaseModel(TemplateLikeEntity.name)
        private readonly templateLikeModel: Model<TemplateLikeEntity>
    ) {
        super(templateLikeModel, [
            {
                path: 'templates',
                localField: 'template',
                foreignField: '_id',
                model: TemplateEntity.name,
            },
            {
                path: 'users',
                localField: 'user',
                foreignField: '_id',
                model: UserEntity.name,
            },
        ]);
    }
}
