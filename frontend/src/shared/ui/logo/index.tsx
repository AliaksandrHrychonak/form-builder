import { LibraryIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@shared/lib';

import type { ComponentProps, FC, JSX } from 'react';

interface ILogoProps extends Omit<ComponentProps<typeof Link>, 'href'> {
    href?: string;
}

export const Logo: FC<ILogoProps> = ({ className, href = '/', ...props }): JSX.Element => {
    return (
        <Link href={href} className={cn('flex items-center', className)} {...props}>
            <LibraryIcon fill='currentColor' size={25} />
        </Link>
    );
};
