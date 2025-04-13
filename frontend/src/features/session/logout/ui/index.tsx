'use client';

import { LogOutIcon } from 'lucide-react';
import React from 'react';

import { logout } from '@features/session/logout/api';
import { DropdownMenuItem } from '@shared/ui';

import type { JSX } from 'react';

export const DropdownMenuItemLogout = (): JSX.Element => {
    return (
        <DropdownMenuItem onClick={() => logout()}>
            <LogOutIcon /> Log out
        </DropdownMenuItem>
    );
};
