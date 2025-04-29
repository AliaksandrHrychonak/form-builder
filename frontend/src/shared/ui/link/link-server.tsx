import { fallbackLng } from '@shared/config';
import { getServerTranslation } from '@shared/lib';

import { LinkBase } from './link-base';

import type { ComponentProps, JSX } from 'react';

type LinkServerProps = ComponentProps<typeof LinkBase> & {};

export const LinkServer = async ({ children, href = '', ...props }: LinkServerProps): Promise<JSX.Element> => {
    const { i18n } = await getServerTranslation();

    return (
        <LinkBase lng={i18n.resolvedLanguage ?? fallbackLng} href={href} {...props}>
            {children}
        </LinkBase>
    );
};
