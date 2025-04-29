/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true,
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

    async rewrites(): Promise<{ beforeFiles: { source: string; destination: string; locale: boolean }[] }> {
        return {
            beforeFiles: [
                {
                    source: '/:locale/favicons/:path*',
                    destination: '/favicons/:path*',
                    locale: false,
                },
                {
                    source: '/favicons/:path*',
                    destination: '/favicons/:path*',
                    locale: false,
                },
            ],
        };
    },
};

export default nextConfig;
