import { NextConfig } from 'next'

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['expensy-ruby.vercel.app'],
  },
}

export default config
