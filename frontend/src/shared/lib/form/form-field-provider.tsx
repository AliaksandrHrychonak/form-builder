'use client';

import { useFormContext, Controller } from 'react-hook-form';

import { FormFieldContext } from './form-context';

import type { JSX } from 'react';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

export const FormFieldProvider = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
}: ControllerProps<TFieldValues, TName>): JSX.Element => {
    const formContext = useFormContext();
    if (!formContext || !formContext.control) {
        throw new Error('FormField must be used within a Form component');
    }
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};
