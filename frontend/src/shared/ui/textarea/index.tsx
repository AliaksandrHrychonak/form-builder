import { cn } from '@shared/lib';

import type { ComponentProps, JSX } from 'react';

export const Textarea = ({ className, ...props }: ComponentProps<'textarea'>): JSX.Element => (
    <textarea
        className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
        )}
        {...props}
    />
);

Textarea.displayName = 'Textarea';
