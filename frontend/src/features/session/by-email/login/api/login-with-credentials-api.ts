import { baseApi } from '@shared/api';

import type { LoginFormData } from '../model';
import type { IResponse, ISession } from '@shared/api';

export const loginWithCredentialsApi = async (data: LoginFormData): Promise<IResponse<ISession>> => {
    const response = await baseApi.post<IResponse<ISession>>('/user/user/login/credential', data);

    return response.data;
};
