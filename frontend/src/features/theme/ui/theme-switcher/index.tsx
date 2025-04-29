'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';


import { themeOptions } from '@shared/config';
import { useClientTranslation } from '@shared/lib';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shared/ui';

import type { ComponentProps, FC, JSX } from 'react';


interface ThemeSwitcherProps extends ComponentProps<typeof DropdownMenu> {}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (): JSX.Element => {
    const { setTheme } = useTheme();
    const { t } = useClientTranslation('theme');
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                    <Sun className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                    <Moon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                    <span className='sr-only'>{t('buttons.toggle')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {themeOptions.map((option) => (
                    <DropdownMenuItem key={option.value} onClick={() => setTheme(option.value)}>
                        {t(`options.${option.label}`)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
