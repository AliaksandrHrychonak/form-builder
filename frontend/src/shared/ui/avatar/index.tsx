// components/ui/avatar.tsx
'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '../../lib';

import type { ComponentProps, JSX } from 'react';

type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> & {
    className?: string;
};

const Avatar = ({ className, ...props }: AvatarProps): JSX.Element => (
    <AvatarPrimitive.Root
        data-slot='root'
        className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
        {...props}
    />
);

type AvatarImageProps = ComponentProps<typeof AvatarPrimitive.Image> & {
    className?: string;
};

const AvatarImage = ({ className, ...props }: AvatarImageProps): JSX.Element => (
    <AvatarPrimitive.Image data-slot='image' className={cn('aspect-square h-full w-full', className)} {...props} />
);

type AvatarFallbackProps = ComponentProps<typeof AvatarPrimitive.Fallback> & {
    className?: string;
};

const AvatarFallback = ({ className, ...props }: AvatarFallbackProps): JSX.Element => (
    <AvatarPrimitive.Fallback
        data-slot='fallback'
        className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
        {...props}
    />
);

export { Avatar, AvatarImage, AvatarFallback };
