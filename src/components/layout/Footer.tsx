'use client'

import Link from 'next/link'

export default function Footer() {
  return (
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
              <li><a href="/#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
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
  )
}
