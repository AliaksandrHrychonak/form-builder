import { AppleSignInButton, GoogleSignInButton, LoginForm } from '@features/session';
import { Config } from '@shared/config';
import { getServerTranslation } from '@shared/lib';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, LinkServer } from '@shared/ui';

import type { JSX } from 'react';

const { APP_ROUTES } = Config;

export const SignIn = async (): Promise<JSX.Element> => {
    const { t } = await getServerTranslation('signin');

    return (
        <>
            <Card className='flex flex-col gap-6'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>{t('title')}</CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-6'>
                    <div className='flex flex-col gap-4'>
                        <AppleSignInButton disabled />
                        <GoogleSignInButton disabled />
                    </div>
                    <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                        <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                            {t('orContinueWith')}
                        </span>
                    </div>
                    <LoginForm />

                    <div className='text-center text-sm'>
                        {t('noAccount')}&nbsp;
                        <LinkServer className='underline underline-offset-4' href={APP_ROUTES.SIGN_UP}>
                            {t('signUpLink')}
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
