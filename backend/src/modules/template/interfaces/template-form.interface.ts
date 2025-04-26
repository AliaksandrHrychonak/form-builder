import {
    TemplateFormDoc,
    TemplateFormEntity,
} from '../repository/entities/template-form.entity';
import {
    TemplateDoc,
    TemplateEntity,
} from '../repository/entities/template.entity';

export interface ITemplateFormEntity
    extends Omit<TemplateFormEntity, 'template'> {
    template: TemplateEntity;
}

export interface ITemplateFormDoc extends Omit<TemplateFormDoc, 'template'> {
    template: TemplateDoc;
}
