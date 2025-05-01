import type { ENUM_POLICY_ROLE_TYPE } from './role';
import type { IRequestPaging, ITemplateTag } from '@shared/api';
import type { Config } from '@shared/config';

type SEARCH_DEFAULT_TEMPLATE_TOPICS = typeof Config.TEMPLATE.SEARCH_DEFAULT_TEMPLATE_TOPICS;
type SEARCH_DEFAULT_ORDER_BY = typeof Config.TEMPLATE.SEARCH_DEFAULT_ORDER_BY;
type SEARCH_DEFAULT_ORDER_DIRECTION_TYPE = typeof Config.TEMPLATE.SEARCH_DEFAULT_ORDER_DIRECTION_TYPE;
export type EnumSearchTemplateByTopics = SEARCH_DEFAULT_TEMPLATE_TOPICS[number];
export type OrderSearchTemplateByField = SEARCH_DEFAULT_ORDER_BY[number];
export type OrderDirectionSearchTemplateByField = SEARCH_DEFAULT_ORDER_DIRECTION_TYPE[number];

export interface ISearchTemplate {
    _id: string;
    title: string;
    description: string;
    topics: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
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
        comment: string;
    }[];
}

export interface IBaseSearchTemplateFilters extends IRequestPaging {
    orderBy?: OrderSearchTemplateByField;
    orderDirection?: OrderDirectionSearchTemplateByField;
    tags?: ITemplateTag[];
    topics?: EnumSearchTemplateByTopics[];
}

export interface IPublicSearchTemplateFilters extends IBaseSearchTemplateFilters {}

export interface IUserSearchTemplateFilters extends IPublicSearchTemplateFilters {}

export interface IMemberSearchTemplateFilters extends IUserSearchTemplateFilters {}

export interface IAdminSearchTemplateFilters extends IUserSearchTemplateFilters {}

export interface ISuperAdminSearchTemplateFilters extends IUserSearchTemplateFilters {}

export const TEMPLATE_AVAILABLE_SEARCH_FIELDS: Record<string, string[]> = {
    PUBLIC: [],
    USER: [],
    ADMIN: [],
    MEMBER: [],
    SUPER_ADMIN: [],
} as const;

export type IRoleBasedSearchTemplateFilters<R extends ENUM_POLICY_ROLE_TYPE> =
    R extends ENUM_POLICY_ROLE_TYPE.SUPER_ADMIN
        ? ISuperAdminSearchTemplateFilters
        : R extends ENUM_POLICY_ROLE_TYPE.ADMIN
          ? IAdminSearchTemplateFilters
          : R extends ENUM_POLICY_ROLE_TYPE.MEMBER
            ? IMemberSearchTemplateFilters
            : R extends ENUM_POLICY_ROLE_TYPE.USER
              ? IUserSearchTemplateFilters
              : IPublicSearchTemplateFilters;
