import React from 'react';

import { ThemeSwitcher } from '@features/theme';
import { Button, Logo, Separator } from '@shared/ui';

import type { JSX } from 'react';

export const Header = (): JSX.Element => {
    return (
        <header className='flex justify-between p-4 border-b'>
            <Logo />
            <div className='flex gap-1'>
                <ThemeSwitcher />
                <Separator orientation='vertical' />
                <nav>
                    <Button variant='outline'>Sign In</Button>
                </nav>
            </div>
        </header>
    );
};
