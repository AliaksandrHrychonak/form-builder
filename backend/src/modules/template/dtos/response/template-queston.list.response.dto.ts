import { OmitType } from '@nestjs/swagger';
import { TemplateQuestionGetResponseDto } from './template-question.get.response.dto';

export class TemplateQuestionListResponseDto extends OmitType(
    TemplateQuestionGetResponseDto,
    [] as const
) {}
