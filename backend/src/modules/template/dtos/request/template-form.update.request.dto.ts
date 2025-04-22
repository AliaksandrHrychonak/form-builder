import { PickType } from '@nestjs/swagger';
import { TemplateFormCreateRequestDto } from './template-form.create.request.dto';

export class TemplateFormUpdateRequestDto extends PickType(
    TemplateFormCreateRequestDto,
    ['answers'] as const
) {}
