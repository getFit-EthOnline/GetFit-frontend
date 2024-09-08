/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.chiliz.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "docs.chiliz.com",
      },
      {
        protocol: "https",
        hostname: "docs.chiliz.com",
      },
    ],
  },
};

export default nextConfig;
