  'use client'

  import { useState } from 'react'
  import { motion } from 'framer-motion'
  import { Sparkles, Zap, Users, ArrowRight, Play, Star } from 'lucide-react'

  export default function HomePage() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

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
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
        {/* Navigation */}
        <nav className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 mockr-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-bold text-gradient">Mockr</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <button className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">
                Gallery
              </button>
              <button className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">
                About
              </button>
              <button className="btn-secondary">
                Sign In
              </button>
              <button className="btn-primary">
                Get Started
              </button>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative px-6 py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>AI-Powered Political Satire</span>
                  </motion.div>

                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                    Create{' '}
                    <span className="text-gradient">Intelligent</span>{' '}
                    Political Cartoons
                  </h1>

                  <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
                    Generate witty, shareable satirical content inspired by R.K. Laxman's legendary style.
                    Turn political commentary into viral-worthy cartoons with AI.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="btn-primary group">
                    Generate Your First Comic
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="btn-secondary group"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center space-x-6 text-sm text-neutral-500"
                >
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span>4.9/5 from creators</span>
                  </div>
                  <div className="w-1 h-1 bg-neutral-300 rounded-full" />
                  <span>2,847+ comics generated</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative"
              >
                <div className="relative mockr-shadow-strong rounded-3xl overflow-hidden">
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
                  className="absolute -top-6 -right-6 w-12 h-12 mockr-gradient-accent rounded-full flex items-center justify-center mockr-shadow-medium"
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary-500 rounded-full mockr-shadow-medium"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Why Choose Mockr?
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Professional-quality political satire made accessible to everyone.
                Create, share, and go viral with intelligent humor.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-hover p-8 text-center group"
                >
                  <div className="w-16 h-16 mockr-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Comics Section */}
        <section className="px-6 py-20 bg-gradient-to-br from-neutral-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Trending Comics
              </h2>
              <p className="text-xl text-neutral-600">
                See what the community is creating with Mockr
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {sampleComics.map((comic, index) => (
                <motion.div
                  key={comic.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-hover group cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-t-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mockr-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm text-neutral-500">Sample Comic Placeholder</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {comic.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-4">
                      {comic.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-neutral-500">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{comic.likes} likes</span>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View Comic →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 mockr-gradient-hero">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Ready to Create Viral Political Satire?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join thousands of creators using Mockr to make intelligent political commentary.
                Your next viral cartoon is just one click away.
              </p>
              <button className="bg-white text-primary-600 hover:bg-neutral-50 font-semibold py-4 px-8 rounded-xl transition-all duration-200 mockr-shadow-medium hover:mockr-shadow-strong transform
  hover:-translate-y-1 group">
                Start Creating for Free
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </button>
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
