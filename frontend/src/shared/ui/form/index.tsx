'use client';

import { Slot } from '@radix-ui/react-slot';
import { useId } from 'react';
import { FormProvider } from 'react-hook-form';

import { cn, FormItemContext, useFormField } from '../../lib';
import { Label } from '../label';

import type * as LabelPrimitive from '@radix-ui/react-label';
import type { ComponentProps, JSX } from 'react';

const Form = FormProvider;

const FormItem = ({ className, ...props }: ComponentProps<'fieldset'>): JSX.Element => {
    const id = useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <fieldset data-slot='item' className={cn(className)} {...props} />
        </FormItemContext.Provider>
    );
};

const FormLabel = ({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>): JSX.Element => {
    const { error, formItemId } = useFormField();

    return (
        <Label
            data-slot='label'
            className={cn(error && 'text-destructive', className)}
            htmlFor={formItemId}
            {...props}
        />
    );
};

const FormControl = ({ ...props }: ComponentProps<typeof Slot>): JSX.Element => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
        <Slot
            data-slot='control'
            id={formItemId}
            aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
            aria-invalid={!!error}
            {...props}
        />
    );
};

const FormDescription = ({ className, ...props }: ComponentProps<'p'>): JSX.Element => {
    const { formDescriptionId } = useFormField();

    return (
        <p
            data-slot='description'
            id={formDescriptionId}
            className={cn('text-muted-foreground text-[0.8rem]', className)}
            {...props}
        />
    );
};

const FormMessage = ({ className, children, ...props }: ComponentProps<'p'>): JSX.Element => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    return (
        <div className='relative'>
            {body && (
                <p
                    data-slot='message'
                    id={formMessageId}
                    className={cn('absolute top-[-4] text-destructive text-[0.8rem] font-medium', className)}
                    {...props}
                >
                    {body}
                </p>
            )}
        </div>
    );
};

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage };
