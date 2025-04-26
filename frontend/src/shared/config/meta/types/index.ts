import type { Metadata } from 'next';

interface MetadataProps extends Metadata {
    title?: string;
    description?: string;
    keywords?: string[];
}

interface LocalizedMetadata {
    [page: string]: MetadataProps;
    main: MetadataProps;
}

export type { MetadataProps, LocalizedMetadata };
