import { REQUEST } from '@nestjs/core';
import {
    ForbiddenException,
    Inject,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { Scope } from '@nestjs/common/interfaces';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { ENUM_TEMPLATE_FORM_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';
import { TemplateFormEntity } from '../repository/entities/template-form.entity';

@Injectable({ scope: Scope.REQUEST })
export class TemplateFormAccessPipe implements PipeTransform {
    constructor(@Inject(REQUEST) protected readonly request: IRequestApp) {}
    async transform(value: TemplateFormEntity): Promise<TemplateFormEntity> {
        const { user } = this.request;
        const userId: string = user._id;
        const ownerId: string = value.user;

        if (ownerId !== userId) {
            throw new ForbiddenException({
                statusCode:
                    ENUM_TEMPLATE_FORM_STATUS_CODE_ERROR.NOT_ACCESS_ERROR,
                message: 'template.form.error.notAccessError',
            });
        }

        return value;
    }
}
