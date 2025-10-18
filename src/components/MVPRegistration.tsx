'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { CheckCircle, AlertCircle, Users, X } from 'lucide-react'

export default function MVPRegistration() {
  const { isSignedIn, user } = useUser()
  const [registrationStatus, setRegistrationStatus] = useState<{
    success: boolean
    userNumber?: number
    message?: string
    waitlist?: boolean
  } | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (!isSignedIn || !user) return

    // Check if user has already been registered
    const alreadyRegistered = user.publicMetadata?.registrationNumber
    if (alreadyRegistered) {
      // User is already registered, don't show anything
      return
    }

    // Auto-register new user for MVP
    const registerUser = async () => {
      setIsRegistering(true)
      try {
        const response = await fetch('/api/mvp-register', {
          method: 'POST',
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setRegistrationStatus({
            success: true,
            userNumber: data.userNumber,
            message: data.message,
          })
          setShowBanner(true)

          // Auto-hide success banner after 10 seconds
          setTimeout(() => {
            setShowBanner(false)
          }, 10000)
        } else if (response.status === 403 && data.waitlist) {
          // User is on waitlist (MVP at capacity)
          setRegistrationStatus({
            success: false,
            waitlist: true,
            message: data.error || 'MVP is currently at capacity',
          })
          setShowBanner(true)
        } else {
          console.error('Registration failed:', data.error)
        }
      } catch (error) {
        console.error('Error registering for MVP:', error)
      } finally {
        setIsRegistering(false)
      }
    }

    registerUser()
  }, [isSignedIn, user])

  if (!showBanner || !registrationStatus) return null

  // Success Banner
  if (registrationStatus.success) {
    return (
      <div className="fixed top-20 left-0 right-0 z-40 flex justify-center px-4">
        <div className="bg-green-50 border border-green-200 rounded-xl shadow-lg p-4 max-w-lg w-full animate-slide-down">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 text-sm mb-1">
                🎉 Welcome to Mockr MVP!
              </h3>
              <p className="text-xs text-green-800 leading-relaxed">
                {registrationStatus.message || `You are MVP user #${registrationStatus.userNumber} of 100`}
              </p>
              <p className="text-xs text-green-700 mt-2">
                You can generate up to 10 comics per day. Enjoy!
              </p>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-green-600 hover:text-green-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Waitlist Banner
  if (registrationStatus.waitlist) {
    return (
      <div className="fixed top-20 left-0 right-0 z-40 flex justify-center px-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl shadow-lg p-4 max-w-lg w-full animate-slide-down">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 text-sm mb-1">
                🚀 MVP at Capacity
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed mb-2">
                {registrationStatus.message || 'Our MVP phase is currently at capacity (100 users)'}
              </p>
              <p className="text-xs text-amber-700">
                We'll notify you via email when we open up more spots. Stay tuned!
              </p>
              <button
                onClick={() => setShowBanner(false)}
                className="mt-3 text-xs bg-amber-600 hover:bg-amber-700 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                Got it
              </button>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-amber-600 hover:text-amber-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
