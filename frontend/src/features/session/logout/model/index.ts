import { wait } from '@shared/lib';

export const logoutThunk = async (): Promise<void> => {
    await wait(10);

    sessionStorage.clear();
    localStorage.clear();
};
