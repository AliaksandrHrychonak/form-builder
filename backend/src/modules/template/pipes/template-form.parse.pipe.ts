import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';
import { TemplateFormDoc } from '../repository/entities/template-form.entity';
import { TemplateFormService } from '../services/template-form.service';
import { ITemplateFormDoc } from '../interfaces/template-form.interface';

@Injectable()
export class TemplateFormParsePipe implements PipeTransform {
    constructor(private readonly templateFormService: TemplateFormService) {}

    async transform(value: any): Promise<ITemplateFormDoc> {
        const form: TemplateFormDoc =
            await this.templateFormService.findOneById(value);

        if (!form) {
            throw new NotFoundException({
                statusCode:
                    ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                message: 'template.question.error.notFound',
            });
        }

        return form;
    }
}
