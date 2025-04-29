'use client';

import { FormFieldProvider, useClientTranslation, useMultiStepFormContext } from '@shared/lib';
import { Button, Form, FormControl, FormItem, FormLabel, FormMessage, Input } from '@shared/ui';

import type { JSX } from 'react';

export const ContactStep = (): JSX.Element => {
    const { t } = useClientTranslation('auth');
    const { form, nextStep, isStepValid } = useMultiStepFormContext();
    return (
        <Form {...form}>
            <div className='flex flex-col gap-4'>
                <FormFieldProvider
                    name='contactInfo.email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('fields.email')}</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder='example@mail.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className='flex justify-end'>
                    <Button type='button' onClick={nextStep} disabled={!isStepValid()}>
                        {t('buttons.next')}
                    </Button>
                </footer>
            </div>
        </Form>
    );
};
