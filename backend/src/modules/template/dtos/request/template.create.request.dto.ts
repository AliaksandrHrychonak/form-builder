import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsUUID,
    IsOptional,
    IsArray,
} from 'class-validator';
import { ENUM_TEMPLATE_TOPIC } from '../../constants/template.enum.constant';

export class TemplateCreateRequestDto {
    @ApiProperty({
        example: faker.lorem.text(),
        required: true,
        maxLength: 150,
        minLength: 1,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(150)
    @Type(() => String)
    title: string;

    @ApiProperty({
        example: faker.lorem.paragraph(),
        required: true,
        maxLength: 350,
        minLength: 1,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(350)
    @Type(() => String)
    description: string;

    @ApiProperty({
        example: [ENUM_TEMPLATE_TOPIC.APPLICATION, ENUM_TEMPLATE_TOPIC.QUIZ],
        required: false,
    })
    @IsArray()
    @IsOptional()
    @IsNotEmpty({ each: true })
    @Type(() => String)
    topic?: string[];

    @ApiProperty({
        example: true,
        required: false,
    })
    @IsNotEmpty()
    @Type(() => Boolean)
    isPublic: boolean;

    @ApiProperty({
        example: [faker.string.uuid()],
        required: true,
    })
    @IsNotEmpty()
    @IsUUID('4', { each: true })
    sharedUsers: string[];

    @ApiProperty({
        example: faker.string.uuid(),
        required: true,
    })
    @IsNotEmpty()
    @IsUUID()
    owner: string;
}
