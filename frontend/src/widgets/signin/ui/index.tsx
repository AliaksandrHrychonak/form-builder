import Link from 'next/link';

import { AppleSignInButton, GoogleSignInButton, LoginForm } from '@features/session';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

import type { JSX } from 'react';

export const SignIn = (): JSX.Element => {
    return (
        <>
            <Card className='flex flex-col gap-6'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>Welcome back</CardTitle>
                    <CardDescription>Login with your Apple or Google account</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-6'>
                    <div className='flex flex-col gap-4'>
                        <AppleSignInButton />
                        <GoogleSignInButton />
                    </div>
                    <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                        <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
                    </div>
                    <LoginForm />

                    <div className='text-center text-sm'>
                        Don&apos;t have an account?{' '}
                        <Link href='/auth/signup' className='underline underline-offset-4'>
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary'>
                By clicking continue, you agree to our <Link href='#'>Terms of Service</Link> and{' '}
                <Link href='#'>Privacy Policy</Link>.
            </div>
        </>
    );
};
