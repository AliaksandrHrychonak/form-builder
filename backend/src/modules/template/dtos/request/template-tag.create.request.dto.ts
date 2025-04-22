import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsHexColor,
    MaxLength,
    IsString,
} from 'class-validator';
import { faker } from '@faker-js/faker';

export class TemplateTagCreateRequestDto {
    @ApiProperty({
        example: faker.lorem.text(),
        required: true,
        maxLength: 50,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        example: faker.lorem.paragraph(),
        required: false,
        maxLength: 150,
    })
    @IsString()
    @IsOptional()
    @MaxLength(150)
    description?: string;

    @ApiProperty({
        example: faker.color.rgb({ casing: 'lower', format: 'hex' }),
        required: false,
        default: '#000000',
    })
    @IsHexColor()
    @IsOptional()
    color?: string;
}
