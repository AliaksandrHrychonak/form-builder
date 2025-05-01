import { generateLocalizedMetadata } from '@shared/lib';
import { Header } from '@widgets/header';
import { TemplateSearchPreviewList } from '@widgets/template-preview-list';
import { TemplateSearchBar } from '@widgets/template-search-bar';

import type { Metadata } from 'next';
import type { FC, JSX } from 'react';

type PageParams = Promise<{ lang: string }>;

export const generateMetadataMainPage = async ({ params }: { params: PageParams }): Promise<Metadata> => {
    const resolvedParams = await params;
    return generateLocalizedMetadata(resolvedParams, 'main');
};

export const MainPage: FC = async (): Promise<JSX.Element> => {
    return (
        <>
            <Header />
            <main>
                <TemplateSearchBar />
                <TemplateSearchPreviewList />
            </main>
        </>
    );
};
