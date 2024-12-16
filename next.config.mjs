/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "serv.stockcnc.com",
        pathname: "/uploads/**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
