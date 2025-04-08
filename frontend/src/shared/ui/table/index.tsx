import { cn } from '../../lib';

import type { ComponentProps, JSX } from 'react';

type TableProps = ComponentProps<'table'>;
export const Table = ({ className, ...props }: TableProps): JSX.Element => (
    <table
        data-slot='table'
        className={cn('relative w-full caption-bottom overflow-auto text-sm', className)}
        {...props}
    />
);

type TableHeaderProps = ComponentProps<'thead'>;
export const TableHeader = ({ className, ...props }: TableHeaderProps): JSX.Element => (
    <thead data-slot='header' className={cn('[&_tr]:border-b', className)} {...props} />
);

type TableBodyProps = ComponentProps<'tbody'>;
export const TableBody = ({ className, ...props }: TableBodyProps): JSX.Element => (
    <tbody data-slot='body' className={cn('[&_tr:last-child]:border-0', className)} {...props} />
);

type TableFooterProps = ComponentProps<'tfoot'>;
export const TableFooter = ({ className, ...props }: TableFooterProps): JSX.Element => (
    <tfoot
        data-slot='footer'
        className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
        {...props}
    />
);

type TableRowProps = ComponentProps<'tr'>;
export const TableRow = ({ className, ...props }: TableRowProps): JSX.Element => (
    <tr
        data-slot='row'
        className={cn('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', className)}
        {...props}
    />
);

type TableHeadProps = ComponentProps<'th'>;
export const TableHead = ({ className, ...props }: TableHeadProps): JSX.Element => (
    <th
        data-slot='head'
        className={cn(
            'text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
            className
        )}
        {...props}
    />
);

type TableCellProps = ComponentProps<'td'>;
export const TableCell = ({ className, ...props }: TableCellProps): JSX.Element => (
    <td
        data-slot='cell'
        className={cn(
            'truncate p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
            className
        )}
        {...props}
    />
);

type TableCaptionProps = ComponentProps<'caption'>;
export const TableCaption = ({ className, ...props }: TableCaptionProps): JSX.Element => (
    <caption data-slot='caption' className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />
);
