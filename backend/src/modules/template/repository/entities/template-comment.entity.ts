import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { TemplateEntity } from './template.entity';

export const TemplateCommentDatabaseName = 'templatecomments';

@DatabaseEntity({ collection: TemplateCommentDatabaseName })
export class TemplateCommentEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 1000,
    })
    text: string;

    @Prop({
        required: true,
        ref: TemplateEntity.name,
        index: true,
    })
    template: string;

    @Prop({
        required: true,
        ref: UserEntity.name,
        index: true,
    })
    user: string;

    @Prop({
        required: false,
    })
    selfDeletion?: boolean;
}

export const TemplateCommentSchema = SchemaFactory.createForClass(
    TemplateCommentEntity
);

export type TemplateCommentDoc = TemplateCommentEntity & Document;
