/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Enable CSS optimization for Tailwind v4
      optimizeCss: true,
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
