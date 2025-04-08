import { cn } from '../../lib';

import type { HTMLAttributes, JSX } from 'react';

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => {
    return <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />;
};

export { Skeleton };
