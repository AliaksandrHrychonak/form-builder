import Image from 'next/image';
import Link from 'next/link';

import type { JSX } from 'react';

export const Logo = (): JSX.Element => {
    return (
        <Link href='/' className='flex items-center'>
            <Image src='favicons/logo.svg' alt='Logo' width={25} height={25} className='cursor-pointer' />
        </Link>
    );
};
