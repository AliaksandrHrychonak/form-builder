import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

import type { IViewer } from '@shared/api';

interface ISessionState {
    user: IViewer | null;
    isAuthenticated: boolean;
}

const initialState: ISessionState = {
    user: null,
    isAuthenticated: false,
};

export interface ISessionStore extends ISessionState {
    setViewer: (user: IViewer) => void;
    reset: () => void;
}

// 12 часов в секундах = 12 * 60 * 60 = 43200
const COOKIE_MAX_AGE = 43200;

export const useSessionStore = create<ISessionStore>()(
    persist(
        (set) => ({
            ...initialState,
            reset: (): void => set(initialState),
            setViewer: (user: IViewer): void => {
                if (user) {
                    set({ user, isAuthenticated: true });
                }
            },
        }),
        {
            name: 'session-store',
            storage: {
                getItem: (name) => {
                    const value = document.cookie
                        .split('; ')
                        .find((row) => row.startsWith(name + '='))
                        ?.split('=')[1];
                    return value ? JSON.parse(value) : null;
                },
                setItem: (name, value) => {
                    document.cookie = `${name}=${JSON.stringify(value)};path=/;max-age=${COOKIE_MAX_AGE}`;
                },
                removeItem: (name) => {
                    document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                },
            },
        }
    )
);
