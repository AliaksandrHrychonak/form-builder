'use client';

import { useClientTranslation, useMultiStepFormContext } from '@shared/lib';
import { Button } from '@shared/ui';

import type { RegisterFormSchema } from '../../../model';
import type { JSX } from 'react';

export const ReviewStep = (): JSX.Element => {
    const { prevStep, form, isValid } = useMultiStepFormContext<typeof RegisterFormSchema>();
    const values = form.getValues();
    const { t } = useClientTranslation('auth');
    return (
        <div className='flex flex-col space-y-4'>
            <dl className='flex flex-col space-y-2 text-sm'>
                <div className='flex items-center gap-x-2'>
                    <dt className='font-medium'>{t('fields.firstName')}:</dt>
                    <dd>{values.profileInfo.firstName}</dd>
                </div>
                <div className='flex items-center gap-x-2'>
                    <dt className='font-medium'>{t('fields.lastName')}:</dt>
                    <dd>{values.profileInfo.lastName}</dd>
                </div>
                <div className='flex items-center gap-x-2'>
                    <dt className='font-medium'>{t('fields.email')}:</dt>
                    <dd>{values.contactInfo.email}</dd>
                </div>
            </dl>
            <footer className='flex justify-end space-x-2'>
                <Button type='button' variant='outline' onClick={prevStep}>
                    {t('buttons.back')}
                </Button>
                <Button type='submit' autoFocus disabled={!isValid}>
                    {/*TODO loading bug*/}
                    {form.formState.isSubmitting ? t('buttons.submitSignUpLoading') : t('buttons.submitSignUp')}
                </Button>
            </footer>
        </div>
    );
};
