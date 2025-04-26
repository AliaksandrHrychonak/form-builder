'use client';

import { Children } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
    DropdownMenuTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    Avatar,
    AvatarFallback,
    Button,
    AvatarImage,
} from '@shared/ui';

import type { IViewerProfile } from '@shared/api';
import type { FC, JSX, ReactNode } from 'react';

interface IViewerBarProps {
    profileViewer: IViewerProfile | undefined;
    children?: ReactNode;
}

export const ViewerBar: FC<IViewerBarProps> = ({ profileViewer, children }): JSX.Element => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className='px-0 w-9'>
                    <Avatar className='h-full w-full rounded-lg grayscale'>
                        <AvatarImage
                            src={profileViewer?.photo?.completedUrl}
                            alt={`${profileViewer?.firstName} ${profileViewer?.lastName}`}
                        />
                        <AvatarFallback className='rounded-lg uppercase'>{profileViewer?.firstName[0]}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}
            >
                <DropdownMenuLabel className='p-0 font-normal'>
                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                        <Avatar className='h-8 w-8 rounded-lg grayscale'>
                            <AvatarImage
                                src={profileViewer?.photo?.completedUrl}
                                alt={`${profileViewer?.firstName} ${profileViewer?.lastName}`}
                            />
                            <AvatarFallback className='rounded-lg uppercase'>
                                {profileViewer?.firstName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className='grid flex-1 text-left text-sm leading-tight'>
                            <span className='truncate font-medium max-w-52'>{`${profileViewer?.firstName} ${profileViewer?.lastName}`}</span>
                            <span className='text-xs text-muted-foreground truncate max-w-52'>
                                {profileViewer?.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Children.map(children, (child) => (
                    <DropdownMenuItem key={uuidv4()} asChild>
                        {child}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
