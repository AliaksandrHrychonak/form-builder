import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';

export const TemplateFormDatabaseName = 'templateforms';

@DatabaseEntity({ collection: TemplateFormDatabaseName })
export class TemplateFormEntity extends DatabaseMongoUUIDEntityAbstract {
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

    @Prop({ type: Object, required: true })
    answers: Record<string, any>;

    @Prop({
        required: false,
    })
    selfDeletion?: boolean;
}

export const TemplateFormSchema =
    SchemaFactory.createForClass(TemplateFormEntity);

export type TemplateFormDoc = TemplateFormEntity & Document;
