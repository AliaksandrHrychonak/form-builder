import { baseApi } from '@shared/api';

import type { LoginFormData } from '../model';
import type { IResponse, ISession } from '@shared/api';

export const login = async (data: LoginFormData): Promise<IResponse<ISession>> => {
    const response = await baseApi.post('/user/user/login/credential', data);
    return response.data;
};
