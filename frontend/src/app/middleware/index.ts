import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { DEFAULT_LOCALE, locales } from '@shared/config';
import { handleLocaleRedirection } from '@shared/lib';

import type { NextRequestWithAuth } from 'next-auth/middleware';
const localeCodes = locales.map((locale) => locale.code);

const isProtectedPath = (pathname: string): boolean => {
    return pathname.startsWith('/protected') || pathname.match(/^\/[a-z]{2}\/protected/) !== null;
};

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const redirectResponse = handleLocaleRedirection(request, localeCodes, DEFAULT_LOCALE);

        const locale = request.nextUrl.pathname.split('/')[1] || DEFAULT_LOCALE;

        const response = redirectResponse || NextResponse.next();

        response.cookies.set('locale', locale, {
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        // const token = request.nextauth.token;
        //
        // if (!token) {
        //     return NextResponse.redirect(new URL('/', request.url));
        // }
        //
        // if (
        //     request.nextUrl.pathname.startsWith('/admin') &&
        //     ![ENUM_POLICY_ROLE_TYPE.ADMIN, ENUM_POLICY_ROLE_TYPE.SUPER_ADMIN].includes(token.roleType)
        // ) {
        //     return NextResponse.redirect(new URL('/', request.url));
        // }

        return response;
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                return isProtectedPath(req.nextUrl.pathname) ? !!token : true;
            },
        },
    }
);
