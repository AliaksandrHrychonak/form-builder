'use client';

import { useMultiStepFormContext, FormFieldProvider } from '@shared/lib';
import { Form, FormControl, FormItem, FormLabel, FormMessage, Input, Button } from '@shared/ui';

import type { JSX } from 'react';

export const PasswordStep = (): JSX.Element => {
    const { form, nextStep, prevStep, isStepValid } = useMultiStepFormContext();
    return (
        <Form {...form}>
            <div className='flex flex-col gap-4'>
                <FormFieldProvider
                    name='passwordInfo.password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' autoComplete='new-password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormFieldProvider
                    name='passwordInfo.confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input type='password' autoComplete='off' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className='flex justify-end'>
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
