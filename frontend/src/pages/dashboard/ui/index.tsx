import { generateLocalizedMetadata } from '@shared/lib';

import type { Metadata } from 'next';
import type { FC, JSX } from 'react';

type PageParams = Promise<{ lang: string }>;

export const generateMetadataDashboardPage = async ({ params }: { params: PageParams }): Promise<Metadata> => {
    const resolvedParams = await params;
    return generateLocalizedMetadata(resolvedParams, 'dashboard');
};

export const DashboardPage: FC = (): JSX.Element => {
    return <div>dashboard</div>;
};
