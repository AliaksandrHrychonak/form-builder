/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true,
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
