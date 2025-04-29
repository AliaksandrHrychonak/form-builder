'use client';

import { useSession } from 'next-auth/react';

import { SignInButton, useUserProfileQuery, ViewerBar } from '@entities/session';
import { LanguageSwitcher } from '@features/language';
import { DropdownMenuItemLogout } from '@features/session';
import { ThemeSwitcher } from '@features/theme';
import { Logo, Separator, Skeleton } from '@shared/ui';

import type { JSX } from 'react';

const HeaderNavigationSkeleton = (): JSX.Element => (
    <div className='flex items-center w-[140px] gap-2'>
        <Skeleton className='h-[36px] w-[140px] rounded-lg' />
    </div>
);

export const Header = (): JSX.Element => {
    const { data: session } = useSession();

    const { data: profileData, isLoading } = useUserProfileQuery();

    return (
        <header className='flex justify-between p-4 border-b'>
            <Logo />
            <div className='flex gap-1'>
                <ThemeSwitcher />
                <LanguageSwitcher />
                <Separator orientation='vertical' />
                <nav>
                    {isLoading ? (
                        <HeaderNavigationSkeleton />
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
