'use client';

import { BadgeHelpIcon } from 'lucide-react';
import React from 'react';

import { CreateSupportTicketForm } from '@features/support';
import { useClientTranslation } from '@shared/lib';
import { Button, DialogWindow } from '@shared/ui';

import type { JSX } from 'react';

export const SupportButton = (): JSX.Element => {
    const { t } = useClientTranslation('support');
    return (
        <>
            <DialogWindow
                trigger={
                    <Button variant='ghost' className='fixed bottom-4 right-4 p-3'>
                        <BadgeHelpIcon className='w-8 h-8' />
                    </Button>
                }
            >
                {({ renderHeader, renderCloseButton, onClose }) => {
                    return (
                        <>
                            {renderHeader?.({
                                title: t('ticket.createTitle'),
                                description: t('ticket.createDescription'),
                            })}
                            <CreateSupportTicketForm onComplete={() => onClose()} />
                            {renderCloseButton?.({})}
                        </>
                    );
                }}
            </DialogWindow>
        </>
    );
};
