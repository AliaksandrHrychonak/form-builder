'use client';

import { useMultiStepFormContext } from '@shared/lib';
import { Button } from '@shared/ui';

import type { RegisterFormSchema } from '../../../model';
import type { JSX } from 'react';

export const ReviewStep = (): JSX.Element => {
    const { prevStep, form, isValid } = useMultiStepFormContext<typeof RegisterFormSchema>();
    const values = form.getValues();

    return (
        <div className='flex flex-col space-y-4'>
            <dl className='flex flex-col space-y-2 text-sm'>
                <div className='flex items-center gap-x-2'>
                    <dt>First Name</dt>
                    <dd>{values.profileInfo.firstName}</dd>
                </div>
                <div className='flex items-center gap-x-2'>
                    <dt>Last Name</dt>
                    <dd>{values.profileInfo.lastName}</dd>
                </div>
                <div className='flex items-center gap-x-2'>
                    <dt>Email</dt>
                    <dd>{values.contactInfo.email}</dd>
                </div>
            </dl>
            <footer className='flex justify-end space-x-2'>
                <Button type='button' variant='outline' onClick={prevStep}>
                    Back
                </Button>
                <Button type='submit' autoFocus disabled={!isValid}>
                    {form.formState.isSubmitting ? 'Creating...' : 'Create User'}
                </Button>
            </footer>
        </div>
    );
};
