'use client';

import { useSession } from 'next-auth/react';

import { SignInButton, useUserProfileQuery, ViewerBar } from '@entities/session';
import { DropdownMenuItemLogout } from '@features/session';
import { ThemeSwitcher } from '@features/theme';
import { Logo, Separator, Skeleton } from '@shared/ui';

import type { JSX } from 'react';

export const Header = (): JSX.Element => {
    const { data: session } = useSession();

    const { data: profileData, isLoading } = useUserProfileQuery();

    return (
        <header className='flex justify-between p-4 border-b'>
            <Logo />
            <div className='flex gap-1'>
                <ThemeSwitcher />
                <Separator orientation='vertical' />
                <nav>
                    {isLoading ? (
                        <div className='flex items-center w-full gap-2'>
                            <Skeleton className='h-9 w-9 rounded-lg' />
                        </div>
                    ) : session ? (
                        <ViewerBar profileViewer={profileData?.data}>
                            <DropdownMenuItemLogout />
                        </ViewerBar>
                    ) : (
                        <SignInButton />
                    )}
                </nav>
            </div>
        </header>
    );
};
