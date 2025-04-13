import { signOut } from 'next-auth/react';

export const logout = async (): Promise<void> => {
    try {
        await signOut({
            callbackUrl: '/',
            redirect: true,
        });
        sessionStorage.clear();
        localStorage.clear();
    } catch (error) {
        console.error(error);
    }
};
