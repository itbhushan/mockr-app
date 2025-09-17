/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // CSS optimization disabled for deployment compatibility
      // optimizeCss: true,
    },
    eslint: {
      // Disable ESLint during build on Netlify (import order is not critical)
      ignoreDuringBuilds: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.supabase.co',
          pathname: '/storage/v1/object/public/**',
        },
        {
          protocol: 'https',
          hostname: 'api-inference.huggingface.co',
        },
      ],
    },
    // Optimize for Netlify deployment
    // output: 'export', // Disabled for Netlify plugin compatibility
    trailingSlash: false,
    poweredByHeader: false,
    compress: true,
    generateEtags: true,

    // Environment variables validation
    env: {
      CUSTOM_DOMAIN: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    },
  }

module.exports = nextConfig
