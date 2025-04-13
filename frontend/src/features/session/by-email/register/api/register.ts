import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { baseApi } from '@shared/api';

import type { IRequestSignUp, IResponse } from '@shared/api';

export const register = async (data: IRequestSignUp): Promise<IResponse<unknown>> => {
    return baseApi.post('/public/user/sign-up', data, {
        withCredentials: false,
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useRegisterMutation = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async (data: IRequestSignUp) => {
            return await register(data);
        },
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            router.push('/auth/signin');
        },
    });
};
