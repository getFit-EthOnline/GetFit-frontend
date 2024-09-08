/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'docs.chiliz.com',
            },
        ],
    },
};

export default nextConfig;
