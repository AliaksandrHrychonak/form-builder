import { PickType } from '@nestjs/swagger';
import { TemplateCreateRequestDto } from './template.create.request.dto';

export class TemplateUpdateRequestDto extends PickType(
    TemplateCreateRequestDto,
    [
        'title',
        'description',
        'isPublic',
        'forms',
        'questions',
        'sharedUsers',
        'tags',
        'topic',
    ] as const
) {}
