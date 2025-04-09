import { generateLocalizedMetadata } from '@shared/lib';

import type { Metadata } from 'next';
import type { FC, JSX } from 'react';

export const generateMetadataSignUpPage = async ({ params }: { params: { lang: string } }): Promise<Metadata> =>
    generateLocalizedMetadata(params, 'signup');

export const SignUpPage: FC = (): JSX.Element => {
    return <div>signup</div>;
};
