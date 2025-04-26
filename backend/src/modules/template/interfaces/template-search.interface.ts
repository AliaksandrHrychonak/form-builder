import {
    TemplateDoc,
    TemplateEntity,
} from '../repository/entities/template.entity';

export interface ITemplateSearchEntity
    extends Omit<TemplateEntity, 'owner' | 'sharedUsers' | 'tags'> {
    owner: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    sharedUsers: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    }[];
    tags: {
        _id: string;
        name: string;
        description: string;
        color: string;
    }[];
    popularityScore: number;
    questions: {
        _id: string;
        title: string;
        description: string;
    }[];
    comments: {
        _id: string;
        text: string;
    }[];
}

export interface ITemplateSearchDoc
    extends Omit<TemplateDoc, 'owner' | 'sharedUsers' | 'tags'> {
    owner: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    sharedUsers: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    }[];
    tags: {
        _id: string;
        name: string;
        description: string;
        color: string;
    }[];
    popularityScore: number;
    questions: {
        _id: string;
        title: string;
        description: string;
    }[];
    comments: {
        _id: string;
        text: string;
    }[];
}
