import { baseApi } from '@shared/api';

import type { IRequestSignUp, IResponse } from '@shared/api';

export const registerApi = async (data: IRequestSignUp): Promise<IResponse<unknown>> => {
    const response = await baseApi.post<IResponse<unknown>>('/public/user/sign-up', data);

    return response.data;
};
