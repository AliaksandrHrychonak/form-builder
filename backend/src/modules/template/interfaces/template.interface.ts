import {
    TemplateDoc,
    TemplateEntity,
} from 'src/modules/template/repository/entities/template.entity';
import {
    TemplateCommentDoc,
    TemplateCommentEntity,
} from 'src/modules/template/repository/entities/template-comment.entity';
import {
    TemplateFormDoc,
    TemplateFormEntity,
} from 'src/modules/template/repository/entities/template-form.entity';
import {
    TemplateLikeDoc,
    TemplateLikeEntity,
} from 'src/modules/template/repository/entities/template-like.entity';
import {
    UserDoc,
    UserEntity,
} from 'src/modules/user/repository/entities/user.entity';
import {
    TemplateQuestionDoc,
    TemplateQuestionEntity,
} from 'src/modules/template/repository/entities/template-question.entity';
import { TemplateTagEntity } from '../repository/entities/template-tag.entity';

export interface ITemplateEntity
    extends Omit<
        TemplateEntity,
        | 'comments'
        | 'forms'
        | 'likes'
        | 'questions'
        | 'owner'
        | 'sharedUsers'
        | 'tags'
    > {
    comments: TemplateCommentEntity[];
    forms: TemplateFormEntity[];
    likes: TemplateLikeEntity[];
    questions: TemplateQuestionEntity[];
    owner: UserEntity;
    sharedUsers: UserEntity[];
    tags: TemplateTagEntity[];
}

export interface ITemplateDoc
    extends Omit<
        TemplateDoc,
        'comments' | 'forms' | 'likes' | 'questions' | 'owner' | 'sharedUsers'
    > {
    comments: TemplateCommentDoc[];
    forms: TemplateFormDoc[];
    likes: TemplateLikeDoc[];
    questions: TemplateQuestionDoc[];
    owner: UserDoc;
    sharedUsers: UserDoc[];
}
