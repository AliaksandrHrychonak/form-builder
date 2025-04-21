import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    TemplateTagDoc,
    TemplateTagEntity,
} from 'src/modules/template/repository/entities/template-tag.entity';

@Injectable()
export class TemplateTagRepository extends DatabaseMongoUUIDRepositoryAbstract<
    TemplateTagEntity,
    TemplateTagDoc
> {
    constructor(
        @DatabaseModel(TemplateTagEntity.name)
        private readonly templateTagModel: Model<TemplateTagEntity>
    ) {
        super(templateTagModel);
    }
}
