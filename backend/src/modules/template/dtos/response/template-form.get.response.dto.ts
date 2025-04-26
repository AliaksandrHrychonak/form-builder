import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { DatabaseIdResponseDto } from 'src/common/database/dtos/response/database.id.response.dto';
import { Exclude } from 'class-transformer';

export class TemplateFormGetResponseDto extends DatabaseIdResponseDto {
    @ApiProperty({
        required: true,
        nullable: false,
    })
    readonly answers: Record<string, any>;

    @ApiHideProperty()
    @Exclude()
    readonly user: string;

    @ApiHideProperty()
    @Exclude()
    readonly template: string;
}
