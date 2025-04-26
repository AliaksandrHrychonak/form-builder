import {
    Inject,
    Injectable,
    NotFoundException,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { TemplateService } from 'src/modules/template/services/template.service';
import { ENUM_TEMPLATE_STATUS_CODE_ERROR } from 'src/modules/template/constants/template.status-code.constant';
import { TemplateDoc } from 'src/modules/template/repository/entities/template.entity';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class TemplateParsePipe implements PipeTransform {
    constructor(
        @Inject(REQUEST) private readonly request: IRequestApp,
        private readonly templateService: TemplateService
    ) {}

    async transform(value: any): Promise<TemplateDoc> {
        const template = await this.templateService.findOneById(value);

        if (!template) {
            throw new NotFoundException({
                statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                message: 'template.error.notFound',
            });
        }

        return template;
    }
}
