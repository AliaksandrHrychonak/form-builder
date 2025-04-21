import {
    TemplateTagDoc,
    TemplateTagEntity,
} from 'src/modules/template/repository/entities/template-tag.entity';

export interface ITemplateTagEntity extends Omit<TemplateTagEntity, ''> {}

export interface ITemplateTagDoc extends Omit<TemplateTagDoc, ''> {}
