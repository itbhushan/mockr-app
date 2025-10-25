'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Something went wrong!
        </h1>
        <p className="text-neutral-600 mb-6">
          We encountered an unexpected error. Don't worry, your data is safe.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-3 bg-neutral-100 rounded-lg text-left">
            <p className="text-xs text-neutral-600 font-mono break-words">
              {error.message}
            </p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-xl hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white text-neutral-700 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all font-medium"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
