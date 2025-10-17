'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useUser, UserButton, SignInButton } from '@clerk/nextjs'
import { Sparkles, Zap, Users, ArrowRight } from 'lucide-react'

export default function SimpleHomePage() {
  const { isSignedIn, user } = useUser()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/brand/mockr-signature.png"
                alt="Mockr"
                width={120}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </div>

            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <>
                  <Link href="/gallery">
                    <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      Gallery
                    </button>
                  </Link>
                  <Link href="/generate">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Create Comic
                    </button>
                  </Link>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <Link href="/sign-up">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Political Satire</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            {isSignedIn && user?.firstName ? (
              <>
                Welcome back, {user.firstName}! 👋<br />
                <span className="text-blue-600">Create</span> Amazing Cartoons
              </>
            ) : (
              <>
                Create{' '}
                <span className="text-blue-600">Intelligent</span>{' '}
                Political Cartoons
              </>
            )}
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            {isSignedIn ? (
              "Ready to create your next satirical masterpiece? Generate AI-powered political cartoons and share your unique perspective with the world."
            ) : (
              "Generate witty, shareable satirical content in classic editorial cartoon style. Turn political commentary into viral-worthy cartoons with AI."
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {isSignedIn ? (
              <>
                <Link href="/generate">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                    Create New Comic
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </Link>
                <Link href="/gallery">
                  <button className="bg-white hover:bg-gray-50 text-blue-600 font-semibold px-8 py-4 rounded-lg border border-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                    View Gallery
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/generate">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                    Generate Your First Comic
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </Link>
                <Link href="/gallery">
                  <button className="bg-white hover:bg-gray-50 text-blue-600 font-semibold px-8 py-4 rounded-lg border border-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                    Browse Gallery
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Mockr?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-quality political satire made accessible to everyone.
              Create, share, and go viral with intelligent humor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                AI-Powered Creativity
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate witty political cartoons in classic editorial style with cutting-edge AI technology.
              </p>
            </div>

            <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Instant Generation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Create professional-quality satirical content in under 60 seconds. From idea to shareable cartoon instantly.
              </p>
            </div>

            <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Viral Potential
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Clean, minimalistic design perfect for social media sharing. Make your political commentary go viral.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Create Viral Political Satire?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of creators using Mockr to make intelligent political commentary.
            Your next viral cartoon is just one click away.
          </p>
          <Link href="/generate">
            <button className="bg-white text-blue-600 hover:bg-gray-50 font-semibold text-lg py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Creating for Free
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}