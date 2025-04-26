import { generateLocalizedMetadata } from '@shared/lib';
import { Header } from '@widgets/header';
import TemplatePublicSearchBar from '@widgets/template-public-search-bar/ui';

import type { Metadata } from 'next';
import type { FC, JSX } from 'react';

export const generateMetadataMainPage = async ({ params }: { params: { lang: string } }): Promise<Metadata> =>
    generateLocalizedMetadata(params, 'main');

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
