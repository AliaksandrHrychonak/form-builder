'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Config } from '@shared/config';
import { useClientTranslation } from '@shared/lib';
import { LinkClient } from '@shared/ui';

import type { FC, JSX } from 'react';

const { APP_ROUTES } = Config;

export const ErrorPage: FC = (): JSX.Element => {
    const { t } = useClientTranslation('auth');
    const searchParams = useSearchParams();
    const errorParam = searchParams?.get('error');

    const errorMessage = useMemo(() => {
        if (!errorParam) return t('errors.unknown');

        try {
            const errorData = JSON.parse(decodeURIComponent(errorParam));
            return `${errorData.statusCode || ''} ${errorData.message || t('errors.unknown')}`;
        } catch {
            return errorParam;
        }
    }, [errorParam, t]);

    return (
        <main className='flex flex-col items-center justify-center gap-4 p-4'>
            <h1 className='text-2xl font-bold'>{t('errors.auth')}</h1>
            <p className='text-muted'>{errorMessage}</p>
            <LinkClient href={APP_ROUTES.SIGN_IN} className='text-blue-500 hover:underline'>
                {t('buttons.back')}
            </LinkClient>
        </main>
    );
};
