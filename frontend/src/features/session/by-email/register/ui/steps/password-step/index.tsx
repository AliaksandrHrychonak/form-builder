'use client';

import { FormFieldProvider, useClientTranslation, useMultiStepFormContext } from '@shared/lib';
import { Button, Form, FormControl, FormItem, FormLabel, FormMessage, Input } from '@shared/ui';

import type { JSX } from 'react';

export const PasswordStep = (): JSX.Element => {
    const { form, nextStep, prevStep, isStepValid } = useMultiStepFormContext();
    const { t } = useClientTranslation('auth');
    return (
        <Form {...form}>
            <div className='flex flex-col gap-4'>
                <FormFieldProvider
                    name='passwordInfo.password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('fields.password')}</FormLabel>
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
                            <FormLabel>{t('fields.confirmPassword')}</FormLabel>
                            <FormControl>
                                <Input type='password' autoComplete='off' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className='flex justify-end space-x-2'>
                    <Button type='button' variant='outline' onClick={prevStep}>
                        {t('buttons.back')}
                    </Button>
                    <Button type='button' onClick={nextStep} disabled={!isStepValid()}>
                        {t('buttons.next')}
                    </Button>
                </footer>
            </div>
        </Form>
    );
};
