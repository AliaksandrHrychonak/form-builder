import { generateLocalizedMetadata } from '@shared/lib';
import { Logo } from '@shared/ui';
import { SignUp } from '@widgets/signup/ui';

import type { Metadata } from 'next';
import type { FC, JSX } from 'react';

export const generateMetadataSignUpPage = async ({ params }: { params: { lang: string } }): Promise<Metadata> =>
    generateLocalizedMetadata(params, 'signup');

export const SignUpPage: FC = (): JSX.Element => {
    return (
        <main className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
            <section className='flex w-full max-w-md flex-col gap-6'>
                <Logo />
                <SignUp />
            </section>
        </main>
    );
};
