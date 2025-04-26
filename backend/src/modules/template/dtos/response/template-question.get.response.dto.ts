import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { DatabaseIdResponseDto } from 'src/common/database/dtos/response/database.id.response.dto';
import { ENUM_TEMPLATE_QUESTION_TYPE } from '../../constants/template-question.enum.constant';

export class ValidationResponseOptionsDto {
    @ApiProperty({
        required: false,
    })
    min?: number;

    @ApiProperty({
        required: false,
    })
    max?: number;

    @ApiProperty({
        required: false,
    })
    regex?: string;

    [key: string]: any;
}

export class TemplateQuestionGetResponseDto extends DatabaseIdResponseDto {
    @ApiProperty({
        required: true,
        nullable: false,
        maxLength: 150,
        minLength: 1,
    })
    readonly title: string;

    @ApiProperty({
        required: false,
        nullable: false,
        maxLength: 350,
        minLength: 1,
    })
    readonly description?: string;

    @ApiProperty({
        required: false,
        nullable: false,
        example: ENUM_TEMPLATE_QUESTION_TYPE.TEXT,
    })
    readonly type: ENUM_TEMPLATE_QUESTION_TYPE;

    @ApiProperty({
        required: true,
        nullable: false,
        example: false,
    })
    readonly required: boolean;

    @ApiProperty({
        required: false,
    })
    options?: string[];

    @ApiProperty({
        required: false,
    })
    validation?: ValidationResponseOptionsDto;

    @ApiProperty({
        required: true,
        nullable: false,
        example: 2,
    })
    order: number;

    @ApiHideProperty()
    @Exclude()
    readonly template: string;

    @ApiHideProperty()
    @Exclude()
    readonly deletedAt?: Date;
}
