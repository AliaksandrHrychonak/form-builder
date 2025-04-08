'use client';

import React from 'react';

import { Button } from '@shared/ui';

import type { JSX } from 'react';

export const ButtonLogout = (): JSX.Element => {
    return (
        <Button variant='ghost' className='fixed top-5 right-5'>
            Log out
        </Button>
    );
};
