'use client';

import { FormFieldProvider, useClientTranslation, useMultiStepFormContext } from '@shared/lib';
import { Button, Form, FormControl, FormItem, FormLabel, FormMessage, Input } from '@shared/ui';

import type { JSX } from 'react';

export const ProfileStep = (): JSX.Element => {
    const { form, nextStep, isStepValid, prevStep } = useMultiStepFormContext();
    const { t } = useClientTranslation('auth');
    return (
        <Form {...form}>
            <div className='flex flex-col gap-4'>
                <FormFieldProvider
                    name='profileInfo.firstName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('fields.firstName')}</FormLabel>
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
                            <FormLabel>{t('fields.lastName')}</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} />
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
