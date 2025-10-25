import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import MVPRegistration from '@/components/MVPRegistration'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import ProductHuntBanner from '@/components/ProductHuntBanner'

import './globals.css'

  const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
  })

  export const metadata: Metadata = {
    title: 'Mockr - AI Political Cartoon Generator',
    description: 'Create intelligent satirical political cartoons in classic editorial style with AI. Generate shareable political commentary through witty, professional-quality cartoons.',
    keywords: [
      'political cartoons',
      'satirical comics',
      'AI cartoon generator',
      'political satire',
      'editorial cartoons',
      'social commentary',
      'political humor'
    ],
    authors: [{ name: 'Mockr Team' }],
    creator: 'Mockr',
    publisher: 'Mockr',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://mockr-app.netlify.app',
      title: 'Mockr - AI Political Cartoon Generator',
      description: 'Create intelligent satirical political cartoons with AI. Professional-quality political commentary made easy.',
      siteName: 'Mockr',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Mockr - AI Political Cartoon Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Mockr - AI Political Cartoon Generator',
      description: 'Create intelligent satirical political cartoons with AI',
      images: ['/og-image.png'],
      creator: '@MockrApp',
    },
    manifest: '/manifest.json',
  }

  export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    themeColor: '#1e40af',
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const isDev = process.env.NODE_ENV === 'development'
    const hasClerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
                       !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('dummy')

    const content = (
      <html lang="en" className={inter.variable} suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </head>
        <body className={`${inter.className} antialiased bg-neutral-50 text-neutral-900`} suppressHydrationWarning>
          <GoogleAnalytics />
          <ProductHuntBanner />
          <div className="min-h-screen flex flex-col">
            <MVPRegistration />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </body>
      </html>
    )

    // Only use ClerkProvider when we have proper keys
    if (hasClerkKey) {
      return <ClerkProvider>{content}</ClerkProvider>
    }

    return content
  }
