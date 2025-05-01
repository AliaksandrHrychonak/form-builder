import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { DatabaseIdResponseDto } from 'src/common/database/dtos/response/database.id.response.dto';

export class TemplateTagGetResponseDto extends DatabaseIdResponseDto {
    @ApiProperty({
        required: true,
        nullable: false,
        maxLength: 50,
        minLength: 1,
    })
    readonly name: string;

    @ApiProperty({
        required: false,
        nullable: false,
        maxLength: 150,
        minLength: 1,
    })
    readonly description?: string;

    @ApiProperty({
        required: false,
        nullable: false,
        maxLength: 50,
        minLength: 1,
    })
    readonly color?: string;

    @ApiHideProperty()
    @Exclude()
    readonly deletedAt?: Date;
}
