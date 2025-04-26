'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn, useDialogContext } from '../../lib';

import type { ComponentProps, FC, JSX, ReactNode } from 'react';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

const DialogOverlay = ({ className, ...props }: DialogOverlayProps): JSX.Element => {
    return (
        <DialogPrimitive.Overlay
            data-slot='overlay'
            className={cn(
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
                className
            )}
            {...props}
        />
    );
};

type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content>;

const DialogContent = ({ className, children, ...props }: DialogContentProps): JSX.Element => {
    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                data-slot='content'
                className={cn(
                    'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg',
                    className
                )}
                {...props}
            >
                {children}
            </DialogPrimitive.Content>
        </DialogPortal>
    );
};

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
    return (
        <header
            data-slot='header'
            className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
            {...props}
        />
    );
};

const DialogTitle = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>): JSX.Element => {
    return (
        <DialogPrimitive.Title
            data-slot='title'
            className={cn('text-lg leading-none font-semibold tracking-tight', className)}
            {...props}
        />
    );
};

const DialogDescription = ({
    className,
    ...props
}: ComponentProps<typeof DialogPrimitive.Description>): JSX.Element => {
    return (
        <DialogPrimitive.Description
            data-slot='description'
            className={cn('text-muted-foreground text-sm', className)}
            {...props}
        />
    );
};

interface DialogRenderProps {
    isOpen: boolean;
    onClose: () => void;
    renderHeader?: (props: { title?: string; description?: string }) => ReactNode;
    renderCloseButton?: (props: {}) => ReactNode;
}

interface DialogWindowProps {
    children: (props: DialogRenderProps) => ReactNode;
    trigger: ReactNode;
}

const DialogCloseButton = (): JSX.Element => (
    <DialogClose
        data-slot='close'
        className={cn(
            'ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none'
        )}
    >
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
    </DialogClose>
);

export const DialogWindow: FC<DialogWindowProps> = ({ children, trigger }) => {
    const { isOpen, openDialog, closeDialog } = useDialogContext();

    const renderProps: DialogRenderProps = {
        isOpen,
        onClose: closeDialog,
        renderHeader: ({ title, description }) =>
            title || description ? (
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
            ) : null,
        renderCloseButton: () => DialogCloseButton(),
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => (open ? openDialog() : closeDialog())} modal>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>{children(renderProps)}</DialogContent>
        </Dialog>
    );
};
