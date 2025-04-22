import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { TemplateQuestionDoc } from '../repository/entities/template-question.entity';
import { TemplateQuestionService } from '../services/template-question.service';
import { ITemplateQuestionDoc } from '../interfaces/template-question.interface';
import { ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';

@Injectable()
export class TemplateQuestionParsePipe implements PipeTransform {
    constructor(
        private readonly templateQuestionService: TemplateQuestionService
    ) {}

    async transform(value: any): Promise<ITemplateQuestionDoc> {
        const question: TemplateQuestionDoc =
            await this.templateQuestionService.findOneById(value);

        if (!question) {
            throw new NotFoundException({
                statusCode:
                    ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                message: 'template.question.error.notFound',
            });
        }

        return await this.templateQuestionService.joinWithRelations(question);
    }
}
