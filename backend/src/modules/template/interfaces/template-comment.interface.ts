import {
    TemplateCommentDoc,
    TemplateCommentEntity,
} from '../repository/entities/template-comment.entity';

export interface ITemplateCommentEntity
    extends Omit<TemplateCommentEntity, ''> {}

export interface ITemplateCommentDoc extends Omit<TemplateCommentDoc, ''> {}
