import { generateLocalizedMetadata } from '@shared/lib';
import { Header } from '@widgets/header';
import TemplatePublicSearchBar from '@widgets/template-public-search-bar/ui';

import type { Metadata } from 'next';
import type { FC, JSX } from 'react';

type PageParams = Promise<{ lang: string }>;

export const generateMetadataMainPage = async ({ params }: { params: PageParams }): Promise<Metadata> => {
    const resolvedParams = await params;
    return generateLocalizedMetadata(resolvedParams, 'main');
};

export const MainPage: FC = (): JSX.Element => {
    return (
        <div>
            <Header />
            <main>
                <TemplatePublicSearchBar />
            </main>
        </div>
    );
};
