import { LanguagesIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { languages } from '@shared/config';
import { useClientTranslation } from '@shared/lib';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, LinkBase } from '@shared/ui';

import { getLocaleKey } from '../../lib';

import type { ComponentProps, FC, JSX } from 'react';

interface LanguageSwitcherProps extends ComponentProps<typeof DropdownMenu> {}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ ...props }): JSX.Element => {
    const { t, i18n } = useClientTranslation('language');
    const pathname = usePathname();

    const pathnameWithoutLocale = pathname?.split('/').slice(2).join('/') ?? '';
    const currentLanguage = i18n.resolvedLanguage;

    return (
        <DropdownMenu {...props}>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                    <LanguagesIcon className='size-[1.2rem] rotate-0 scale-100 transition-all' />
                    <span className='sr-only'>{t('buttons.toggle')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {languages
                    .filter((locale) => locale !== currentLanguage)
                    .map((locale) => (
                        <DropdownMenuItem key={locale}>
                            <LinkBase lng={locale} href={pathnameWithoutLocale} className='w-full'>
                                {t(getLocaleKey(locale))}
                            </LinkBase>
                        </DropdownMenuItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
