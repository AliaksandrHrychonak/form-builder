import { REQUEST } from '@nestjs/core';
import {
    ForbiddenException,
    Inject,
    Injectable,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { ENUM_TEMPLATE_FORM_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';
import { ITemplateFormDoc } from '../interfaces/template-form.interface';

@Injectable({ scope: Scope.REQUEST })
export class TemplateFormAccessSharedPipe implements PipeTransform {
    constructor(@Inject(REQUEST) protected readonly request: IRequestApp) {}

    async transform(value: ITemplateFormDoc): Promise<ITemplateFormDoc> {
        const { user } = this.request;
        const userId: string = user._id;
        const ownerId: string = value.user;
        const isOwner: boolean = ownerId !== userId;
        const isSharedUser: boolean =
            value.template.sharedUsers.includes(userId);

        if (isOwner && !isSharedUser) {
            throw new ForbiddenException({
                statusCode:
                    ENUM_TEMPLATE_FORM_STATUS_CODE_ERROR.FORBIDDEN_ERROR,
                message: 'template.form.error.forbiddenAccessError',
            });
        }

        return value;
    }
}
