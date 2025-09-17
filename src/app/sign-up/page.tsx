'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SignUpPage() {
  const [isClerkLoaded, setIsClerkLoaded] = useState(false)

  useEffect(() => {
    // Check if Clerk is available
    const hasClerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
                       !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('dummy')
    setIsClerkLoaded(typeof window !== 'undefined' && Boolean(hasClerkKey))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center py-12 px-6">
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
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <span className="text-3xl font-bold text-gradient">Mockr</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-neutral-900 mb-4">
            Create Your Account
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed text-neutral-600">
            Join thousands of creators making viral political satire
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden p-8 shadow-md">
          {isClerkLoaded ? (
            <div className="text-center py-8">
              <p className="text-neutral-600 mb-4">Clerk authentication will be available when API keys are configured.</p>
              <Link href="/generate" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                Start Creating Comics
              </Link>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-600 mb-4">Authentication system loading...</p>
              <Link href="/generate" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                Start Creating Comics
              </Link>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm lg:text-base leading-relaxed text-neutral-500">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
          <h3 className="text-xl lg:text-2xl font-semibold leading-tight tracking-tight text-blue-900 mb-3">
            🎨 What you'll get:
          </h3>
          <ul className="space-y-2 text-sm lg:text-base leading-relaxed text-blue-700">
            <li>• Unlimited comic generation</li>
            <li>• High-resolution downloads</li>
            <li>• Custom character creation</li>
            <li>• Priority AI processing</li>
            <li>• Community gallery access</li>
          </ul>
        </div>
      </div>
    </div>
  )
}