import { NextResponse } from 'next/server';

import { getLocale } from './get-locale';

import type { NextRequest } from 'next/server';

/**
 * Handles locale redirection based on the given request, supported locale codes, and default locale.
 * @param request - The Next.js request object.
 * @param localeCodes - An array of supported locale codes.
 * @param defaultLocale - The default locale code.
 * @returns A Next.js response object for redirection or null if no redirection is needed.
 */
export const handleLocaleRedirection = (
    request: NextRequest,
    localeCodes: string[],
    defaultLocale: string
): NextResponse | null => {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = localeCodes.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
        const locale = getLocale(request, localeCodes, defaultLocale);
        const isValidLocale = localeCodes.includes(locale);
        const redirectLocale = isValidLocale ? locale : defaultLocale;

        let pathWithoutLocale = pathname;
        if (pathname === '/') {
            pathWithoutLocale = '';
        } else if (pathname.startsWith('/')) {
            pathWithoutLocale = pathname.slice(1);
        }

        const redirectPath = pathWithoutLocale ? `/${redirectLocale}/${pathWithoutLocale}` : `/${redirectLocale}`;
        const redirectUrl = new URL(redirectPath, request.url);

        return NextResponse.redirect(redirectUrl);
    }

    return null;
};
