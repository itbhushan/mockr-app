'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 lg:py-6 bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 text-neutral-600 hover:text-neutral-900 transition-colors" />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-700 bg-clip-text text-transparent">Mockr</span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
        <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">About Mockr</h1>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Our Mission</h2>
            <p>
              Mockr is an AI-powered platform that empowers everyone to create witty, shareable political cartoons in seconds.
              We believe that satire and humor are powerful tools for social commentary and civic engagement.
            </p>
            <p>
              Our mission is to democratize political satire by making it accessible to everyone, regardless of artistic skills.
              Whether you&apos;re a journalist, activist, or citizen who wants to express their views, Mockr gives you the tools to
              create impactful visual commentary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">How It Works</h2>
            <p>
              Mockr uses advanced AI technology to generate political cartoons based on your descriptions. Simply describe
              a political situation or current event, and our AI will:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Generate a satirical quote that captures the irony or contradiction</li>
              <li>Create a detailed visual description for the cartoon</li>
              <li>Produce a black and white cartoon in classic editorial style</li>
            </ul>
            <p>
              All comics are saved locally in your browser, giving you full control over your creations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Expression:</strong> We support thoughtful political commentary and satire</li>
              <li><strong>Accessibility:</strong> No design skills required - everyone can create</li>
              <li><strong>Privacy:</strong> Your comics are stored locally, not on our servers</li>
              <li><strong>Quality:</strong> AI-generated content with human-level wit and insight</li>
              <li><strong>Responsibility:</strong> We encourage respectful discourse while maintaining creative freedom</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Technology</h2>
            <p>
              Mockr is built with cutting-edge AI technology including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Natural Language Processing for understanding political context</li>
              <li>Advanced AI models for generating satirical text</li>
              <li>Image generation AI for creating editorial-style cartoons</li>
              <li>Modern web technologies for a seamless user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Contact Us</h2>
            <p>
              Have questions, feedback, or suggestions? We&apos;d love to hear from you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Follow us on X (Twitter): <a href="https://x.com/MockrArt" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline">@MockrArt</a></li>
              <li>Connect on LinkedIn: <a href="https://linkedin.com/company/mockr" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline">Mockr</a></li>
              <li>Use the Feedback button in the app to send us your thoughts</li>
            </ul>
          </section>

          <section className="pt-6 border-t border-neutral-200">
            <p className="text-sm text-neutral-600">
              Mockr is developed with dedication to free speech, creative expression, and the power of satire to
              challenge authority and spark important conversations.
            </p>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-neutral-800 to-neutral-700 hover:from-neutral-900 hover:to-neutral-800 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
