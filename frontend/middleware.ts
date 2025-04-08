import { NextResponse } from 'next/server';

import { DEFAULT_LOCALE, locales } from '@/shared/config';
import { handleLocaleRedirection } from '@/shared/lib';

import type { NextRequest } from 'next/server';

const localeCodes = locales.map((locale) => locale.code);

export function middleware(request: NextRequest): NextResponse<unknown> {
    const redirectResponse = handleLocaleRedirection(request, localeCodes, DEFAULT_LOCALE);

    if (redirectResponse) {
        return redirectResponse;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!api|_next/static|_next/image|manifest.json|favicons|public).*)',
    ],
};
