import {
    ForbiddenException,
    Inject,
    Injectable,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { ITemplateQuestionEntity } from '../interfaces/template-question.interface';
import { ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';

@Injectable({ scope: Scope.REQUEST })
export class TemplateQuestionAccessPipe implements PipeTransform {
    constructor(@Inject(REQUEST) protected readonly request: IRequestApp) {}
    async transform(
        value: ITemplateQuestionEntity
    ): Promise<ITemplateQuestionEntity> {
        const { user } = this.request;
        const userId: string = user._id;
        const ownerId: string = value.template.owner;

        if (ownerId !== userId) {
            throw new ForbiddenException({
                statusCode:
                    ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR.NOT_ACCESS_ERROR,
                message: 'template.question.error.notAccessError',
            });
        }

        return value;
    }
}
