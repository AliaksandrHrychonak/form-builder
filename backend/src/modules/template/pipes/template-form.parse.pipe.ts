import {
    Inject,
    Injectable,
    NotFoundException,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { TemplateFormService } from '../services/template-form.service';
import { ENUM_TEMPLATE_FORM_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';
import { REQUEST } from '@nestjs/core';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { ITemplateFormDoc } from '../interfaces/template-form.interface';

@Injectable({ scope: Scope.REQUEST })
export class TemplateFormParsePipe implements PipeTransform {
    constructor(
        @Inject(REQUEST) private readonly request: IRequestApp,
        private readonly templateFormService: TemplateFormService
    ) {}

    async transform(value: any): Promise<ITemplateFormDoc> {
        const { params } = this.request;
        const templateId = params?.templateId;

        const form: ITemplateFormDoc =
            await this.templateFormService.findOneWithTemplate({
                template: templateId,
                _id: value,
            });

        if (!form) {
            throw new NotFoundException({
                statusCode:
                    ENUM_TEMPLATE_FORM_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                message: 'template.form.error.notFound',
            });
        }

        return form;
    }
}
