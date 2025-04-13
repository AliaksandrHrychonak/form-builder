'use client';

import { Slot, Slottable } from '@radix-ui/react-slot';
import { useMemo, useState, useEffect, useRef, Children, isValidElement } from 'react';

import { useMultiStepForm, MultiStepFormContext, cn } from '../../lib';

import type { JSX, ComponentProps, PropsWithChildren, HTMLProps, ReactElement } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

interface MultiStepFormProps<T extends z.ZodType> {
    schema: T;
    form: UseFormReturn<z.infer<T>>;
    onSubmit: (data: z.infer<T>) => void;
    useStepTransition?: boolean;
    className?: string;
}

type StepProps = PropsWithChildren<
    {
        name: string;
        asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
>;

export const MultiStepFormProvider = <T extends z.ZodType>({
    schema,
    form,
    onSubmit,
    children,
    className,
}: PropsWithChildren<MultiStepFormProps<T>>): JSX.Element => {
    const steps = useMemo(
        () =>
            Children.toArray(children).filter(
                (child): child is ReactElement<StepProps> => isValidElement(child) && child.type === MultiStepFormStep
            ),
        [children]
    );

    const header = useMemo(() => {
        return Children.toArray(children).find((child) => isValidElement(child) && child.type === MultiStepFormHeader);
    }, [children]);

    const footer = useMemo(() => {
        return Children.toArray(children).find((child) => isValidElement(child) && child.type === MultiStepFormFooter);
    }, [children]);

    const stepNames = steps.map((step) => step.props.name);
    const multiStepForm = useMultiStepForm(schema, form, stepNames);

    return (
        <MultiStepFormContext.Provider value={multiStepForm}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(className, 'flex size-full flex-col overflow-hidden p-2')}
            >
                {header}
                <div className='relative transition-transform duration-500'>
                    {steps.map((step, index) => {
                        const isActive = index === multiStepForm.currentStepIndex;
                        const stepKey = `step-${step.props.name}-${index}`;
                        return (
                            <AnimatedStep
                                key={stepKey}
                                direction={multiStepForm.direction}
                                isActive={isActive}
                                index={index}
                                currentIndex={multiStepForm.currentStepIndex}
                            >
                                {step}
                            </AnimatedStep>
                        );
                    })}
                </div>
                {footer}
            </form>
        </MultiStepFormContext.Provider>
    );
};

export const MultiStepFormStep = ({
    children,
    asChild,
    ...props
}: ComponentProps<'div'> & {
    asChild?: boolean;
    name: string;
}): JSX.Element => {
    const Cmp = asChild ? Slot : 'div';
    return (
        <Cmp data-slot='step' {...props}>
            <Slottable>{children}</Slottable>
        </Cmp>
    );
};

export const MultiStepFormHeader = ({
    children,
    asChild,
    ...props
}: ComponentProps<'div'> & {
    asChild?: boolean;
}): JSX.Element => {
    const Cmp = asChild ? Slot : 'div';
    return (
        <Cmp data-slot='header' {...props}>
            <Slottable>{children}</Slottable>
        </Cmp>
    );
};

export const MultiStepFormFooter = ({
    children,
    asChild,
    ...props
}: ComponentProps<'div'> & {
    asChild?: boolean;
}): JSX.Element => {
    const Cmp = asChild ? Slot : 'div';
    return (
        <Cmp data-slot='footer' {...props}>
            <Slottable>{children}</Slottable>
        </Cmp>
    );
};

interface AnimatedStepProps {
    direction: 'forward' | 'backward' | undefined;
    isActive: boolean;
    index: number;
    currentIndex: number;
}

const AnimatedStep = ({
    isActive,
    direction,
    children,
    index,
    currentIndex,
}: PropsWithChildren<AnimatedStepProps>): JSX.Element | null => {
    const [shouldRender, setShouldRender] = useState(isActive);
    const stepRef = useRef<HTMLDivElement>(null);

    useEffect((): (() => void) | void => {
        if (isActive) {
            setShouldRender(true);
            return;
        }
        const timer: NodeJS.Timeout = setTimeout(() => setShouldRender(false), 300);
        return () => clearTimeout(timer);
    }, [isActive]);

    useEffect((): void => {
        if (isActive && stepRef.current) {
            const focusableElement = stepRef.current.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElement) {
                (focusableElement as HTMLElement).focus();
            }
        }
    }, [isActive]);

    if (!shouldRender) {
        return null;
    }

    const baseClasses =
        ' top-0 left-0 w-full h-full transition-all duration-300 ease-in-out animate-in fade-in zoom-in-95';
    const visibilityClasses = isActive ? 'opacity-100' : 'opacity-0 absolute';
    const transformClasses = cn(
        'translate-x-0',
        isActive
            ? {}
            : {
                  '-translate-x-full': direction === 'forward' || index < currentIndex,
                  'translate-x-full': direction === 'backward' || index > currentIndex,
              }
    );
    const className = cn(baseClasses, visibilityClasses, transformClasses);

    return (
        <div ref={stepRef} className={className} inert={!isActive}>
            {children}
        </div>
    );
};
