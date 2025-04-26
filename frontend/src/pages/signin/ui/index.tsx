import { generateLocalizedMetadata } from '@shared/lib';
import { Logo } from '@shared/ui';
import { SignIn } from '@widgets/signin';

import type { Metadata } from 'next';
import type { FC, JSX } from 'react';

export const generateMetadataSignInPage = async ({ params }: { params: { lang: string } }): Promise<Metadata> =>
    generateLocalizedMetadata(params, 'signin');

export const SignInPage: FC = (): JSX.Element => {
    return (
        <main className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
            <section className='flex w-full max-w-sm flex-col gap-6'>
                <Logo className='' />
                <SignIn />
            </section>
        </main>
    );
};
