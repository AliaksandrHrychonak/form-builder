import { BASE_META } from '@shared/config';

import type { MetadataProps } from '@shared/config';
import type { Metadata } from 'next';


export const generateMetadata = ({
    title,
    description,
    keywords,
}: MetadataProps): Metadata => {
    return {
        ...BASE_META,
        title: title ?? '',
        description: description ?? '',
        keywords: [...(keywords ?? [])],
    };
};
