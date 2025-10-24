'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useUser, UserButton, SignInButton } from '@clerk/nextjs'
import { Sparkles, Zap, Users, ArrowRight, Menu, X, ChevronLeft, ChevronRight, PenTool, Wand2, Share2, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  const { isSignedIn, user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const sampleComics = [
    '/samples/sample-1.jpg',
    '/samples/sample-2.jpg',
    '/samples/sample-3.jpg',
    '/samples/sample-4.jpg'
  ]

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sampleComics.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [sampleComics.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sampleComics.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sampleComics.length) % sampleComics.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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
              <a href="#how-it-works" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
                How It Works
              </a>
              <a href="#examples" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
                Examples
              </a>
              <Link href="/gallery" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
                Gallery
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
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
              >
                Gallery
              </Link>
              <div className="pt-3 border-t border-neutral-100 space-y-2">
                {isSignedIn ? (
                  <Link href="/generate">
                    <button className="w-full px-5 py-3 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-sm font-medium">
                      Create Comic
                    </button>
                  </Link>
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

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 via-neutral-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Political Satire</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                {isSignedIn && user?.firstName ? (
                  <>
                    Welcome back,<br className="hidden sm:block" /> {user.firstName}! 👋
                  </>
                ) : (
                  <>
                    Turn Political News Into
                    <span className="block bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent mt-2">Viral Cartoons</span>
                  </>
                )}
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-neutral-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {isSignedIn
                  ? "Ready to create your next satirical masterpiece? Generate witty cartoons in seconds."
                  : "Create witty, shareable political cartoons in seconds. No design skills required."}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/generate">
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-xl hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-lg hover:shadow-xl font-semibold text-lg group">
                    {isSignedIn ? "Create New Comic" : "Start Creating Free"}
                    <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <a href="#examples">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-700 border-2 border-neutral-200 rounded-xl hover:border-neutral-300 hover:bg-neutral-50 transition-all font-semibold text-lg">
                    View Examples
                  </button>
                </a>
              </div>

              {/* Social Proof */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-neutral-500">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-400 to-neutral-600 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="font-medium text-neutral-700">1000+ creators</span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-neutral-200" />
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Generated in <span className="font-semibold text-neutral-700">60 seconds</span></span>
                </div>
              </div>
            </motion.div>

            {/* Right: Sample Comic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              {/* Sample comic with subtle shadow */}
              <div className="rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden bg-white">
                <Image
                  src="/samples/sample-1.jpg"
                  alt="Sample political cartoon"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 bg-neutral-200 rounded-full blur-3xl opacity-50" />
              <div className="absolute -top-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 bg-neutral-300 rounded-full blur-3xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-8 sm:py-12 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">10K+</div>
              <div className="text-xs sm:text-sm text-neutral-600 mt-1">Comics Created</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">1K+</div>
              <div className="text-xs sm:text-sm text-neutral-600 mt-1">Active Users</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">60s</div>
              <div className="text-xs sm:text-sm text-neutral-600 mt-1">Avg Generation</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-neutral-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neutral-300 rounded-full blur-3xl opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
          >
            <div className="inline-flex items-center space-x-2 bg-neutral-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              From Idea to Viral in
              <span className="block bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent mt-2">3 Easy Steps</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
              No design skills needed. Just your wit and our AI.
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-16">
            {[
              {
                step: "01",
                title: "Describe Your Scene",
                description: "Type in any political situation, current event, or social commentary. Our AI understands context and satire.",
                icon: PenTool,
                gradient: "from-amber-500 to-orange-500",
                bgGradient: "from-amber-50 to-orange-50",
                features: ["Natural language input", "Context-aware AI", "Instant understanding"]
              },
              {
                step: "02",
                title: "AI Creates Magic",
                description: "Watch as our AI generates a witty, editorial-style cartoon in classic black & white with your signature Common Man character.",
                icon: Wand2,
                gradient: "from-violet-500 to-purple-500",
                bgGradient: "from-violet-50 to-purple-50",
                features: ["Advanced AI model", "60-second generation", "Editorial cartoon style"]
              },
              {
                step: "03",
                title: "Share & Go Viral",
                description: "Download your masterpiece and share directly to X, LinkedIn, or save for later. Complete with Mockr signature.",
                icon: Share2,
                gradient: "from-emerald-500 to-teal-500",
                bgGradient: "from-emerald-50 to-teal-50",
                features: ["One-click sharing", "High-res download", "Social media optimized"]
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className={`relative bg-gradient-to-br ${item.bgGradient} rounded-2xl p-8 border-2 border-neutral-100 group-hover:border-neutral-200 shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full`}>
                    {/* Step number badge */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">{item.step}</span>
                    </div>

                    {/* Icon with gradient background */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                    <p className="text-neutral-700 leading-relaxed mb-6">{item.description}</p>

                    {/* Features list */}
                    <ul className="space-y-2">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-neutral-600">
                          <CheckCircle2 className="w-4 h-4 text-neutral-800 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Connector Arrow (desktop only) */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-5 lg:-right-6">
                        <ArrowRight className="w-8 h-8 lg:w-10 lg:h-10 text-neutral-300 group-hover:text-neutral-400 transition-colors" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-2xl p-8 sm:p-12 shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Create Your First Cartoon?
              </h3>
              <p className="text-neutral-200 mb-8 max-w-xl mx-auto">
                Join thousands of creators using Mockr to turn political commentary into shareable art
              </p>
              <Link href="/generate">
                <button className="px-8 py-4 bg-white text-neutral-900 rounded-xl hover:bg-neutral-100 transition-all shadow-lg hover:shadow-xl font-semibold text-lg inline-flex items-center group">
                  Start Creating Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Examples Gallery - Auto-Sliding Carousel */}
      <section id="examples" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Examples of AI Magic
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600">
              See what our community is creating
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Main Carousel */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-2xl">
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
                    alt={`Sample ${currentSlide + 1}`}
                    fill
                    className="object-contain"
                    priority={currentSlide === 0}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-white font-semibold text-lg sm:text-xl drop-shadow-lg">
                      AI Generated Cartoon {currentSlide + 1} of {sampleComics.length}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-neutral-700 hover:bg-neutral-50 hover:scale-110 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-neutral-700 hover:bg-neutral-50 hover:scale-110 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              {sampleComics.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all rounded-full ${
                    index === currentSlide
                      ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-gradient-to-r from-neutral-800 to-neutral-600'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10 sm:mt-12"
          >
            <Link href="/generate">
              <button className="px-8 py-4 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-xl hover:from-neutral-900 hover:to-neutral-800 transition-all shadow-lg hover:shadow-xl font-semibold text-lg inline-flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Create Your Own
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 pt-12 sm:pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-neutral-700 to-neutral-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-2xl font-bold text-white">Mockr</span>
              </div>
              <p className="text-neutral-400 mb-6 max-w-sm text-sm sm:text-base">
                Create viral-worthy political cartoons in seconds with AI. No design skills required.
              </p>
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="https://x.com/mockr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-700 transition-colors text-lg">
                  𝕏
                </a>
                <a href="https://linkedin.com/company/mockr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-700 transition-colors text-lg">
                  in
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Product</h3>
              <ul className="space-y-3 text-sm sm:text-base">
                <li><Link href="/generate" className="hover:text-white transition-colors">Create Comic</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Company</h3>
              <ul className="space-y-3 text-sm sm:text-base">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-neutral-500">
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
