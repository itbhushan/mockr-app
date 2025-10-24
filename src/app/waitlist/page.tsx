'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Mail, CheckCircle, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [position, setPosition] = useState<number | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setPosition(data.position)
      } else {
        setError(data.error || 'Failed to join waitlist')
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 py-12">
      {/* Navigation */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="max-w-md w-full">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-100"
          >
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-700 bg-clip-text text-transparent">
                Mockr
              </span>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>MVP at Capacity</span>
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-3">
                Join the Waitlist
              </h1>
              <p className="text-neutral-600 leading-relaxed">
                Our MVP is limited to 100 users. Join the waitlist and we'll notify you when spots open up!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Name (Optional)
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent transition-all"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full bg-gradient-to-r from-neutral-800 to-neutral-700 hover:from-neutral-900 hover:to-neutral-800 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Join Waitlist</span>
                  </>
                )}
              </button>
            </form>

            {/* Benefits */}
            <div className="mt-8 pt-6 border-t border-neutral-100">
              <p className="text-xs text-neutral-500 text-center mb-4">
                What you'll get when you join:
              </p>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>10 AI-generated comics per day</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Download & share on social media</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Classic editorial cartoon style</span>
                </li>
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-100 text-center"
          >
            {/* Success Icon */}
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            {/* Success Message */}
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              You're on the List!
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              You're <span className="font-bold text-neutral-900">#{position}</span> on the waitlist.
              We'll email you at <span className="font-semibold text-neutral-900">{email}</span> when a spot opens up.
            </p>

            <div className="p-4 bg-neutral-50 rounded-xl mb-6">
              <p className="text-sm text-neutral-700">
                💡 <span className="font-semibold">Tip:</span> Share Mockr with your friends to help us grow faster!
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-neutral-800 to-neutral-700 hover:from-neutral-900 hover:to-neutral-800 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
