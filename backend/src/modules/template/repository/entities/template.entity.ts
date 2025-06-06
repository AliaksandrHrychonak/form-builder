import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { TemplateTagEntity } from 'src/modules/template/repository/entities/template-tag.entity';
import { ENUM_TEMPLATE_TOPIC } from 'src/modules/template/constants/template.enum.constant';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { AwsS3Dto } from 'src/common/aws/dtos/aws.s3.dto';

export const TemplateDatabaseName = 'templates';

@DatabaseEntity({ collection: TemplateDatabaseName })
export class TemplateEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 150,
    })
    title: string;

    @Prop({
        required: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 350,
    })
    description: string;

    @Prop({
        required: false,
        type: [String],
        enum: Object.values(ENUM_TEMPLATE_TOPIC),
        index: true,
    })
    topics?: string[];

    @Prop({
        required: true,
        default: false,
        index: true,
        type: Boolean,
    })
    isPublic: boolean;

    @Prop({
        required: false,
        _id: false,
        type: {
            path: String,
            pathWithFilename: String,
            filename: String,
            completedUrl: String,
            baseUrl: String,
            mime: String,
            size: Number,
            duration: {
                required: false,
                type: Number,
            },
        },
    })
    image?: AwsS3Dto;

    @Prop({
        required: true,
        ref: TemplateTagEntity.name,
        index: true,
    })
    tags: string[];

    @Prop({
        required: true,
        ref: UserEntity.name,
        index: true,
    })
    sharedUsers: string[];

    @Prop({
        required: true,
        ref: UserEntity.name,
        index: true,
    })
    owner: string;

    @Prop({
        required: false,
    })
    selfDeletion?: boolean;
}

export const TemplateSchema = SchemaFactory.createForClass(TemplateEntity);

export type TemplateDoc = TemplateEntity & Document;
