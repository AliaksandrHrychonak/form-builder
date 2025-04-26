'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '../../lib';

import type { ComponentProps, JSX } from 'react';

interface SeparatorProps extends ComponentProps<typeof SeparatorPrimitive.Root> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
}

const Separator = ({
    className,
    orientation = 'horizontal',
    decorative = true,
    ...props
}: SeparatorProps): JSX.Element => {
    return (
        <SeparatorPrimitive.Root
            data-slot='separator'
            decorative={decorative}
            orientation={orientation}
            className={cn(
                'shrink-0 bg-border',
                orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
                className
            )}
            {...props}
        />
    );
};

export { Separator };
