import {
    Inject,
    Injectable,
    NotFoundException,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { TemplateQuestionService } from '../services/template-question.service';
import { ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { REQUEST } from '@nestjs/core';
import { ITemplateQuestionDoc } from '../interfaces/template-question.interface';

@Injectable({ scope: Scope.REQUEST })
export class TemplateQuestionParsePipe implements PipeTransform {
    constructor(
        @Inject(REQUEST) private readonly request: IRequestApp,
        private readonly templateQuestionService: TemplateQuestionService
    ) {}

    async transform(value: any): Promise<ITemplateQuestionDoc> {
        const { params } = this.request;
        const templateId = params?.templateId;

        const question = await this.templateQuestionService.findOneWithTemplate(
            {
                template: templateId,
                _id: value,
            }
        );

        if (!question) {
            throw new NotFoundException({
                statusCode:
                    ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                message: 'template.question.error.notFound',
            });
        }

        return question;
    }
}
