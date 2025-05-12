'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Config } from '@shared/config';
import { FormFieldProvider, useClientTranslation } from '@shared/lib';
import {
    Button,
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
} from '@shared/ui';

import {
    createDefaultValuesSupportTicketForm,
    supportTicketFormSchema,
    useCreateSupportTicketFormController,
} from '../model';

import type { SupportTicketFormData } from '../model';
import type { FC } from 'react';

const { SUPPORT } = Config;

interface ISupportTicketFormProps {
    onComplete?: () => void;
}

export const SUPPORT_PRIORITY_TRANSLATIONS = ['priorities.high', 'priorities.average', 'priorities.low'] as const;
export type SupportTranslationKeys = (typeof SUPPORT_PRIORITY_TRANSLATIONS)[number];

export const CreateSupportTicketForm: FC<ISupportTicketFormProps> = ({ onComplete }) => {
    const { t } = useClientTranslation('support');
    const form = useForm<SupportTicketFormData>({
        resolver: zodResolver(supportTicketFormSchema),
        defaultValues: createDefaultValuesSupportTicketForm(),
        mode: 'onChange',
    });

    const {
        formState: { isValid },
    } = form;

    const { handleSubmit } = useCreateSupportTicketFormController({
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
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('fields.description')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t('placeholders.description')}
                                    className='min-h-[120px]'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormFieldProvider
                    control={form.control}
                    name='priority'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('fields.priority')}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('placeholders.selectPriority')} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {SUPPORT.DEFAULT_PRIORITY.map((priority) => (
                                        <SelectItem key={priority} value={priority}>
                                            {t(`priorities.${priority.toLowerCase()}` as SupportTranslationKeys)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' disabled={!canSubmit}>
                    {t('buttons.submitTicket')}
                </Button>
            </form>
        </Form>
    );
};
