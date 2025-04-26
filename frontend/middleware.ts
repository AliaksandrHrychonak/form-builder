export { default } from '@/app/middleware';

export const config = {
    matcher: [
        '/protected/:path*',
        '/:locale/protected/:path*',
        '/api/:path*',
        '/(auth)/:path*',
        '/:locale/(auth)/:path*',
        '/((?!api|_next/static|public|_next/image|assets|favicons|favicon.ico|sw.js).*)',
    ],
};
