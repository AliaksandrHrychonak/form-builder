import {
    ForbiddenException,
    Injectable,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { ENUM_TEMPLATE_STATUS_CODE_ERROR } from 'src/modules/template/constants/template.status-code.constant';
import { TemplateEntity } from '../repository/entities/template.entity';

@Injectable({ scope: Scope.REQUEST })
export class TemplateAccessPublicPipe implements PipeTransform {
    constructor() {}

    async transform(value: TemplateEntity): Promise<TemplateEntity> {
        if (!value.isPublic) {
            throw new ForbiddenException({
                statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.FORBIDDEN_ERROR,
                message: 'template.error.forbiddenAccessError',
            });
        }

        return value;
    }
}
