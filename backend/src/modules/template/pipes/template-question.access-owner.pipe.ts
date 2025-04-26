import {
    ForbiddenException,
    Inject,
    Injectable,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';
import { ITemplateQuestionDoc } from '../interfaces/template-question.interface';

@Injectable({ scope: Scope.REQUEST })
export class TemplateQuestionAccessOwnerPipe implements PipeTransform {
    constructor(@Inject(REQUEST) protected readonly request: IRequestApp) {}

    async transform(
        value: ITemplateQuestionDoc
    ): Promise<ITemplateQuestionDoc> {
        const { user } = this.request;
        const userId: string = user._id;
        const ownerId: string = value.user;

        if (ownerId !== userId) {
            throw new ForbiddenException({
                statusCode:
                    ENUM_TEMPLATE_QUESTION_STATUS_CODE_ERROR.FORBIDDEN_ERROR,
                message: 'template.question.error.forbiddenAccessError',
            });
        }

        return value;
    }
}
