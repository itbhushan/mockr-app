'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  const [isClerkLoaded, setIsClerkLoaded] = useState(false)

  useEffect(() => {
    // Check if Clerk is available
    const hasClerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
                       !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('dummy')
    setIsClerkLoaded(typeof window !== 'undefined' && Boolean(hasClerkKey))
  }, [])

  return (
    <div className="min-h-screen mockr-gradient-subtle flex items-center justify-center py-12 px-6">
      {/* Navigation */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 text-neutral-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 mockr-gradient-hero rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <span className="text-3xl font-bold text-gradient">Mockr</span>
          </div>
          <h1 className="text-display-sm text-neutral-900 mb-4">
            Welcome Back
          </h1>
          <p className="text-body-md text-neutral-600">
            Sign in to continue creating satirical masterpieces
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden p-8 shadow-md">
          {isClerkLoaded ? (
            <div className="text-center py-8">
              <p className="text-neutral-600 mb-4">Clerk authentication will be available when API keys are configured.</p>
              <Link href="/generate" className="btn-primary">
                Continue to Generator
              </Link>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-600 mb-4">Authentication system loading...</p>
              <Link href="/generate" className="btn-primary">
                Continue to Generator
              </Link>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-caption text-neutral-500">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}