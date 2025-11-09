'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useUser, UserButton, SignInButton } from '@clerk/nextjs'
import { Sparkles, Zap, ArrowRight, Menu, X, ChevronLeft, ChevronRight, ChevronDown, PenTool, Wand2, Share2, CheckCircle2, Megaphone, Smartphone, Newspaper, Image as ImageIcon, Clock, Shield, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  const { isSignedIn, user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [selectedExample, setSelectedExample] = useState<number | null>(null)
  const [showPHBanner, setShowPHBanner] = useState(true)

  const sampleComics = [
    '/samples/sample-1.jpg',
    '/samples/sample-2.jpg',
    '/samples/sample-3.jpg',
    '/samples/sample-4.jpg'
  ]

  const exampleComics = [
    '/examples/example-1.jpg',
    '/examples/example-2.jpg',
    '/examples/example-3.jpg',
    '/examples/example-4.jpg'
  ]

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-slide carousel for hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sampleComics.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [sampleComics.length])

  // Product Hunt banner - show for launch week
  useEffect(() => {
    // Launch date: November 4, 2025
    const launchDate = new Date('2025-11-04T00:00:00')
    const today = new Date()

    // Calculate days since launch
    const daysSinceLaunch = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24))

    // Show banner from launch day through 7 days after
    const shouldShowBanner = daysSinceLaunch >= 0 && daysSinceLaunch <= 7

    // Check if user dismissed banner
    const dismissed = localStorage.getItem('ph-banner-dismissed')

    if (shouldShowBanner && dismissed !== 'true') {
      setShowPHBanner(true)
    } else {
      setShowPHBanner(false)
    }
  }, [])

  const handleDismissPHBanner = () => {
    setShowPHBanner(false)
    localStorage.setItem('ph-banner-dismissed', 'true')
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sampleComics.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sampleComics.length) % sampleComics.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "How does Mockr work?",
      answer: "Simply describe any political situation in plain English. Our AI generates a witty quote and creates a classic editorial-style cartoon in about 60 seconds. No design skills needed!"
    },
    {
      question: "Is it really free?",
      answer: "Yes! You get 10 free comics per day during our MVP phase. No credit card required. We're limiting access to the first 100 users to ensure quality."
    },
    {
      question: "What's the 100 user limit?",
      answer: "We're launching as an MVP with limited capacity. The first 100 users get full access. If we're at capacity, you can join our waitlist to be notified when more spots open up."
    },
    {
      question: "How long does generation take?",
      answer: "Most comics are ready in 60 seconds or less. The AI needs time to generate a witty quote, create the cartoon, and add our signature Common Man character."
    },
    {
      question: "Can I use these commercially?",
      answer: "Yes! You own the comics you create. Use them on social media, blogs, newsletters, or wherever you like. We only ask that you keep the Mockr signature visible."
    },
    {
      question: "What if I don't like my comic?",
      answer: "No problem! You can regenerate as many times as you want (within your daily 10-comic limit). Each generation is unique, so try different wording for different results."
    },
    {
      question: "How do I share my comics?",
      answer: "Every comic has one-click sharing buttons for X (Twitter) and more. You can also download the image to share anywhere you like."
    },
    {
      question: "Is my data private?",
      answer: "Yes! Your comics are stored locally in your browser, not on our servers. We only track anonymous usage metrics to improve the service. See our Privacy Policy for details."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Flash Banner - First 100 Users */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-[60] bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 animate-pulse"
      >
        <div className="max-w-7xl mx-auto px-4 py-2">
          <p className="text-center text-white font-bold text-sm sm:text-base">
            🎉 <span className="animate-bounce inline-block">FREE</span> for First 100 Users - 1 Month Limited Access! Join Now! 🚀
          </p>
        </div>
      </motion.div>

      {/* Product Hunt Launch Banner */}
      <AnimatePresence>
        {showPHBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed top-10 w-full z-[59] bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative">
                <span className="text-white font-semibold text-sm sm:text-base text-center sm:text-left">
                  🚀 Launching on Product Hunt November 4th! Get notified
                </span>
                <a
                  href={process.env.NEXT_PUBLIC_PRODUCT_HUNT_URL || 'https://www.producthunt.com/products/mockr?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-mockr'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90 transition-opacity flex-shrink-0"
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1031919&theme=light&t=1761834471331"
                    alt="Mockr - Turn political news into viral cartoons in 60 seconds | Product Hunt"
                    style={{ width: '200px', height: '43px' }}
                    width="200"
                    height="43"
                    className="w-[180px] sm:w-[200px] h-auto"
                  />
                </a>
                <button
                  onClick={handleDismissPHBanner}
                  className="absolute top-1 right-2 text-white/80 hover:text-white transition-colors p-1"
                  aria-label="Dismiss banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed ${showPHBanner ? 'top-[88px]' : 'top-10'} w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-white'
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
              <a href="#how-it-works" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
                How It Works
              </a>
              <a href="#examples" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
                Examples
              </a>
              <Link href="/pricing" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
                Pricing
              </Link>
              <a href="#faq" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
                FAQ
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {isSignedIn ? (
                <>
                  <Link href="/generate">
                    <button className="px-6 py-3 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-sm hover:shadow-md font-semibold">
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
                    <button className="px-6 py-3 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-sm hover:shadow-md font-semibold">
                      Start Creating Free
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
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
              >
                How It Works
              </a>
              <a
                href="#examples"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
              >
                Examples
              </a>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
              >
                Pricing
              </Link>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
              >
                FAQ
              </a>
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
                      <button className="w-full px-5 py-3 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-sm font-semibold">
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
                      <button className="w-full px-5 py-3 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-sm font-semibold">
                        Start Creating Free
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Replymer Style */}
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Political Satire</span>
              </div>

              {/* Headline - Larger and Bolder */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 mb-4 leading-tight">
                Turn Political News Into{' '}
                <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                  Viral Cartoons
                </span>
              </h1>

              {/* Subheadline - More Prominent */}
              <p className="text-xl sm:text-2xl text-neutral-600 mb-10 leading-relaxed">
                Create shareable, witty political cartoons in 60 seconds. No design skills required.
              </p>

              {/* CTA Buttons - Larger */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link href="/generate">
                  <button className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-xl hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-lg hover:shadow-2xl font-bold text-xl group">
                    Start Creating Free
                    <ArrowRight className="w-6 h-6 ml-2 inline group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <a href="#examples">
                  <button className="w-full sm:w-auto px-10 py-5 bg-white text-neutral-700 border-2 border-neutral-200 rounded-xl hover:border-neutral-300 hover:bg-neutral-50 transition-all font-bold text-xl">
                    View Examples
                  </button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-neutral-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="font-medium">Limited to 100 Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-neutral-600" />
                  <span className="font-medium">60s Generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-600" />
                  <span className="font-medium">10 Free Daily</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border-2 border-neutral-200 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={sampleComics[currentSlide]}
                      alt={`Sample comic ${currentSlide + 1}`}
                      fill
                      className="object-contain p-4"
                      priority={currentSlide === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {sampleComics.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all rounded-full ${
                        index === currentSlide
                          ? 'w-8 h-2 bg-neutral-800'
                          : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative blur elements */}
              <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-neutral-200 rounded-full blur-3xl opacity-50" />
              <div className="absolute -z-10 -top-8 -right-8 w-48 h-48 bg-neutral-300 rounded-full blur-3xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section - Colored & Compact */}
      <section className="py-8 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-neutral-500 mb-6 font-medium">
            Powered by cutting-edge AI technology
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: Sparkles, label: "Advanced AI", color: "from-purple-500 to-pink-500" },
              { icon: Clock, label: "60s Generation", color: "from-blue-500 to-cyan-500" },
              { icon: Shield, label: "Free to Use", color: "from-green-500 to-emerald-500" },
              { icon: ImageIcon, label: "HD Quality", color: "from-orange-500 to-amber-500" }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 bg-white"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-neutral-700">{item.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced 4 Steps */}
      <section id="how-it-works" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-neutral-800 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 mb-4">
              From Idea to Viral in{' '}
              <span className="block bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent mt-2">
                4 Easy Steps
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-neutral-600 max-w-3xl mx-auto">
              No design skills needed. Just your wit and our AI.
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Describe",
                description: "Type any political situation in plain English",
                icon: PenTool,
                gradient: "from-neutral-800 to-neutral-700"
              },
              {
                step: "02",
                title: "AI Generates Quote",
                description: "Our AI creates a witty, contextual satirical quote",
                icon: Sparkles,
                gradient: "from-neutral-700 to-neutral-600"
              },
              {
                step: "03",
                title: "Comic Created",
                description: "Classic editorial cartoon generated in 60 seconds",
                icon: Wand2,
                gradient: "from-neutral-600 to-neutral-500"
              },
              {
                step: "04",
                title: "Share Everywhere",
                description: "Download or share directly to social media",
                icon: Share2,
                gradient: "from-neutral-800 to-neutral-700"
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-8 border-2 border-neutral-100 group-hover:border-neutral-200 transition-all h-full" style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 60px -10px rgba(0, 0, 0, 0.12)'
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)'
                  }}>
                    {/* Step Badge */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-xl mb-6 text-white font-bold text-xl shadow-lg`}>
                      {item.step}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-neutral-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-neutral-700 group-hover:rotate-6 transition-transform duration-300" strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Examples Gallery - Featured Showcase */}
      <section id="examples" className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-neutral-800 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              <span>User Creations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4">
              Real Cartoons Created by Users
            </h2>
            <p className="text-lg text-neutral-600">
              See what our community is creating
            </p>
          </motion.div>

          {/* Grid Container - 2x2 with better sizing and hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {exampleComics.map((comic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedExample(index)}
                className="relative group cursor-pointer"
              >
                {/* Badge with example number */}
                <div className="absolute -top-3 -left-3 z-10 w-10 h-10 bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>

                {/* Comic container with enhanced styling */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border-2 border-neutral-200 group-hover:border-neutral-400 shadow-lg group-hover:shadow-2xl transition-all">
                  <Image
                    src={comic}
                    alt={`User created comic ${index + 1}`}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <p className="text-white font-semibold text-sm">Click to view larger</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal for viewing larger image */}
          <AnimatePresence>
            {selectedExample !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedExample(null)}
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl w-full aspect-square cursor-default"
                >
                  <Image
                    src={exampleComics[selectedExample]}
                    alt={`User created comic ${selectedExample + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                  <button
                    onClick={() => setSelectedExample(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  >
                    <X className="w-5 h-5 text-neutral-900" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Gallery Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/gallery" className="inline-flex items-center text-neutral-700 hover:text-neutral-900 font-semibold text-lg group">
              View Full Gallery
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 mb-4">
              Perfect For
            </h2>
            <p className="text-xl sm:text-2xl text-neutral-600 max-w-3xl mx-auto">
              Whether you're a commentator, creator, or news junkie
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Megaphone,
                title: "Political Commentators",
                description: "Share your takes visually with professional-looking cartoons",
                highlight: "10 comics/day free"
              },
              {
                icon: Smartphone,
                title: "Social Media Creators",
                description: "Create viral-ready content that stands out in feeds",
                highlight: "One-click sharing"
              },
              {
                icon: Newspaper,
                title: "News Junkies",
                description: "Express your opinions on current events creatively",
                highlight: "No design skills needed"
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-neutral-50 rounded-2xl p-8 border-2 border-neutral-100 hover:border-neutral-200 transition-all"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 60px -10px rgba(0, 0, 0, 0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="w-8 h-8 text-white group-hover:rotate-6 transition-transform duration-300" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                  <p className="text-neutral-600 mb-4 leading-relaxed">{item.description}</p>
                  <div className="inline-flex items-center px-3 py-1 bg-white border border-neutral-200 rounded-full">
                    <span className="text-sm font-semibold text-neutral-700">{item.highlight}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Mockr Section - Horizontal Compact */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-3">
              Why Choose Mockr?
            </h2>
          </motion.div>

          {/* Horizontal Grid - 2 rows of 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🎨", title: "Classic Editorial Style", description: "Black & white cartoons inspired by legendary satirists" },
              { icon: "⚡", title: "Lightning Fast", description: "From idea to shareable in under 60 seconds" },
              { icon: "🤖", title: "AI-Powered Wit", description: "Smart quote generation understands political context" },
              { icon: "💰", title: "Free to Use", description: "10 comics per day, no credit card required" },
              { icon: "📱", title: "Mobile Friendly", description: "Create and share from any device, anywhere" },
              { icon: "🎯", title: "Signature Style", description: "Every comic features iconic Common Man character" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all h-full">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 mb-1 text-sm">{item.title}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-600">
              Everything you need to know about Mockr
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-2 border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-300 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-neutral-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-600 flex-shrink-0 transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-neutral-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-neutral-900 to-neutral-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-700 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neutral-600 rounded-full blur-3xl opacity-20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Ready to Create Your First Political Cartoon?
            </h2>
            <p className="text-xl sm:text-2xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join the first 100 users and start creating viral-worthy satire in 60 seconds. No design skills required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/generate">
                <button className="px-10 py-5 bg-white text-neutral-900 rounded-xl hover:bg-neutral-100 transition-all shadow-2xl hover:shadow-3xl font-bold text-xl inline-flex items-center group">
                  Start Creating Free
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="#examples">
                <button className="px-10 py-5 bg-transparent text-white border-2 border-white rounded-xl hover:bg-white/10 transition-all font-bold text-xl">
                  See Examples
                </button>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-400">
              <span>✓ Limited MVP Access</span>
              <span>✓ 10 Free Comics Daily</span>
              <span>✓ No Credit Card</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-neutral-900 text-neutral-300 pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {/* Brand Column */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-neutral-700 to-neutral-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-2xl font-bold text-white">Mockr</span>
              </div>
              <p className="text-neutral-400 mb-6 max-w-sm leading-relaxed">
                Create viral-worthy political cartoons in seconds with AI. No design skills required.
              </p>
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="https://x.com/MockrArt" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-700 transition-colors text-lg">
                  𝕏
                </a>
                <a href="mailto:support@mockr.art" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product Hunt Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Launching on Product Hunt</h3>
              <a
                href="https://www.producthunt.com/products/mockr?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-mockr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-90 transition-opacity"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1031919&theme=light&t=1761834471331"
                  alt="Mockr - Turn political news into viral cartoons in 60 seconds | Product Hunt"
                  style={{ width: '250px', height: '54px' }}
                  width="250"
                  height="54"
                />
              </a>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link href="/generate" className="hover:text-white transition-colors">Create Comic</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>© 2025 Mockr. All rights reserved.</p>
            <p className="flex items-center space-x-1">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>for free speech</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
