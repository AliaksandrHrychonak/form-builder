import { UseGuards, applyDecorators } from '@nestjs/common';
import { TemplateAccessGuard } from '../guards/template.guard';

export function TemplateProtected(): MethodDecorator {
    return applyDecorators(UseGuards(TemplateAccessGuard));
}
