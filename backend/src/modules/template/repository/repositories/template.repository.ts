import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    TemplateDoc,
    TemplateEntity,
} from 'src/modules/template/repository/entities/template.entity';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
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
                path: 'tags',
                localField: 'tags',
                foreignField: '_id',
                model: TemplateTagEntity.name,
            },
        ]);
    }
}
