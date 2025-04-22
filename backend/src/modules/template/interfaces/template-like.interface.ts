import {
    TemplateLikeDoc,
    TemplateLikeEntity,
} from '../repository/entities/template-like.entity';

export interface ITemplateLikeEntity extends Omit<TemplateLikeEntity, ''> {}

export interface ITemplateLikeDoc extends Omit<TemplateLikeDoc, ''> {}
