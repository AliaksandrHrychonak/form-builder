import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';
import { ENUM_TEMPLATE_QUESTION_TYPE } from '../../constants/template-question.enum.constant';

class ValidationObject {
    @ApiProperty({
        example: faker.number.int({ min: 0, max: 10 }),
        required: false,
    })
    @IsOptional()
    @IsInt()
    min?: number;

    @ApiProperty({
        example: faker.number.int({ min: 11, max: 100 }),
        required: false,
    })
    @IsOptional()
    @IsInt()
    max?: number;

    @ApiProperty({
        example: '/\d{3}-\d{2}-\d{4}/',
        required: false,
    })
    @IsOptional()
    @IsString()
    regex?: string;

    [key: string]: any;
}

export class TemplateQuestionCreateRequestDto {
    @ApiProperty({
        example: faker.string.uuid(),
        required: true,
    })
    @IsNotEmpty()
    @IsUUID()
    template: string;

    @ApiProperty({
        example: faker.lorem.text(),
        required: true,
        maxLength: 150,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title: string;

    @ApiProperty({
        example: faker.lorem.paragraph(),
        required: false,
        maxLength: 350,
    })
    @IsString()
    @IsOptional()
    @MaxLength(350)
    description?: string;

    @ApiProperty({
        example: faker.helpers.arrayElement(['NUMBER']),
        required: true,
        enum: ENUM_TEMPLATE_QUESTION_TYPE,
    })
    @IsString()
    @IsEnum(ENUM_TEMPLATE_QUESTION_TYPE)
    @IsNotEmpty()
    type: string;

    @ApiProperty({
        example: faker.datatype.boolean(),
        required: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    required: boolean;

    @ApiProperty({
        example: [faker.lorem.word(), faker.lorem.word()],
        required: false,
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    options?: string[];

    @ApiProperty({
        required: false,
        type: ValidationObject,
    })
    @IsOptional()
    @ValidateNested()
    validation?: ValidationObject;

    @ApiProperty({
        example: faker.number.int({ min: 0, max: 10 }),
        required: true,
    })
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    order: number;
}
