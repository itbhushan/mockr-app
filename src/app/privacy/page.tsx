'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
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
        <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">Privacy Policy</h1>
        <p className="text-neutral-600 mb-8">Last updated: January 2025</p>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Introduction</h2>
            <p>
              At Mockr, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect
              your information when you use our AI-powered political cartoon generation service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-4">Account Information</h3>
            <p>
              When you sign up for Mockr, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address</li>
              <li>Name (optional)</li>
              <li>Authentication credentials (managed securely by Clerk)</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-4">Usage Information</h3>
            <p>
              When you use Mockr, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Political situations you describe</li>
              <li>Generated quotes and descriptions</li>
              <li>Usage patterns and frequency</li>
              <li>Technical information (browser type, device information)</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-4">Local Storage</h3>
            <p>
              Your generated comics are stored locally in your browser using localStorage. This means:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Comics are saved on your device, not our servers</li>
              <li>We do not have access to your saved comics</li>
              <li>Clearing your browser data will delete your saved comics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our AI-powered cartoon generation service</li>
              <li>Process your requests and generate political cartoons</li>
              <li>Maintain and secure your account</li>
              <li>Communicate with you about service updates and features</li>
              <li>Analyze usage patterns to improve our AI models</li>
              <li>Prevent abuse and ensure responsible use of the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Data Storage and Security</h2>
            <p>
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Authentication is handled securely through Clerk</li>
              <li>API requests are encrypted using HTTPS</li>
              <li>We do not store generated comic images on our servers</li>
              <li>Personal information is stored securely and accessed only when necessary</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Third-Party Services</h2>
            <p>
              Mockr uses the following third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Clerk:</strong> For authentication and user management</li>
              <li><strong>Google Gemini API:</strong> For AI text generation</li>
              <li><strong>Hugging Face:</strong> For AI image generation</li>
              <li><strong>Netlify:</strong> For hosting and content delivery</li>
            </ul>
            <p>
              Each of these services has their own privacy policies that govern how they handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt-out of promotional communications</li>
              <li>Export your data (comics are already stored locally on your device)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Cookies and Tracking</h2>
            <p>
              Mockr uses essential cookies for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintaining your login session</li>
              <li>Storing user preferences</li>
              <li>Analyzing site usage (anonymous aggregated data)</li>
            </ul>
            <p>
              You can control cookies through your browser settings, though this may affect functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Children&apos;s Privacy</h2>
            <p>
              Mockr is not intended for children under 13. We do not knowingly collect information from children.
              If you believe a child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by
              posting a notice on our website or sending you an email. Your continued use of Mockr after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle your data, please use the Feedback
              button in the app or contact us through our social media channels.
            </p>
          </section>

          <section className="pt-6 border-t border-neutral-200">
            <p className="text-sm text-neutral-600">
              By using Mockr, you acknowledge that you have read and understood this Privacy Policy.
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
