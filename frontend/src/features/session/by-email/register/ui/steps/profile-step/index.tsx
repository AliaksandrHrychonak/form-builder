'use client';

import { useMultiStepFormContext, FormFieldProvider } from '@shared/lib';
import { Form, FormControl, FormItem, FormLabel, FormMessage, Input, Button } from '@shared/ui';

import type { JSX } from 'react';

export const ProfileStep = (): JSX.Element => {
    const { form, nextStep, isStepValid, prevStep } = useMultiStepFormContext();
    return (
        <Form {...form}>
            <div className='flex flex-col gap-4'>
                <FormFieldProvider
                    name='profileInfo.firstName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormFieldProvider
                    name='profileInfo.lastName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className='flex justify-end space-x-2'>
                    <Button type='button' variant='outline' onClick={prevStep}>
                        Back
                    </Button>
                    <Button type='button' onClick={nextStep} disabled={!isStepValid()}>
                        Next
                    </Button>
                </footer>
            </div>
        </Form>
    );
};
