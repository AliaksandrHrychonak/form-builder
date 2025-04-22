import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { TemplateEntity } from './template.entity';

export const TemplateLikeDatabaseName = 'templatelikes';

@DatabaseEntity({ collection: TemplateLikeDatabaseName })
export class TemplateLikeEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        ref: 'templates',
        index: true,
    })
    template: string;

    @Prop({
        required: true,
        ref: UserEntity.name,
        index: true,
    })
    user: string;
}

export const TemplateLikeSchema =
    SchemaFactory.createForClass(TemplateLikeEntity);

export type TemplateLikeDoc = TemplateLikeEntity & Document;
