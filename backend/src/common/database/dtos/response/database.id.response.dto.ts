import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class DatabaseIdResponseDto {
    @ApiProperty({
        description: 'Alias pl of api key',
        example: faker.string.uuid(),
        required: true,
    })
    _id: string;
}
