import {
    TemplateQuestionDoc,
    TemplateQuestionEntity,
} from '../repository/entities/template-question.entity';
import {
    TemplateDoc,
    TemplateEntity,
} from '../repository/entities/template.entity';

export interface ITemplateQuestionEntity
    extends Omit<TemplateQuestionEntity, 'template'> {
    template: TemplateEntity;
}

export interface ITemplateQuestionDoc
    extends Omit<TemplateQuestionDoc, 'template'> {
    template: TemplateDoc;
}
