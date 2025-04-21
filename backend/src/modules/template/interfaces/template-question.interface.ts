import {
    TemplateQuestionDoc,
    TemplateQuestionEntity,
} from '../repository/entities/template-question.entity';

export interface ITemplateQuestionEntity
    extends Omit<TemplateQuestionEntity, ''> {}

export interface ITemplateQuestionDoc extends Omit<TemplateQuestionDoc, ''> {}
