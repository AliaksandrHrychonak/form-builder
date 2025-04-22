import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { ENUM_TEMPLATE_QUESTION_TYPE } from 'src/modules/template/constants/template-question.enum.constant';
import { TemplateEntity } from './template.entity';

export const TemplateQuestionDatabaseName = 'templatequestions';

@DatabaseEntity({ collection: TemplateQuestionDatabaseName })
export class TemplateQuestionEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        ref: 'templates',
        index: true,
    })
    template: string;

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

TemplateQuestionSchema.index({ templateId: 1, order: 1 });

export type TemplateQuestionDoc = TemplateQuestionEntity & Document;
