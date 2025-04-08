'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormFieldProvider } from '@shared/lib';
import { Form, FormControl, FormItem, FormLabel, FormMessage, Input, Button } from '@shared/ui';

import { useAuthByUsernameFormController, createDefaultValues, AuthByUsernameFormSchema } from '../model';

import type { AuthByUsernameFormData } from '../model';
import type { FC } from 'react';

interface ILoginFormProps {
    onComplete?: () => void;
}

export const AuthByUsernameForm: FC<ILoginFormProps> = ({ onComplete }) => {
    const form = useForm<AuthByUsernameFormData>({
        resolver: zodResolver(AuthByUsernameFormSchema),
        defaultValues: createDefaultValues(),
        mode: 'onChange',
    });

    const {
        formState: { isValid },
    } = form;

    const { handleSubmit } = useAuthByUsernameFormController({
        onComplete: () => {
            onComplete?.();
            form.reset();
        },
    });

    const canSubmit = [isValid].every(Boolean);

    return (
        <Form {...form}>
            <form
                noValidate
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-full flex size-full flex-col overflow-hidden p-2 gap-0.5'
            >
                <FormFieldProvider
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='goodDingo845' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' disabled={!canSubmit}>
                    Join
                </Button>
            </form>
        </Form>
    );
};
