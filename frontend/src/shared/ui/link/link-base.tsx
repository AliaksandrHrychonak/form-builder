import Link from 'next/link';

import { fallbackLng } from '@shared/config';

import type { ComponentProps, FC, JSX, ReactNode } from 'react';

type LinkBaseProps = Omit<ComponentProps<typeof Link>, 'href'> & {
    lng?: string;
    href?: string;
    children: ReactNode;
};

export const LinkBase: FC<LinkBaseProps> = ({ lng = fallbackLng, href = '', children, ...props }): JSX.Element => {
    return (
        <Link href={`/${lng}/${href}`} {...props}>
            {children}
        </Link>
    );
};
