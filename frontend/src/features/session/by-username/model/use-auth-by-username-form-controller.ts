'use client';

import { faker } from '@faker-js/faker';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { useSessionStore } from '@entities/session';

import type { AuthByUsernameFormData } from './auth-by-username.schema';

interface LoginControllerProps {
    onComplete?: () => void | unknown;
}

export const useAuthByUsernameFormController = ({
    onComplete,
}: LoginControllerProps): {
    handleSubmit: (data: AuthByUsernameFormData) => Promise<void>;
} => {
    const { setViewer } = useSessionStore((state) => state);

    const handleSubmit = useCallback(
        async ({ username }: AuthByUsernameFormData) => {
            try {
                setViewer({ username, id: uuidv4(), avatar: faker.image.avatar() });
                onComplete?.();
                // TODO Texts should be in the config, need fix after review
                toast.success('Auth by username successfully');
            } catch (error) {
                toast.error('Auth by username error', {
                    description: JSON.stringify(error),
                });
            }
        },
        [onComplete, setViewer]
    );

    return { handleSubmit };
};
