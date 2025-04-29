'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

import type { ThemeType } from '../../config';
import type { IMessageValidationError } from '@shared/api';
import type { ComponentProps, JSX } from 'react';

type ToasterProps = ComponentProps<typeof Sonner>;

export const Toaster = ({ ...props }: ToasterProps): JSX.Element => {
    const { theme } = useTheme();
    const resolvedTheme = theme || 'system';

    return (
        <Sonner
            theme={resolvedTheme as ThemeType}
            className='toaster group'
            position='top-right'
            toastOptions={{
                classNames: {
                    toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
                    description: 'group-[.toast]:text-muted-foreground',
                    actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                    cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
                },
            }}
            {...props}
        />
    );
};

export const ToasterValidationErrorDescriptionMessage = ({
    data,
}: {
    data: IMessageValidationError[] | undefined;
}): JSX.Element | '' => {
    if (!data?.length) {
        return '';
    }

    return (
        <div className='mt-1 flex max-h-[200px] flex-col gap-1 overflow-y-auto'>
            {data?.map((error, index) => (
                <span key={index} className='line-clamp-2 text-xs'>
                    {error.message}
                </span>
            ))}
        </div>
    );
};
