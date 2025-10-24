import { SignIn } from '@clerk/nextjs'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center py-12 px-6">
      {/* Navigation */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 text-neutral-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Mockr</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-neutral-900 mb-4">
            Welcome Back
          </h1>
          <p className="text-lg leading-relaxed text-neutral-600 mb-8">
            Sign in to save your comics and access your personal gallery
          </p>
        </div>

        {/* Clerk SignIn Component */}
        <div className="flex justify-center">
          <SignIn
            routing="path"
            path="/sign-in"
            redirectUrl="/"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                card: "shadow-none",
                headerTitle: "text-neutral-900",
                headerSubtitle: "text-neutral-600",
                socialButtonsBlockButton:
                  "border-neutral-200 hover:border-neutral-300 text-neutral-700",
                socialButtonsBlockButtonText: "font-medium",
                formFieldInput:
                  "border-neutral-200 focus:border-blue-500 focus:ring-blue-500/20",
                footerActionLink: "text-blue-600 hover:text-blue-700"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}