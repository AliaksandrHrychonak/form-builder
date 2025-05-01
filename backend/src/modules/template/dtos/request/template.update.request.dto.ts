import { ApiProperty, PickType } from '@nestjs/swagger';
import { TemplateCreateRequestDto } from './template.create.request.dto';
import { faker } from '@faker-js/faker';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class TemplateUpdateRequestDto extends PickType(
    TemplateCreateRequestDto,
    ['title', 'description', 'isPublic', 'sharedUsers', 'topics'] as const
) {
    @ApiProperty({
        example: [faker.string.uuid()],
        required: true,
    })
    @IsNotEmpty()
    @IsUUID('4', { each: true })
    tags: string[];
}
