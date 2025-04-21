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
} from 'class-validator';

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
        example: faker.word.noun(),
        required: false,
    })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    topic?: string;

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
    tags: string[];

    @ApiProperty({
        example: [faker.string.uuid()],
        required: true,
    })
    @IsNotEmpty()
    @IsUUID('4', { each: true })
    questions: string[];

    @ApiProperty({
        example: [faker.string.uuid()],
        required: true,
    })
    @IsNotEmpty()
    @IsUUID('4', { each: true })
    forms: string[];

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
