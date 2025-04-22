import { PickType } from '@nestjs/swagger';
import { TemplateCreateRequestDto } from './template.create.request.dto';
import { TemplateQuestionCreateRequestDto } from './template-question.create.request.dto';

export class TemplateQuestionUpdateRequestDto extends PickType(
    TemplateQuestionCreateRequestDto,
    [
        'title',
        'description',
        'required',
        'options',
        'validation',
        'type',
    ] as const
) {}
