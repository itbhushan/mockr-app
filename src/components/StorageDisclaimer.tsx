'use client'

import { useState, useEffect } from 'react'
import { HardDrive, Download, AlertCircle, X } from 'lucide-react'

export default function StorageDisclaimer() {
  const [isVisible, setIsVisible] = useState(false)
  const [comicCount, setComicCount] = useState(0)

  useEffect(() => {
    // Check if user has dismissed the banner
    const dismissed = localStorage.getItem('mockr-storage-disclaimer-dismissed')
    if (dismissed) {
      setIsVisible(false)
      return
    }

    // Check how many comics are saved
    const savedComics = localStorage.getItem('mockr-saved-comics')
    if (savedComics) {
      try {
        const comics = JSON.parse(savedComics)
        setComicCount(comics.length)

        // Show banner if user has 3+ comics
        if (comics.length >= 3) {
          setIsVisible(true)
        }
      } catch (error) {
        console.error('Error parsing saved comics:', error)
      }
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('mockr-storage-disclaimer-dismissed', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <HardDrive className="w-5 h-5 text-amber-700" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-amber-900 text-sm mb-1">
                💾 Comics Stored Locally
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                Your {comicCount} comic{comicCount !== 1 ? 's are' : ' is'} saved in your browser's local storage.
                We recommend downloading them to keep them safe!
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-amber-600 hover:text-amber-800 transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Storage Limits */}
          <div className="bg-white/50 rounded-lg p-3 mb-3">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-amber-900">
                <p className="font-medium mb-1">Browser Storage Limits:</p>
                <ul className="space-y-1 list-disc list-inside text-amber-800">
                  <li>Stores approximately 10-20 comics locally</li>
                  <li>May be cleared if you clear browser data</li>
                  <li>Not synced across devices or browsers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex items-center space-x-2">
            <Download className="w-4 h-4 text-amber-700" />
            <p className="text-xs text-amber-800 font-medium">
              Visit your Gallery to download all comics to your device
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
