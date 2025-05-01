import { baseApi } from '@shared/api';

import { transformSearchTemplateFiltersToParams } from '../lib';

import type { IBaseSearchTemplateFilters, IResponseElasticsearch, ISearchTemplate } from '@shared/api';

export const getTemplateListApi = async (
    params: IBaseSearchTemplateFilters
): Promise<IResponseElasticsearch<ISearchTemplate[]>> => {
    const searchParams = transformSearchTemplateFiltersToParams(params);
    console.log(searchParams.toString());
    const response = await baseApi.get<IResponseElasticsearch<ISearchTemplate[]>>(
        `/public/template/list?${searchParams.toString()}`
    );

    return response.data;
};
