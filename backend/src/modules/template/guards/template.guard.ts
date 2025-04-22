import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { TemplateService } from '../services/template.service';
import { ENUM_TEMPLATE_STATUS_CODE_ERROR } from '../constants/template.status-code.constant';

@Injectable()
export class TemplateAccessGuard implements CanActivate {
    constructor(private readonly templateService: TemplateService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<IRequestApp>();
        const userId = request.user._id;
        const templateId = request.params.templateId;

        const template = await this.templateService.findOneById(templateId);

        if (!template) {
            throw new NotFoundException({
                statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                message: 'template.error.notFound',
            });
        }

        if (template.owner !== userId) {
            throw new ForbiddenException({
                statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.NOT_ACCESS_ERROR,
                message: 'template.error.notAccessError',
            });
        }

        request.template = template;
        return true;
    }
}
