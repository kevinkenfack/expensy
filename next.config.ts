import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  pageExtensions: ['tsx', 'ts'],
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
};

export default config;
