/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Désactive la vérification ESLint pendant le build
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig