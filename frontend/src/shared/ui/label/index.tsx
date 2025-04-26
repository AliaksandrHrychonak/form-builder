'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib';

import type { ComponentProps, JSX } from 'react';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

type LabelProps = ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>;

export const Label = ({ className, ...props }: LabelProps): JSX.Element => {
    return <LabelPrimitive.Root data-slot='label' className={cn(labelVariants(), className)} {...props} />;
};
