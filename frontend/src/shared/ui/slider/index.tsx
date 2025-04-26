'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '../../lib';

import type { ComponentProps, JSX } from 'react';

interface SliderProps
    extends Omit<ComponentProps<typeof SliderPrimitive.Root>, 'value' | 'defaultValue' | 'onValueChange' | 'onChange'> {
    className?: string;
    value?: number;
    onChange?: (value: number) => void;
}

export const Slider = ({
    className,
    value = 0,
    onChange,
    min = 0,
    max = 10,
    step = 0.1,
    ...props
}: SliderProps): JSX.Element => {
    const marks = [];
    for (let i = min; i <= max; i += 1) {
        marks.push(i);
    }

    return (
        <div className='w-full'>
            <SliderPrimitive.Root
                data-slot='root'
                className={cn('relative flex w-full touch-none select-none items-center h-[36px]', className)}
                value={[value]}
                onValueChange={(values) => onChange?.(values[0] ?? 0)}
                min={min}
                max={max}
                step={step}
                {...props}
            >
                <SliderPrimitive.Track
                    data-slot='track'
                    className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20'
                >
                    <SliderPrimitive.Range data-slot='range' className='absolute h-full bg-primary' />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                    data-slot='thumb'
                    className='block h-5 w-[30px] rounded-md border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative'
                >
                    <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs'>
                        {Number(value)}
                    </span>
                </SliderPrimitive.Thumb>
            </SliderPrimitive.Root>
            <div className='relative -top-1.5 w-[calc(100%-30px)] mx-auto'>
                {marks.map((mark) => (
                    <div
                        key={mark}
                        className='absolute transform -translate-x-1/2'
                        style={{
                            left: `${((mark - min) / (max - min)) * 100}%`,
                        }}
                    >
                        <div className='h-1 w-[1px] bg-gray-300 mb-1' />
                    </div>
                ))}
            </div>
        </div>
    );
};
