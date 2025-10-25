'use client'

import { useState, useEffect } from 'react'
import { X, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductHuntBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  // Product Hunt URL - UPDATE THIS WITH YOUR ACTUAL PRODUCT HUNT URL
  const productHuntURL = process.env.NEXT_PUBLIC_PRODUCT_HUNT_URL || '#'

  // Check if banner should be shown
  useEffect(() => {
    // Check if user has dismissed the banner
    const dismissed = localStorage.getItem('ph-banner-dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Only show on launch day - UPDATE THESE DATES
    const launchDate = new Date('2025-01-27') // Set your launch date
    const endDate = new Date('2025-01-28') // Show for 24 hours
    const now = new Date()

    if (now >= launchDate && now <= endDate) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('ph-banner-dismissed', 'true')
    setIsDismissed(true)
  }

  if (isDismissed || !isVisible) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Message */}
            <div className="flex items-center space-x-3 flex-1">
              <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-base font-semibold">
                  🚀 We're live on Product Hunt today!
                </p>
                <p className="text-xs sm:text-sm opacity-90 hidden sm:block">
                  Support us with your upvote - it means the world to us!
                </p>
              </div>
            </div>

            {/* Center: CTA Button */}
            <a
              href={productHuntURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base whitespace-nowrap"
            >
              Upvote on PH 🙌
            </a>

            {/* Right: Close Button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
