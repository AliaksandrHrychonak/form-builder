import { cn } from '../../lib';

import type { ComponentProps, JSX } from 'react';

type CardProps = ComponentProps<'article'>;

const Card = ({ className, ...props }: CardProps): JSX.Element => (
    <article
        data-slot='card'
        className={cn('rounded-xl border bg-card text-card-foreground shadow', className)}
        {...props}
    />
);

type CardHeaderProps = ComponentProps<'header'>;

const CardHeader = ({ className, ...props }: CardHeaderProps): JSX.Element => (
    <header data-slot='header' className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

type CardTitleProps = ComponentProps<'div'>;

const CardTitle = ({ className, ...props }: CardTitleProps): JSX.Element => (
    <div data-slot='title' className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
);

type CardDescriptionProps = ComponentProps<'div'>;

const CardDescription = ({ className, ...props }: CardDescriptionProps): JSX.Element => (
    <div data-slot='description' className={cn('text-sm text-muted-foreground', className)} {...props} />
);

type CardContentProps = ComponentProps<'div'>;

const CardContent = ({ className, ...props }: CardContentProps): JSX.Element => (
    <div data-slot='content' className={cn('p-6 pt-0', className)} {...props} />
);

type CardFooterProps = ComponentProps<'div'>;

const CardFooter = ({ className, ...props }: CardFooterProps): JSX.Element => (
    <div data-slot='footer' className={cn('flex items-center p-6 pt-0', className)} {...props} />
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
