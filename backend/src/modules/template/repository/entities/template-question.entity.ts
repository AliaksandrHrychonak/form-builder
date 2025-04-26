import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { TemplateEntity } from './template.entity';
import { UserEntity } from '../../../user/repository/entities/user.entity';

export const TemplateQuestionDatabaseName = 'templatequestions';

@DatabaseEntity({ collection: TemplateQuestionDatabaseName })
export class TemplateQuestionEntity extends DatabaseMongoUUIDEntityAbstract {
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
        required: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 150,
    })
    title: string;

    @Prop({
        required: false,
        index: true,
        trim: true,
        type: String,
        maxlength: 350,
    })
    description?: string;

    @Prop({
        required: true,
        trim: true,
        type: String,
    })
    type: string;

    @Prop({ required: true, default: false })
    required: boolean;

    @Prop({ type: [String] })
    options?: string[];

    @Prop({ type: Object })
    validation?: {
        min?: number;
        max?: number;
        regex?: string;
        [key: string]: any;
    };

    @Prop({ required: true })
    order: number;

    @Prop({
        required: false,
    })
    selfDeletion?: boolean;
}

export const TemplateQuestionSchema = SchemaFactory.createForClass(
    TemplateQuestionEntity
);

export type TemplateQuestionDoc = TemplateQuestionEntity & Document;
