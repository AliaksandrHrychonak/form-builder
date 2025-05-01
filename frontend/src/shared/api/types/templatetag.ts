import type { ENUM_POLICY_ROLE_TYPE } from './role';
import type { IRequestPaging } from '@shared/api';
import type { Config } from '@shared/config';

type SEARCH_DEFAULT_ORDER_BY = typeof Config.TEMPLATE_TAG.SEARCH_DEFAULT_ORDER_BY;
type SEARCH_DEFAULT_ORDER_DIRECTION_TYPE = typeof Config.TEMPLATE_TAG.SEARCH_DEFAULT_ORDER_DIRECTION_TYPE;
export type OrderSearchTemplateTagByField = SEARCH_DEFAULT_ORDER_BY[number];
export type OrderDirectionSearchTemplateTagByField = SEARCH_DEFAULT_ORDER_DIRECTION_TYPE[number];

export interface ITemplateTag {
    _id: string;
    name: string;
    description?: string;
    color?: string;
}

export interface IBaseSearchTemplateTagFilters extends IRequestPaging {
    orderBy?: OrderSearchTemplateTagByField;
    orderDirection?: OrderDirectionSearchTemplateTagByField;
    excludeIds?: string[];
}

export interface IPublicSearchTemplateTagFilters extends IBaseSearchTemplateTagFilters {}

export interface IUserSearchTemplateTagFilters extends IPublicSearchTemplateTagFilters {}

export interface IMemberSearchTemplateTagFilters extends IUserSearchTemplateTagFilters {}

export interface IAdminSearchTemplateTagFilters extends IUserSearchTemplateTagFilters {}

export interface ISuperAdminSearchTemplateTagFilters extends IUserSearchTemplateTagFilters {}

export const TEMPLATE_TAG_AVAILABLE_SEARCH_FIELDS: Record<string, string[]> = {
    PUBLIC: [],
    USER: [],
    ADMIN: [],
    MEMBER: [],
    SUPER_ADMIN: [],
} as const;

export type IRoleBasedSearchTemplateTagFilters<R extends ENUM_POLICY_ROLE_TYPE> =
    R extends ENUM_POLICY_ROLE_TYPE.SUPER_ADMIN
        ? ISuperAdminSearchTemplateTagFilters
        : R extends ENUM_POLICY_ROLE_TYPE.ADMIN
          ? IAdminSearchTemplateTagFilters
          : R extends ENUM_POLICY_ROLE_TYPE.MEMBER
            ? IMemberSearchTemplateTagFilters
            : R extends ENUM_POLICY_ROLE_TYPE.USER
              ? IUserSearchTemplateTagFilters
              : IPublicSearchTemplateTagFilters;
