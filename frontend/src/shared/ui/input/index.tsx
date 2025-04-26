'use client';

import { useState } from 'react';

import { cn } from '../../lib';

import type { ComponentProps, JSX } from 'react';

type InputProps = {
    className?: string;
    type?: string;
    allowAutofill?: boolean;
} & ComponentProps<'input'>;

export const Input = ({
    className,
    type,
    allowAutofill: initialAllowAutofill = false,
    ...props
}: InputProps): JSX.Element => {
    const [allowAutofill, setAllowAutofill] = useState(initialAllowAutofill);

    const handleAllowAutofill = (): void => {
        if (!allowAutofill) {
            setAllowAutofill(true);
        }
    };

    return (
        <div className='relative'>
            <input
                data-slot='input'
                type={type}
                autoComplete={allowAutofill ? 'on' : 'off'}
                onFocus={handleAllowAutofill}
                onBlur={() => setAllowAutofill(false)}
                className={cn(
                    'autofill-transparent border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    className
                )}
                {...props}
            />
        </div>
    );
};
