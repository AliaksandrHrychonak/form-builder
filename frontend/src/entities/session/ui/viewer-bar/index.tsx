'use client';

import { Children } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@shared/ui';

import type { IViewerProfile } from '@shared/api';
import type { ComponentProps, FC, JSX, ReactNode } from 'react';

interface IViewerBarProps extends ComponentProps<typeof DropdownMenu> {
    profileViewer: IViewerProfile | undefined;
    children?: ReactNode;
}

export const ViewerBar: FC<IViewerBarProps> = ({ profileViewer, children, ...props }): JSX.Element => {
    return (
        <DropdownMenu {...props}>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className='p-1'>
                    <span className='flex gap-0.5'>
                        <Avatar className='h-7 w-7 rounded-lg grayscale'>
                            <AvatarImage
                                src={profileViewer?.photo?.completedUrl}
                                alt={`${profileViewer?.firstName} ${profileViewer?.lastName}`}
                            />
                            <AvatarFallback className='rounded-lg bg-muted uppercase'>
                                {profileViewer?.firstName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <span className='flex flex-col items-start justify-center'>
                            <span className='text-xs truncate font-medium max-w-25 leading-none'>{`${profileViewer?.firstName} ${profileViewer?.lastName}`}</span>
                            <span className='text-xs text-muted-foreground truncate max-w-25 leading-none'>
                                {profileViewer?.email}
                            </span>
                        </span>
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}
            >
                {/*TODO map account user list*/}
                <DropdownMenuLabel className='p-0 font-normal'>
                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                        <Avatar className='h-4 w-4 rounded-lg grayscale'>
                            <AvatarImage
                                src={profileViewer?.photo?.completedUrl}
                                alt={`${profileViewer?.firstName} ${profileViewer?.lastName}`}
                            />
                            <AvatarFallback className='rounded-lg uppercase'>
                                {profileViewer?.firstName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <span className='truncate font-medium max-w-52'>{`${profileViewer?.firstName}`}</span>
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
