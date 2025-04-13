'use client';

import { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';

import type React from 'react';
import type {
    BrowserNativeObject,
    DeepRequired,
    FieldErrorsImpl,
    GlobalError,
    Path,
    UseFormReturn,
} from 'react-hook-form';

export const useMultiStepForm = <Schema extends z.ZodType>(
    schema: Schema,
    form: UseFormReturn<z.infer<Schema>>,
    stepNames: string[]
): {
    form: UseFormReturn<Schema['_output']>;
    currentStep: string;
    currentStepIndex: number;
    totalSteps: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    nextStep: (e: React.SyntheticEvent<Element, Event>) => void;
    prevStep: (e: React.SyntheticEvent<Element, Event>) => void;
    goToStep: (index: number) => void;
    direction: 'forward' | 'backward' | undefined;
    isStepValid: () => boolean;
    isValid: boolean;
    errors: Partial<
        FieldErrorsImpl<
            Schema['_output'] extends BrowserNativeObject | Blob
                ? Schema['_output']
                : {
                      [K in keyof Schema['_output']]-?: NonNullable<DeepRequired<Schema['_output'][K]>>;
                  }
        >
    > & {
        root?: Record<string, GlobalError> & GlobalError;
    };
} => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [direction, setDirection] = useState<'forward' | 'backward'>();

    const isStepValid = useCallback((): boolean => {
        const currentStepName = stepNames[currentStepIndex] as Path<z.TypeOf<Schema>>;
        if (schema instanceof z.ZodObject) {
            const currentStepSchema = schema.shape[currentStepName] as z.ZodType;
            if (!currentStepSchema) {
                return true;
            }
            const currentStepData = form.getValues(currentStepName) ?? {};
            const result = currentStepSchema.safeParse(currentStepData);
            return result.success;
        }

        throw new Error(`Unsupported schema type: ${schema.constructor.name}`);
    }, [schema, form, stepNames, currentStepIndex]);

    const nextStep = useCallback(
        <Ev extends React.SyntheticEvent>(e: Ev): void => {
            e.preventDefault();
            const isValid = isStepValid();
            if (!isValid) {
                const currentStepName = stepNames[currentStepIndex] as Path<z.TypeOf<Schema>>;
                if (schema instanceof z.ZodObject) {
                    const currentStepSchema = schema.shape[currentStepName] as z.ZodType;
                    if (currentStepSchema) {
                        const fields = Object.keys((currentStepSchema as z.ZodObject<never>).shape);
                        const keys = fields.map((field) => `${currentStepName}.${field}`);
                        for (const key of keys) {
                            void form.trigger(key as Path<z.TypeOf<Schema>>);
                        }
                        return;
                    }
                }
            }
            if (isValid && currentStepIndex < stepNames.length - 1) {
                setDirection('forward');
                setCurrentStepIndex((prev) => prev + 1);
            }
        },
        [isStepValid, currentStepIndex, stepNames, schema, form]
    );

    const prevStep = useCallback(
        <Ev extends React.SyntheticEvent>(e: Ev): void => {
            e.preventDefault();
            if (currentStepIndex > 0) {
                setDirection('backward');
                setCurrentStepIndex((prev) => prev - 1);
            }
        },
        [currentStepIndex]
    );

    const goToStep = useCallback(
        (index: number): void => {
            if (index >= 0 && index < stepNames.length && isStepValid()) {
                setDirection(index > currentStepIndex ? 'forward' : 'backward');
                setCurrentStepIndex(index);
            }
        },
        [isStepValid, stepNames.length, currentStepIndex]
    );

    const isValid = form.formState.isValid;
    const errors = form.formState.errors;

    return useMemo(
        () => ({
            form,
            currentStep: stepNames[currentStepIndex] as string,
            currentStepIndex,
            totalSteps: stepNames.length,
            isFirstStep: currentStepIndex === 0,
            isLastStep: currentStepIndex === stepNames.length - 1,
            nextStep,
            prevStep,
            goToStep,
            direction,
            isStepValid,
            isValid,
            errors,
        }),
        [form, stepNames, currentStepIndex, nextStep, prevStep, goToStep, direction, isStepValid, isValid, errors]
    );
};
