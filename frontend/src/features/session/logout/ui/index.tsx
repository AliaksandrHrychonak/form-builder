'use client';

import { LogOutIcon } from 'lucide-react';
import React from 'react';

import { useClientTranslation } from '@shared/lib';
import { DropdownMenuItem } from '@shared/ui';

import { useLogoutMutation } from '../model';

import type { JSX } from 'react';

export const DropdownMenuItemLogout = (): JSX.Element => {
    const { t } = useClientTranslation('auth');
    const { mutate: logout } = useLogoutMutation({
        onSuccess: () => window.location.reload(),
    });
    return (
        <DropdownMenuItem onClick={() => logout({})}>
            <LogOutIcon /> {t('buttons.logout')}
        </DropdownMenuItem>
    );
};
