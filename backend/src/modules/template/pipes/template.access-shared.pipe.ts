import {
    ForbiddenException,
    Inject,
    Injectable,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { ENUM_TEMPLATE_STATUS_CODE_ERROR } from 'src/modules/template/constants/template.status-code.constant';

import { REQUEST } from '@nestjs/core';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { TemplateEntity } from '../repository/entities/template.entity';

@Injectable({ scope: Scope.REQUEST })
export class TemplateAccessSharedPipe implements PipeTransform {
    constructor(@Inject(REQUEST) protected readonly request: IRequestApp) {}

    async transform(value: TemplateEntity): Promise<TemplateEntity> {
        const { user } = this.request;
        const userId: string = user._id;
        const ownerId: string = value.owner;
        const isOwner: boolean = ownerId !== userId;
        const isSharedUser: boolean = value.sharedUsers.includes(userId);

        if (isOwner && !isSharedUser) {
            throw new ForbiddenException({
                statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.FORBIDDEN_ERROR,
                message: 'template.error.forbiddenAccessError',
            });
        }

        return value;
    }
}
