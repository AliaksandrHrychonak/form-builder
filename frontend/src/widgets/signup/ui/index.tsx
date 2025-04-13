import Link from 'next/link';

import { RegisterForm } from '@features/session';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

import type { JSX } from 'react';

export const SignUp = (): JSX.Element => {
    return (
        <>
            <Card className='flex flex-col gap-6'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>Create an account</CardTitle>
                    <CardDescription>Enter your account information below to create your account</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-6'>
                    <RegisterForm />

                    <div className='text-center text-sm'>
                        Already have an account?{' '}
                        <Link href='/auth/signin' className='underline underline-offset-4'>
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary'>
                By completing registration, you agree to our <Link href='#'>Terms of Service</Link> and{' '}
                <Link href='#'>Privacy Policy</Link>.
            </div>
        </>
    );
};
