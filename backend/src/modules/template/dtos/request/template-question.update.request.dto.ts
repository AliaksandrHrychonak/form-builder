import { PickType } from '@nestjs/swagger';
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
        'order',
    ] as const
) {}
