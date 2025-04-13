import { generateLocalizedMetadata } from '@shared/lib';

import type { Metadata } from 'next';
import type { FC, JSX } from 'react';

export const generateMetadataDashboardPage = async ({ params }: { params: { lang: string } }): Promise<Metadata> =>
    generateLocalizedMetadata(params, 'dashboard');

export const DashboardPage: FC = (): JSX.Element => {
    return <div>dashboard</div>;
};
