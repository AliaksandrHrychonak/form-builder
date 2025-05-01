import { format } from 'date-fns';
import { FileText, Lock, Star, UserCircle2, Users } from 'lucide-react';

import { getLuminanceColor } from '@shared/lib';
import {
    Badge,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@shared/ui';

import type { ISearchTemplate } from '@shared/api';
import type { ComponentProps, JSX } from 'react';

interface TemplateCardProps extends ISearchTemplate {}

export const TemplateCard = ({
    _id,
    title,
    description,
    topics,
    isPublic,
    owner,
    tags,
    popularityScore,
    createdAt,
    sharedUsers,
}: TemplateCardProps): JSX.Element => {
    return (
        <div data-href={`/templates/${_id}`}>
            <Card className='h-full hover:shadow-md transition-shadow'>
                <CardHeader className='space-y-2'>
                    <div className='flex items-start justify-between'>
                        <h3 className='font-semibold text-lg line-clamp-2'>{title}</h3>
                        {!isPublic && <Lock className='h-4 w-4 text-muted-foreground flex-shrink-0' />}
                    </div>
                    <div className='flex gap-2 flex-wrap'>
                        <Badge variant='outline'>{topics}</Badge>
                        {tags.map((tag) => (
                            <Badge
                                key={tag._id}
                                style={{
                                    backgroundColor: tag.color,
                                    color: getLuminanceColor(tag.color),
                                }}
                            >
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                </CardHeader>

                <CardContent className='space-y-2'>
                    <p className='text-sm text-muted-foreground line-clamp-2'>{description}</p>

                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className='flex items-center gap-1'>
                                    <UserCircle2 className='h-4 w-4' />
                                    <span>{`${owner.firstName} ${owner.lastName}`}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{owner.email}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        {sharedUsers.length > 0 && (
                            <Tooltip>
                                <TooltipTrigger className='flex items-center gap-1'>
                                    <Users className='h-4 w-4' />
                                    <span>{sharedUsers.length}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div className='space-y-1'>
                                        {sharedUsers.map((user) => (
                                            <p key={user._id}>{`${user.firstName} ${user.lastName}`}</p>
                                        ))}
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </CardContent>

                <CardFooter className='flex justify-between text-sm text-muted-foreground'>
                    <div className='flex items-center gap-2'>
                        <FileText className='h-4 w-4' />
                        <span>{format(new Date(createdAt), 'MMM d, yyyy')}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                        <span>{popularityScore.toFixed(1)}</span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export const TemplateCardSkeleton = ({ ...props }: ComponentProps<'div'>): JSX.Element => {
    return (
        <div className='p-4 border rounded-lg animate-pulse' {...props}>
            <div className='space-y-2 mb-4'>
                <div className='flex justify-between items-start gap-2'>
                    <div className='h-5 bg-gray-200 rounded w-3/4' />
                    <div className='h-4 w-4 bg-gray-200 rounded-full flex-shrink-0' />
                </div>

                <div className='flex flex-wrap gap-1.5'>
                    <div className='h-5 bg-gray-200 rounded w-20' />
                    <div className='h-5 bg-gray-200 rounded w-16' />
                    <div className='h-5 bg-gray-200 rounded w-24' />
                </div>
            </div>

            <div className='space-y-3 mb-4'>
                <div className='space-y-1'>
                    <div className='h-4 bg-gray-200 rounded w-full' />
                    <div className='h-4 bg-gray-200 rounded w-2/3' />
                </div>

                <div className='flex items-center gap-2'>
                    <div className='h-4 bg-gray-200 rounded w-32' />
                    <div className='h-4 bg-gray-200 rounded w-8' />
                </div>
            </div>

            <div className='flex justify-between items-center pt-2'>
                <div className='flex items-center gap-1.5'>
                    <div className='h-4 w-4 bg-gray-200 rounded' />
                    <div className='h-4 bg-gray-200 rounded w-24' />
                </div>
                <div className='flex items-center gap-1'>
                    <div className='h-4 w-4 bg-gray-200 rounded' />
                    <div className='h-4 bg-gray-200 rounded w-8' />
                </div>
            </div>
        </div>
    );
};
