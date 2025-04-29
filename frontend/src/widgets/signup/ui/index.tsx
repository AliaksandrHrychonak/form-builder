import { RegisterForm } from '@features/session';
import { Config } from '@shared/config';
import { getServerTranslation } from '@shared/lib';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, LinkServer } from '@shared/ui';

import type { JSX } from 'react';

const { APP_ROUTES } = Config;

export const SignUp = async (): Promise<JSX.Element> => {
    const { t } = await getServerTranslation('signup');
    return (
        <>
            <Card className='flex flex-col gap-6'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>{t('title')}</CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-6'>
                    <RegisterForm />
                    <div className='text-center text-sm'>
                        {t('haveAccount')}&nbsp;
                        <LinkServer href={APP_ROUTES.SIGN_IN} className='underline underline-offset-4'>
                            {t('signInLink')}
                        </LinkServer>
                    </div>
                </CardContent>
            </Card>
            <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary'>
                {t('terms')}&nbsp;
                <LinkServer href={APP_ROUTES.TERMS_SERVICE}>{t('termsLink')}</LinkServer>
                &nbsp;{t('and')}&nbsp;
                <LinkServer href={APP_ROUTES.PRIVACY_POLICY}>{t('privacyLink')}</LinkServer>.
            </div>
        </>
    );
};
