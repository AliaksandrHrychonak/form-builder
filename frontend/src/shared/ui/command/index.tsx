'use client';

import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import * as React from 'react';

import { cn } from '../../lib';

import type { DialogProps } from '@radix-ui/react-dialog';
import type { ComponentProps, HTMLAttributes, JSX } from 'react';

interface CommandProps extends ComponentProps<typeof CommandPrimitive> {
    className?: string;
}

const Command = ({ className, ...props }: CommandProps): JSX.Element => {
    return (
        <CommandPrimitive
            data-slot='root'
            className={cn(
                'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
                className
            )}
            {...props}
        />
    );
};

const CommandDialog = ({ children, ...props }: DialogProps): JSX.Element => {
    return (
        <Dialog {...props}>
            <DialogContent className='overflow-hidden p-0'>
                <Command className='[&[cmdk-group-heading]]:px-2 [&[cmdk-group-heading]]:font-medium [&[cmdk-group-heading]]:text-muted-foreground [&[cmdk-group]:not([hidden])~[cmdk-group]]:pt-0 [&[cmdk-group]]:px-2 [&[cmdk-input]]:h-12 '>
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    );
};

interface CommandInputProps extends ComponentProps<typeof CommandPrimitive.Input> {
    className?: string;
}

const CommandInput = ({ className, ...props }: CommandInputProps): JSX.Element => {
    return (
        <div className='flex items-center border-b px-3' data-slot='input-wrapper'>
            <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
            <CommandPrimitive.Input
                data-slot='input'
                className={cn(
                    'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            />
        </div>
    );
};

interface CommandListProps extends ComponentProps<typeof CommandPrimitive.List> {
    className?: string;
}

const CommandList = ({ className, ...props }: CommandListProps): JSX.Element => {
    return (
        <CommandPrimitive.List
            data-slot='list'
            className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
            {...props}
        />
    );
};

interface CommandEmptyProps extends React.ComponentProps<typeof CommandPrimitive.Empty> {}

const CommandEmpty = (props: CommandEmptyProps): JSX.Element => {
    return <CommandPrimitive.Empty data-slot='empty' className='py-6 text-center text-sm' {...props} />;
};

interface CommandGroupProps extends ComponentProps<typeof CommandPrimitive.Group> {
    className?: string;
}

const CommandGroup = ({ className, ...props }: CommandGroupProps): JSX.Element => {
    return (
        <CommandPrimitive.Group
            data-slot='group'
            className={cn(
                'overflow-hidden p-1 text-foreground [&[cmdk-group-heading]]:px-2 [&[cmdk-group-heading]]:py-1.5 [&[cmdk-group-heading]]:text-xs [&[cmdk-group-heading]]:font-medium [&[cmdk-group-heading]]:text-muted-foreground',
                className
            )}
            {...props}
        />
    );
};

interface CommandSeparatorProps extends ComponentProps<typeof CommandPrimitive.Separator> {
    className?: string;
}

const CommandSeparator = ({ className, ...props }: CommandSeparatorProps): JSX.Element => {
    return (
        <CommandPrimitive.Separator
            data-slot='separator'
            className={cn('-mx-1 h-px bg-border', className)}
            {...props}
        />
    );
};

interface CommandItemProps extends ComponentProps<typeof CommandPrimitive.Item> {
    className?: string;
}

const CommandItem = ({ className, ...props }: CommandItemProps): JSX.Element => {
    return (
        <CommandPrimitive.Item
            data-slot='item'
            className={cn(
                'relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                className
            )}
            {...props}
        />
    );
};

interface CommandShortcutProps extends HTMLAttributes<HTMLSpanElement> {
    className?: string;
}

const CommandShortcut = ({ className, ...props }: CommandShortcutProps): JSX.Element => {
    return (
        <span
            data-slot='shortcut'
            className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
            {...props}
        />
    );
};

export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
