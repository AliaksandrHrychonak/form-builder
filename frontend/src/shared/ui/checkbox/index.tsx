'use client';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '../../lib';

import type { ComponentProps, JSX } from 'react';

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root>;

export const Checkbox = ({ className, ...props }: CheckboxProps): JSX.Element => (
    <CheckboxPrimitive.Root
        className={cn(
            'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
            className
        )}
        data-slot='checkbox'
        {...props}
    >
        <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
            <Check className='h-4 w-4' />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
);
