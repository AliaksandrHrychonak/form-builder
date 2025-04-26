'use client';

import { useMultiStepFormContext, FormFieldProvider } from '@shared/lib';
import { Form, FormControl, FormItem, FormLabel, FormMessage, Input, Button } from '@shared/ui';

import type { JSX } from 'react';

export const ContactStep = (): JSX.Element => {
    const { form, nextStep, isStepValid } = useMultiStepFormContext();
    return (
        <Form {...form}>
            <div className='flex flex-col gap-4'>
                <FormFieldProvider
                    name='contactInfo.email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder='example@mail.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className='flex justify-end'>
                    <Button type='button' onClick={nextStep} disabled={!isStepValid()}>
                        Next
                    </Button>
                </footer>
            </div>
        </Form>
    );
};
