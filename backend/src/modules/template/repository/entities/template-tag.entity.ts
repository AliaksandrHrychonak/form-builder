import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { IsHexColor } from 'class-validator';

export const TemplateTagDatabaseName = 'templatetags';

@DatabaseEntity({ collection: TemplateTagDatabaseName })
export class TemplateTagEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 50,
    })
    name: string;

    @Prop({
        required: false,
        index: true,
        trim: true,
        type: String,
        maxlength: 150,
    })
    description?: string;

    @IsHexColor()
    @Prop({ default: '#000000' })
    color?: string;

    @Prop({
        required: false,
    })
    selfDeletion?: boolean;
}

export const TemplateTagSchema =
    SchemaFactory.createForClass(TemplateTagEntity);

export type TemplateTagDoc = TemplateTagEntity & Document;
