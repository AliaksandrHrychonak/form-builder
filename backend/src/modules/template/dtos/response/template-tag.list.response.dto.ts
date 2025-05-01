import { OmitType } from '@nestjs/swagger';
import { TemplateTagGetResponseDto } from './template-tag.get.response.dto';

export class TemplateTagListResponseDto extends OmitType(
    TemplateTagGetResponseDto,
    [] as const
) {}
