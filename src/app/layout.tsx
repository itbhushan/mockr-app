 import type { Metadata } from 'next'
  import { Inter } from 'next/font/google'
  import { ClerkProvider } from '@clerk/nextjs'

  import './globals.css'

  const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
  })

  export const metadata: Metadata = {
    title: 'Mockr - AI Political Cartoon Generator',
    description: 'Create intelligent satirical political cartoons inspired by R.K. Laxman with AI. Generate shareable political commentary through witty, professional-quality cartoons.',
    keywords: [
      'political cartoons',
      'satirical comics',
      'AI cartoon generator',
      'political satire',
      'R.K. Laxman style',
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
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    themeColor: '#1e40af',
    manifest: '/manifest.json',
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <ClerkProvider>
        <html lang="en" className={inter.variable}>
          <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/icon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <meta name="theme-color" content="#1e40af" />
          </head>
          <body className={`${inter.className} antialiased bg-neutral-50 text-neutral-900`}>
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">
                {children}
              </main>
            </div>
          </body>
        </html>
      </ClerkProvider>
    )
  }
