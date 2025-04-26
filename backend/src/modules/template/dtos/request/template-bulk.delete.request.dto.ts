import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ArrayMaxSize } from 'class-validator';

export class TemplateBulkDeleteRequestDto {
    @ApiProperty({
        example: [faker.string.uuid()],
        required: true,
    })
    @IsNotEmpty()
    @IsUUID('4', { each: true })
    @ArrayMaxSize(200)
    ids: string[];
}
