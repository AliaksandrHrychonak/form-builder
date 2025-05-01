'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Config } from '@shared/config';
import { FormFieldProvider, useClientTranslation } from '@shared/lib';
import { Button, Form, FormControl, FormItem, FormLabel, FormMessage, Input, LinkClient } from '@shared/ui';

import { createDefaultValuesLogin, LoginFormSchema, useLoginFormController } from '../model';

import type { LoginFormData } from '../model';
import type { FC } from 'react';

const { APP_ROUTES } = Config;

interface ILoginFormProps {
    onComplete?: () => void;
}

export const LoginForm: FC<ILoginFormProps> = ({ onComplete }) => {
    const { t } = useClientTranslation('auth');
    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: createDefaultValuesLogin(),
        mode: 'onChange',
    });

    const {
        formState: { isValid },
    } = form;

    const { handleSubmit } = useLoginFormController({
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
                className='w-full flex size-full flex-col overflow-hidden p-2 gap-6'
            >
                <FormFieldProvider
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('fields.email')}</FormLabel>
                            <FormControl>
                                <Input placeholder='example@mail.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormFieldProvider
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <div className='w-full flex justify-between items-center'>
                                <FormLabel className=''>{t('fields.password')}</FormLabel>
                                {/*TODO add forgotPassword page */}
                                <LinkClient
                                    href={APP_ROUTES.FORGOT_PASSWORD}
                                    className='ml-auto text-sm underline-offset-4 hover:underline'
                                >
                                    {t('helpers.forgotPassword')}
                                </LinkClient>
                            </div>
                            <FormControl>
                                <Input placeholder='*' type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' disabled={!canSubmit}>
                    {t('buttons.submitSignIn')}
                </Button>
            </form>
        </Form>
    );
};
