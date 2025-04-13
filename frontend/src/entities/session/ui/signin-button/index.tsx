'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@shared/ui';

import type { JSX, ComponentProps } from 'react';

export const SignInButton = ({ ...props }: ComponentProps<typeof Button>): JSX.Element => {
    const router = useRouter();
    return (
        <Button
            variant='outline'
            {...props}
            onClick={() => {
                router.push('/auth/signin');
            }}
        >
            Sign In
        </Button>
    );
};
