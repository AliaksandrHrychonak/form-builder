import type { LocalizedMetadata, MetadataProps } from '@shared/config';

export const getPageMetadata = (
    url: string,
    metadata: LocalizedMetadata
): MetadataProps => {
    const segments = url.split('/').filter(Boolean);

    if (segments.length === 0) {
        return metadata.main;
    }

    return metadata[segments[0]];
};
