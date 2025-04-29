'use client';

import { fallbackLng } from '@shared/config';
import { useClientTranslation } from '@shared/lib';

import { LinkBase } from './link-base';

import type { ComponentProps, JSX } from 'react';

type LinkClientProps = Omit<ComponentProps<typeof LinkBase>, 'lng'> & {};

export const LinkClient = ({ children, ...props }: LinkClientProps): JSX.Element => {
    const { i18n } = useClientTranslation();

    return (
        <LinkBase lng={i18n.resolvedLanguage ?? fallbackLng} {...props}>
            {children}
        </LinkBase>
    );
};
