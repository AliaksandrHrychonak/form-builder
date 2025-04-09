import { generateLocalizedMetadata } from '@shared/lib';

import type { Metadata } from 'next';
import type { FC, JSX } from 'react';

export const generateMetadataSignInPage = async ({ params }: { params: { lang: string } }): Promise<Metadata> =>
    generateLocalizedMetadata(params, 'signin');

export const SignInPage: FC = (): JSX.Element => {
    return <div>signin</div>;
};
