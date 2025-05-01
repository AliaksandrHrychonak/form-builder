import { z } from 'zod';

import { ENUM_POLICY_ROLE_TYPE, templateTagSchema } from '@shared/api';
import { Config } from '@shared/config';

import type { IRoleBasedSearchTemplateFilters } from '@shared/api';

const { TEMPLATE } = Config;

const baseSearchSchema = z
    .object({
        search: z.string().default(''),
        orderDirection: z.enum(TEMPLATE.SEARCH_DEFAULT_ORDER_DIRECTION_TYPE).default('asc'),
        orderBy: z.enum(TEMPLATE.SEARCH_DEFAULT_ORDER_BY).default('createdAt'),
        page: z.number().int().positive().default(1),
        limit: z.number().int().positive().default(10),
        tags: z.array(templateTagSchema).default([]),
        topics: z
            .array(
                z.enum(
                    Object.values(Object.values(TEMPLATE.SEARCH_DEFAULT_TEMPLATE_TOPICS) as [string, ...string[]]) as [
                        string,
                        ...string[],
                    ]
                )
            )
            .default([]),
    })
    .strict();

const schemaMap = {
    [ENUM_POLICY_ROLE_TYPE.PUBLIC]: baseSearchSchema,
    [ENUM_POLICY_ROLE_TYPE.USER]: baseSearchSchema,
    [ENUM_POLICY_ROLE_TYPE.MEMBER]: baseSearchSchema,
    [ENUM_POLICY_ROLE_TYPE.ADMIN]: baseSearchSchema,
    [ENUM_POLICY_ROLE_TYPE.SUPER_ADMIN]: baseSearchSchema,
} satisfies Record<ENUM_POLICY_ROLE_TYPE, z.ZodType<unknown>>;

export const getSearchSchema = <R extends ENUM_POLICY_ROLE_TYPE>(
    role: R
): z.ZodType<IRoleBasedSearchTemplateFilters<R>> => {
    return schemaMap[role] as unknown as z.ZodType<IRoleBasedSearchTemplateFilters<R>>;
};
