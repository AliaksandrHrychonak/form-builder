import { generateLocalizedMetadata } from '@shared/lib';
import { Logo } from '@shared/ui';
import { SignIn } from '@widgets/signin';

import type { Metadata } from 'next';
import type { JSX } from 'react';

type PageParams = Promise<{ lang: string }>;

export const SignInPage = (): JSX.Element => {
    return (
        <main className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
            <section className='flex w-full max-w-sm flex-col gap-6'>
                <Logo className='' />
                <SignIn />
            </section>
        </main>
    );
};

export const generateMetadataSignInPage = async ({ params }: { params: PageParams }): Promise<Metadata> => {
    const resolvedParams = await params;
    return generateLocalizedMetadata(resolvedParams, 'signin');
};
