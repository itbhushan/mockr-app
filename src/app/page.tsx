  'use client'

  import { useState } from 'react'
  import { Sparkles, Zap, Users, ArrowRight, Play, Star } from 'lucide-react'
  import { motion } from 'framer-motion'
  import Link from 'next/link'

  export default function HomePage() {
    const [, setIsVideoPlaying] = useState(false)

    const features = [
      {
        icon: Sparkles,
        title: "AI-Powered Creativity",
        description: "Generate witty political cartoons inspired by R.K. Laxman's legendary style with cutting-edge AI technology."
      },
      {
        icon: Zap,
        title: "Instant Generation",
        description: "Create professional-quality satirical content in under 60 seconds. From idea to shareable cartoon instantly."
      },
      {
        icon: Users,
        title: "Viral Potential",
        description: "Clean, minimalistic design perfect for social media sharing. Make your political commentary go viral."
      }
    ]

    const sampleComics = [
      {
        title: "The Promise Paradox",
        description: "Politicians making healthcare promises while holding pharma stocks",
        image: "/samples/comic-1.jpg",
        likes: 1247
      },
      {
        title: "Digital Divide",
        description: "Common man's view on government's tech initiatives",
        image: "/samples/comic-2.jpg",
        likes: 892
      },
      {
        title: "Green Hypocrisy",
        description: "Climate action talk from private jet conferences",
        image: "/samples/comic-3.jpg",
        likes: 2156
      }
    ]

    return (
      <div className="min-h-screen mockr-gradient-subtle">
        {/* Navigation */}
        <nav className="w-full px-6 py-4 lg:py-6 bg-white/95 backdrop-blur-md border-b border-neutral-200/60 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 mockr-gradient-hero rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl lg:text-2xl">M</span>
              </div>
              <span className="text-2xl lg:text-3xl font-bold text-gradient">Mockr</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 lg:space-x-6"
            >
              <button className="hidden md:block text-neutral-700 hover:text-blue-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-neutral-50">
                Gallery
              </button>
              <button className="hidden md:block text-neutral-700 hover:text-blue-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-neutral-50">
                About
              </button>
              <Link href="/sign-in">
                <button className="btn-secondary text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3">
                  Sign In
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="btn-primary text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3">
                  Get Started
                </button>
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative px-6 py-24 lg:py-40 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12 lg:space-y-16"
              >
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center space-x-2 bg-primary-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>AI-Powered Political Satire</span>
                  </motion.div>

                  <h1 className="text-display-md text-neutral-900">
                    Create{' '}
                    <span className="text-gradient">Intelligent</span>{' '}
                    Political Cartoons
                  </h1>

                  <p className="text-body-lg text-neutral-600 max-w-2xl">
                    Generate witty, shareable satirical content inspired by R.K. Laxman's legendary style.
                    Turn political commentary into viral-worthy cartoons with AI.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <Link href="/generate">
                    <button className="btn-primary group text-lg lg:text-xl px-10 py-5 lg:px-12 lg:py-6 shadow-md hover:shadow-lg">
                      Generate Your First Comic
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="btn-secondary group text-lg lg:text-xl px-10 py-5 lg:px-12 lg:py-6"
                  >
                    <Play className="w-5 h-5 mr-3" />
                    Watch Demo
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm lg:text-base text-neutral-600"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-medium">4.9/5 from creators</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-neutral-400 rounded-full" />
                  <span className="font-medium">2,847+ comics generated</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative"
              >
                <div className="relative shadow-lg rounded-3xl overflow-hidden">
                  <div className="bg-white p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-neutral-800">Quick Preview</h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-neutral-50 rounded-xl">
                        <p className="text-sm text-neutral-600 mb-2">Character: Politician</p>
                        <p className="text-sm text-neutral-800">"Promising universal healthcare..."</p>
                      </div>

                      <div className="flex justify-center">
                        <div className="w-48 h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mockr-gradient-hero rounded-full mx-auto mb-2 flex items-center justify-center">
                              <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-xs text-neutral-500">AI Generation in Progress...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-12 h-12 mockr-gradient-accent rounded-full flex items-center justify-center shadow-md"
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary-500 rounded-full shadow-md"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-32 lg:py-40 mockr-gradient-surface">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-display-sm text-neutral-900 mb-8">
                Why Choose Mockr?
              </h2>
              <p className="text-body-lg text-neutral-600 max-w-4xl mx-auto">
                Professional-quality political satire made accessible to everyone.
                Create, share, and go viral with intelligent humor.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-16 lg:gap-20">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 p-8 lg:p-12 text-center group relative overflow-hidden"
                >
                  <div className="absolute inset-0 mockr-gradient-surface opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 mockr-gradient-feature rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-lg">
                      <feature.icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                    <h3 className="text-heading-md text-neutral-900 mb-6">
                      {feature.title}
                    </h3>
                    <p className="text-body-md text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Comics Section */}
        <section className="px-6 py-32 lg:py-40 bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-display-sm text-neutral-900 mb-8">
                Trending Comics
              </h2>
              <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
                See what the community is creating with Mockr's AI-powered comic generator
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
              {sampleComics.map((comic, index) => (
                <motion.div
                  key={comic.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 mockr-gradient-surface opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="aspect-[4/3] mockr-gradient-subtle rounded-t-2xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 mockr-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                          <Sparkles className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                        </div>
                        <p className="text-neutral-500 font-medium text-sm lg:text-base">Sample Comic Placeholder</p>
                      </div>
                    </div>
                    <div className="p-8">
                    <h3 className="text-heading-sm text-neutral-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {comic.title}
                    </h3>
                    <p className="text-body-sm text-neutral-600 mb-6">
                      {comic.description}
                    </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm lg:text-base text-neutral-500">
                          <Star className="w-4 h-4 lg:w-5 lg:h-5 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{comic.likes} likes</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm lg:text-base font-medium transition-colors">
                          View Comic →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-36 lg:py-48 mockr-gradient-hero">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <h2 className="text-display-md text-white mb-8">
                Ready to Create Viral Political Satire?
              </h2>
              <p className="text-body-lg text-blue-100 max-w-4xl mx-auto mb-10">
                Join thousands of creators using Mockr to make intelligent political commentary.
                Your next viral cartoon is just one click away.
              </p>
              <Link href="/generate">
                <button className="bg-white text-blue-600 hover:bg-neutral-50 font-semibold text-lg py-5 px-10 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 group">
                  Start Creating for Free
                  <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 bg-neutral-900 text-neutral-300">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 mockr-gradient-hero rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <span className="text-xl font-bold text-white">Mockr</span>
                </div>
                <p className="text-sm text-neutral-400">
                  AI-powered satirical political cartoon generator inspired by R.K. Laxman's legendary style.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Comic Generator</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Content Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm text-neutral-400">
              <p>&copy; 2025 Mockr. All rights reserved. Created with intelligence, delivered with wit.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
