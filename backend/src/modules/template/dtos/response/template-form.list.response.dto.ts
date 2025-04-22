import { OmitType } from '@nestjs/swagger';
import { TemplateFormGetResponseDto } from './template-form.get.response.dto';

export class TemplateFormListResponseDto extends OmitType(
    TemplateFormGetResponseDto,
    [] as const
) {}
