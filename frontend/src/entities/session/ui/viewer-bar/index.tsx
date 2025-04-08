'use client';

import { LogOutIcon, MoreVerticalIcon } from 'lucide-react';

import {
    DropdownMenuTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Skeleton,
} from '@shared/ui';

import { useSessionStore } from '../../model';

import type { FC, JSX } from 'react';

interface IViewerBarProps {}

export const ViewerBar: FC<IViewerBarProps> = (): JSX.Element => {
    const viewer = useSessionStore((state) => state.user);
    const { isMobile } = useSidebar();

    if (!viewer) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size='lg'>
                        <div className='flex items-center w-full gap-2'>
                            <Skeleton className='h-8 w-8 rounded-lg' />
                            <div className='grid flex-1 gap-1'>
                                <Skeleton className='h-4 w-32' />
                                <Skeleton className='h-3 w-24' />
                            </div>
                            <Skeleton className='h-4 w-4 ml-auto' />
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    const { username, id, avatar } = viewer;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                        >
                            <Avatar className='h-8 w-8 rounded-lg grayscale'>
                                <AvatarImage src={viewer.avatar} alt={viewer.username} />
                                <AvatarFallback className='rounded-lg uppercase'>{viewer.username[0]}</AvatarFallback>
                            </Avatar>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-medium max-w-52'>{username}</span>
                                <span className='text-xs text-muted-foreground truncate max-w-52'>{id}</span>
                            </div>
                            <MoreVerticalIcon className='ml-auto size-4' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                        side={isMobile ? 'bottom' : 'right'}
                        align='end'
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className='p-0 font-normal'>
                            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                <Avatar className='h-8 w-8 rounded-lg grayscale'>
                                    <AvatarImage src={avatar} alt={username} />
                                    <AvatarFallback className='rounded-lg uppercase'>{username[0]}</AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-medium'>{username}</span>
                                    <span className='truncate text-xs text-muted-foreground'>{id}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOutIcon />
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};
