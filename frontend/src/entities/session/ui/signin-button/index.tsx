'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { Config, fallbackLng } from '@shared/config';
import { useClientTranslation } from '@shared/lib';
import { Button } from '@shared/ui';

import type { ComponentProps, JSX } from 'react';

const { APP_ROUTES } = Config;

export const SignInButton = ({ ...props }: ComponentProps<typeof Button>): JSX.Element => {
    const { t } = useClientTranslation('auth');
    const router = useRouter();
    const params = useParams();
    const lng = String(params?.lang ?? fallbackLng);

    return (
        <Button
            variant='outline'
            {...props}
            onClick={() => {
                router.push(`/${lng}/${APP_ROUTES.SIGN_IN}`);
            }}
        >
            {t('buttons.signIn')}
        </Button>
    );
};
