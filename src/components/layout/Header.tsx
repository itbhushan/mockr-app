'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser, UserButton, SignInButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header() {
  const { isSignedIn, user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-white'
    } border-b border-neutral-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <span className="text-white font-bold text-lg sm:text-xl">M</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-600 bg-clip-text text-transparent">
              Mockr
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="/#how-it-works" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
              How It Works
            </a>
            <a href="/#examples" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
              Examples
            </a>
            <Link href="/gallery" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
              Gallery
            </Link>
            <Link href="/pricing" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
              Pricing
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {isSignedIn ? (
              <>
                <Link href="/generate">
                  <button className="px-5 py-2.5 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-sm hover:shadow-md font-medium">
                    Create Comic
                  </button>
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9"
                    }
                  }}
                />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-neutral-700 hover:text-neutral-900 transition-colors font-medium">
                    Sign In
                  </button>
                </SignInButton>
                <Link href="/generate">
                  <button className="px-5 py-2.5 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-sm hover:shadow-md font-medium">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white border-t border-neutral-100 shadow-lg"
        >
          <div className="px-4 py-4 space-y-3">
            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
            >
              How It Works
            </a>
            <a
              href="/#examples"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
            >
              Examples
            </a>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
            >
              Gallery
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
            >
              Pricing
            </Link>
            <div className="pt-3 border-t border-neutral-100 space-y-2">
              {isSignedIn ? (
                <>
                  {/* User Info Display */}
                  <div className="flex items-center justify-between px-3 py-2 bg-neutral-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-neutral-800 to-neutral-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-neutral-900">
                          {user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0]}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {user?.emailAddresses[0]?.emailAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href="/generate">
                    <button className="w-full px-5 py-3 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-sm font-medium">
                      Create Comic
                    </button>
                  </Link>

                  {/* UserButton for account management and logout */}
                  <div className="flex justify-center pt-2">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10",
                          userButtonPopoverCard: "shadow-lg"
                        }
                      }}
                      afterSignOutUrl="/"
                    />
                  </div>
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="w-full px-5 py-3 text-neutral-700 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all font-medium">
                      Sign In
                    </button>
                  </SignInButton>
                  <Link href="/generate">
                    <button className="w-full px-5 py-3 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-sm font-medium">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
