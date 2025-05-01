'use client';

import chroma from 'chroma-js';
import { Check, SettingsIcon, X } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { useGetTemplateTagListQuery, useSearchTemplateTagStore } from '@entities/template-tag';
import { cn, FormFieldProvider, useClientTranslation } from '@shared/lib';
import {
    Badge,
    Button,
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    FormControl,
    FormItem,
    FormMessage,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Skeleton,
} from '@shared/ui';

import type { ENUM_POLICY_ROLE_TYPE, IRoleBasedSearchTemplateFilters, ITemplateTag } from '@shared/api';
import type { JSX, ReactNode } from 'react';
import type { Control, FieldPath } from 'react-hook-form';

interface ITemplateSearchTagsFilter<TRole extends ENUM_POLICY_ROLE_TYPE> {
    control: Control<IRoleBasedSearchTemplateFilters<TRole>>;
    role: ENUM_POLICY_ROLE_TYPE;
    children: ReactNode;
    isLoading?: boolean;
}

export const TemplateSearchTagsFilter = <TRole extends ENUM_POLICY_ROLE_TYPE>({
    control,
    role,
    children,
    isLoading,
}: ITemplateSearchTagsFilter<TRole>): JSX.Element => {
    const { t } = useClientTranslation('search');
    const storeTagSearch = useSearchTemplateTagStore(role);
    const [isOpenSearchTagCommand, setIsOpenSearchTagCommand] = useState<boolean>(false);
    const { setFilters } = storeTagSearch;

    const filtersTag = useMemo(() => storeTagSearch.filters, [storeTagSearch]);

    const debouncedSearch = useDebouncedCallback((value: string) => {
        setFilters({ ...filtersTag, search: value, page: 1 });
    }, 300);

    const selectedTags = useWatch({
        control,
        name: 'tags' as FieldPath<IRoleBasedSearchTemplateFilters<TRole>>,
    }) as ITemplateTag[];

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        isLoading: isLoadingTagList,
    } = useGetTemplateTagListQuery(role);

    const allTags: ITemplateTag[] = data?.pages?.flatMap((page) => page.data) ?? [];

    const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
        const scrollContainer = event.target as HTMLDivElement;
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

        if (scrollHeight - scrollTop - clientHeight <= 20) {
            if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }
    };

    const formTags = useWatch({
        control,
        name: 'tags' as FieldPath<IRoleBasedSearchTemplateFilters<TRole>>,
    }) as Array<ITemplateTag>;

    const getTextColor = (bgColor: string): string => {
        try {
            const color = chroma(bgColor);
            return color.luminance() > 0.5 ? 'black' : 'white';
        } catch {
            return 'black';
        }
    };

    return (
        <FormFieldProvider
            control={control}
            name={'tags' as FieldPath<IRoleBasedSearchTemplateFilters<TRole>>}
            render={({ field: { onChange } }) => {
                const handleTagChange = (newTags: ITemplateTag[]): void => {
                    onChange(newTags, { shouldDirty: true, shouldTouch: true });
                };
                return (
                    <FormItem className='flex flex-wrap gap-2 mx-[50px] w-[calc(100%-100px)] py-1'>
                        {isLoading && (
                            <>
                                <Skeleton className='h-9 w-30' />
                                <Skeleton className='h-9 w-32' />
                            </>
                        )}
                        {children}
                        {formTags.length > 0 && (
                            <>
                                {formTags.map((tag) => (
                                    <Badge
                                        key={tag._id}
                                        variant='outline'
                                        style={{
                                            backgroundColor: tag.color,
                                            color: getTextColor(tag.color ?? 'black'),
                                        }}
                                        className='flex items-center gap-1 h-9'
                                    >
                                        {tag.name}
                                        <Button
                                            variant='ghost'
                                            className='h-auto p-0 hover:bg-transparent'
                                            onClick={() => {
                                                handleTagChange(selectedTags.filter((item) => item._id !== tag._id));
                                            }}
                                        >
                                            <X className='h-3 w-3' />
                                        </Button>
                                    </Badge>
                                ))}
                            </>
                        )}
                        <FormControl>
                            <Popover open={isOpenSearchTagCommand} onOpenChange={setIsOpenSearchTagCommand}>
                                <PopoverTrigger asChild>
                                    <Button variant='outline' className='w-9 justify-center px-0' role='combobox'>
                                        <SettingsIcon className='h-4 w-4' />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-[400px] p-0' align='start'>
                                    <Command className='overflow-hidden'>
                                        <CommandInput
                                            placeholder={t('fields.tags.placeholder')}
                                            onValueChange={debouncedSearch}
                                        />
                                        <div className='h-[200px] overflow-auto' onScroll={handleScroll}>
                                            <CommandGroup>
                                                {allTags.length === 0 && !isError && !isLoadingTagList && (
                                                    <CommandItem
                                                        disabled
                                                        className='text-muted-foreground justify-center py-6'
                                                    >
                                                        {t('fields.search.noResults')}
                                                    </CommandItem>
                                                )}

                                                {isError && (
                                                    <div className='flex flex-col items-center justify-center py-6 gap-2'>
                                                        <p className='text-destructive'>{t('fields.search.error')}</p>
                                                        <p className='text-muted-foreground text-sm'>
                                                            {t('fields.search.tryAgain')}
                                                        </p>
                                                    </div>
                                                )}

                                                {allTags.map((tag) => (
                                                    <CommandItem
                                                        key={tag._id}
                                                        onSelect={() => {
                                                            const isSelected = selectedTags?.some(
                                                                (t) => t._id === tag._id
                                                            );
                                                            const newTags = isSelected
                                                                ? selectedTags.filter((t) => t._id !== tag._id)
                                                                : [...(selectedTags || []), tag];
                                                            handleTagChange(newTags);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                'mr-2 h-4 w-4',
                                                                selectedTags?.some((t) => t._id === tag._id)
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />
                                                        {tag.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                            {isFetchingNextPage && (
                                                <div className='p-4'>
                                                    <Skeleton className='h-4 w-full' />
                                                </div>
                                            )}
                                        </div>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};
