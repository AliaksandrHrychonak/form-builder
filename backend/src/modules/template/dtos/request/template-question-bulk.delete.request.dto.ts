import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsNotEmpty, IsUUID } from 'class-validator';

export class TemplateQuestionBulkDeleteRequestDto {
    @ApiProperty({
        example: [faker.string.uuid()],
        required: true,
    })
    @IsNotEmpty()
    @IsUUID('4', { each: true })
    @ArrayMaxSize(200)
    ids: string[];
}
