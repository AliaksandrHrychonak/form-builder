import { baseApi } from '@shared/api';

import { transformSearchTemplateTagFiltersToParams } from '../lib';

import type { IBaseSearchTemplateTagFilters, IResponsePaging, ITemplateTag } from '@shared/api';

export const getTemplateTagListApi = async (
    params: IBaseSearchTemplateTagFilters
): Promise<IResponsePaging<ITemplateTag[]>> => {
    const searchParams: URLSearchParams = transformSearchTemplateTagFiltersToParams(params);

    const response = await baseApi.get<IResponsePaging<ITemplateTag[]>>(
        `/public/template/tag/list?${searchParams.toString()}`
    );

    return response.data;
};
