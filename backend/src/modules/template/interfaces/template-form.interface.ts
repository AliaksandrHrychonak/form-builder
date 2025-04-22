import {
    TemplateFormDoc,
    TemplateFormEntity,
} from '../repository/entities/template-form.entity';

export interface ITemplateFormEntity extends Omit<TemplateFormEntity, ''> {}

export interface ITemplateFormDoc extends Omit<TemplateFormDoc, ''> {}
