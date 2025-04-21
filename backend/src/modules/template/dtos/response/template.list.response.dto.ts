import { OmitType } from '@nestjs/swagger';
import { TemplateGetResponseDto } from './template.get.response.dto';

export class TemplateListResponseDto extends OmitType(
    TemplateGetResponseDto,
    [] as const
) {}
