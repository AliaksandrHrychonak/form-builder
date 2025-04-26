import {
    TemplateDoc,
    TemplateEntity,
} from 'src/modules/template/repository/entities/template.entity';

import {
    UserDoc,
    UserEntity,
} from 'src/modules/user/repository/entities/user.entity';
import {
    TemplateTagDoc,
    TemplateTagEntity,
} from '../repository/entities/template-tag.entity';

export interface ITemplateEntity
    extends Omit<TemplateEntity, 'owner' | 'sharedUsers' | 'tags'> {
    owner: UserEntity;
    sharedUsers: UserEntity[];
    tags: TemplateTagEntity[];
}

export interface ITemplateDoc
    extends Omit<TemplateDoc, 'owner' | 'sharedUsers' | 'tags'> {
    owner: UserDoc;
    sharedUsers: UserDoc[];
    tags: TemplateTagDoc[];
}
