import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '../../lib';

import type { ComponentProps, JSX } from 'react';

const ScrollArea = ({
    className,
    children,
    ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Root>): JSX.Element => (
    <ScrollAreaPrimitive.Root className={cn('relative overflow-hidden', className)} data-slot='root' {...props}>
        <ScrollAreaPrimitive.Viewport className='h-full w-full rounded-[inherit]'>
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
);

const ScrollBar = ({
    className,
    orientation = 'vertical',
    ...props
}: ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>): JSX.Element => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
        orientation={orientation}
        className={cn(
            'flex touch-none select-none transition-colors',
            orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
            orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
            className
        )}
        data-slot='scrollbar'
        {...props}
    >
        <ScrollAreaPrimitive.ScrollAreaThumb className='relative flex-1 rounded-full bg-border' data-slot='thumb' />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
);

export { ScrollArea, ScrollBar };
