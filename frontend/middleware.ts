import acceptLanguage from 'accept-language';
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { cookieName, fallbackLng, headerName, languages } from '@shared/config';

import type { NextRequest } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';

acceptLanguage.languages(languages);

function handleLocalization(req: NextRequest): NextResponse<unknown> {
    let lng;
    if (req.cookies.has(cookieName)) {
        lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
    }
    if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
    if (!lng) lng = fallbackLng;

    const lngInPath = languages.find((loc) => req.nextUrl.pathname.startsWith(`/${loc}`));
    const headers = new Headers(req.headers);
    headers.set(headerName, lngInPath || lng);

    if (!lngInPath && !req.nextUrl.pathname.startsWith('/_next')) {
        return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url));
    }

    if (req.headers.has('referer')) {
        const referer = req.headers.get('referer');
        const refererUrl = new URL(referer || req.url);
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
        const response = NextResponse.next({ headers });
        if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
        return response;
    }

    return NextResponse.next({ headers });
}

const isProtectedPath = (pathname: string): boolean => {
    return pathname.startsWith('/protected') || pathname.match(/^\/[a-z]{2}\/protected/) !== null;
};

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const localizationResponse: NextResponse<unknown> = handleLocalization(request);

        if (localizationResponse.status === 307) {
            return localizationResponse;
        }

        return NextResponse.next({
            headers: localizationResponse.headers,
        });
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                return isProtectedPath(req.nextUrl.pathname) ? !!token : true;
            },
        },
    }
);

export const config = {
    matcher: '/((?!api|_next/static|_next/image|manifest.json|favicons|public).*)',
};
