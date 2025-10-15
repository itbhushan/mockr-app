'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Share2, Trash2, Download, ChevronDown, MessageCircle, Copy } from 'lucide-react'
import html2canvas from 'html2canvas'

// XIcon component for X (Twitter)
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

interface SavedComic {
  id: string
  imageUrl: string
  aiGenerated: boolean
  dialogue: string
  situation: string
  tone: string
  style: string
  createdAt: string
}

interface ComicWithSVG extends SavedComic {
  svgContent?: string
}

export default function GalleryPage() {
  const [savedComics, setSavedComics] = useState<ComicWithSVG[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeShareDropdown, setActiveShareDropdown] = useState<string | null>(null)
  const shareDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadSavedComics()
  }, [])

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target as Node)) {
        setActiveShareDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const loadSavedComics = async () => {
    setIsLoading(true)
    try {
      const saved = localStorage.getItem('mockr-saved-comics')
      if (saved) {
        const comics: SavedComic[] = JSON.parse(saved)
        const sortedComics = comics.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        // Fetch SVG content for placeholder comics
        const comicsWithSVG = await Promise.all(
          sortedComics.map(async (comic) => {
            if (!comic.aiGenerated && !comic.imageUrl.startsWith('data:')) {
              try {
                const apiUrl = `/api/placeholder-comic?dialogue=${encodeURIComponent(comic.dialogue)}&situation=${encodeURIComponent(comic.situation)}&t=${Date.now()}`
                const response = await fetch(apiUrl)
                const svgContent = await response.text()
                return { ...comic, svgContent }
              } catch (error) {
                console.error('Error fetching SVG for comic:', comic.id, error)
                return comic
              }
            }
            return comic
          })
        )

        setSavedComics(comicsWithSVG)
      }
    } catch (error) {
      console.error('Error loading saved comics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteComic = (id: string) => {
    const updatedComics = savedComics.filter(comic => comic.id !== id)
    setSavedComics(updatedComics)
    localStorage.setItem('mockr-saved-comics', JSON.stringify(updatedComics))
  }

  const captureComicScreenshot = async (comicId: string): Promise<Blob | null> => {
    try {
      const element = document.getElementById(`comic-card-${comicId}`)
      if (!element) {
        console.error('[Gallery] Comic element not found for ID:', comicId)
        return null
      }

      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 500))

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      })

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/jpeg', 0.95)
      })
    } catch (error) {
      console.error('[Gallery] Screenshot capture failed:', error)
      return null
    }
  }

  const handleCopyImage = async (comic: SavedComic) => {
    console.log('[Gallery] Copy image initiated for comic:', comic.id)

    const screenshotBlob = await captureComicScreenshot(comic.id)

    if (!screenshotBlob) {
      alert('❌ Failed to capture comic. Please try downloading instead.')
      return
    }

    try {
      // Convert JPEG blob to PNG blob (PNG is supported by Clipboard API)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas context not available')

      const img = new window.Image()
      const imageUrl = URL.createObjectURL(screenshotBlob)

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          URL.revokeObjectURL(imageUrl)
          resolve()
        }
        img.onerror = () => {
          URL.revokeObjectURL(imageUrl)
          reject(new Error('Failed to load image'))
        }
        img.src = imageUrl
      })

      // Convert canvas to PNG blob
      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Failed to create PNG blob'))
        }, 'image/png')
      })

      // Copy PNG to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': pngBlob
        })
      ])

      console.log('[Gallery] Image copied to clipboard successfully')
      alert('✅ Image copied to clipboard!\n\nPaste (Cmd+V or Ctrl+V) into WhatsApp, X, Slack, or any app.')
    } catch (error) {
      console.error('[Gallery] Failed to copy image:', error)
      alert('❌ Failed to copy image.\n\nYour browser may not support this feature.\nPlease use the Download button instead.')
    }

    setActiveShareDropdown(null)
  }

  const handleShare = async (comic: SavedComic, platform: 'share' | 'twitter' | 'whatsapp' | 'download') => {
    console.log('[Gallery] Share initiated for platform:', platform)

    // Detect if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    // Capture screenshot of the comic card
    const screenshotBlob = await captureComicScreenshot(comic.id)

    if (!screenshotBlob) {
      alert('❌ Failed to capture comic screenshot. Please try again.')
      return
    }

    const file = new File([screenshotBlob], 'mockr-comic.jpg', { type: 'image/jpeg' })

    if (platform === 'share') {
      // Universal share - use native share API on mobile
      if (isMobile && navigator.share) {
        try {
          await navigator.share({ files: [file] })
          setActiveShareDropdown(null)
          return
        } catch (error: any) {
          if (error.name === 'AbortError') {
            setActiveShareDropdown(null)
            return
          }
          console.error('[Gallery] Native share failed:', error)
        }
      }

      // Desktop: Copy to clipboard
      await handleCopyImage(comic)
      return
    }

    if (platform === 'twitter' || platform === 'whatsapp') {
      // Mobile platform-specific sharing
      if (isMobile && navigator.share) {
        try {
          await navigator.share({ files: [file] })
          setActiveShareDropdown(null)
          return
        } catch (error: any) {
          if (error.name === 'AbortError') {
            setActiveShareDropdown(null)
            return
          }
          console.error('[Gallery] Platform share failed:', error)
        }
      }
    }

    if (platform === 'download') {
      const downloadUrl = URL.createObjectURL(screenshotBlob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = 'mockr-comic.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(downloadUrl)
    }

    setActiveShareDropdown(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 lg:py-6 bg-white/95 backdrop-blur-md border-b border-neutral-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 text-neutral-600 hover:text-blue-600 transition-colors" />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl lg:text-2xl">M</span>
              </div>
              <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Mockr</span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/generate"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
            >
              Create New Comic
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-neutral-900 mb-4">
            Your Comic Gallery
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed text-neutral-600 mb-6">
            Browse through your created political cartoons and share your favorites
          </p>

          {savedComics.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-blue-700">
                <Clock className="w-4 h-4 inline mr-2" />
                {savedComics.length} comic{savedComics.length !== 1 ? 's' : ''} saved locally
              </p>
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-neutral-500">Loading your comics...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && savedComics.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-md">
              <Image
                src="/api/placeholder/96/96"
                alt="Empty gallery"
                width={48}
                height={48}
                className="text-white"
              />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">No Comics Yet</h2>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Start creating satirical political cartoons to see them appear in your gallery
            </p>
            <Link
              href="/generate"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 px-8 py-3 inline-block"
            >
              Create Your First Comic
            </Link>
          </motion.div>
        )}

        {/* Comics Grid */}
        {!isLoading && savedComics.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {savedComics.map((comic, index) => (
              <motion.div
                key={comic.id}
                id={`comic-card-${comic.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Comic Image */}
                <div className="aspect-[4/3] bg-white relative">
                  {comic.imageUrl.startsWith('data:') ? (
                    <Image
                      src={comic.imageUrl}
                      alt={`Comic: ${comic.situation.substring(0, 50)}...`}
                      fill
                      className="object-contain"
                    />
                  ) : comic.svgContent ? (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: 'white', aspectRatio: '4/3' }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: comic.svgContent.replace(
                            /<svg[^>]*>/,
                            '<svg width="100%" height="100%" style="width: 100%; height: 100%; max-width: 100%; max-height: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet">'
                          )
                        }}
                        className="w-full h-full"
                        style={{
                          width: '100%',
                          height: '100%',
                          aspectRatio: '4/3'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-neutral-500">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-sm">Loading comic...</p>
                      </div>
                    </div>
                  )}

                  {/* AI Generated Badge - Removed as all comics are AI-generated */}
                </div>

                {/* Comic Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                      "{comic.dialogue}"
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-3">
                      {comic.situation}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                    <span className="capitalize">{comic.tone} • {comic.style}</span>
                    <span>{formatDate(comic.createdAt)}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative" ref={activeShareDropdown === comic.id ? shareDropdownRef : null}>
                      <button
                        onClick={() => setActiveShareDropdown(activeShareDropdown === comic.id ? null : comic.id)}
                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg px-3 py-2 transition-colors flex items-center justify-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                        <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${activeShareDropdown === comic.id ? 'rotate-180' : ''}`} />
                      </button>

                      {activeShareDropdown === comic.id && (
                        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-neutral-200 z-10 overflow-hidden">
                          {typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? (
                            // Mobile: Show all 3 options (X, WhatsApp, Copy)
                            <>
                              <button
                                onClick={() => handleShare(comic, 'twitter')}
                                className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                <XIcon className="w-4 h-4 mr-3 text-neutral-900" />
                                Share on X
                              </button>
                              <button
                                onClick={() => handleShare(comic, 'whatsapp')}
                                className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                              >
                                <MessageCircle className="w-4 h-4 mr-3 text-green-500" />
                                Share on WhatsApp
                              </button>
                              <button
                                onClick={() => handleShare(comic, 'share')}
                                className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-purple-50 hover:text-purple-600 transition-colors border-t border-neutral-100"
                              >
                                <Copy className="w-4 h-4 mr-3 text-purple-500" />
                                Copy Image
                              </button>
                              <button
                                onClick={() => handleShare(comic, 'download')}
                                className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-amber-50 hover:text-amber-600 transition-colors border-t border-neutral-100"
                              >
                                <Download className="w-4 h-4 mr-3 text-amber-500" />
                                Download
                              </button>
                            </>
                          ) : (
                            // Desktop: Show only Copy Image and Download
                            <>
                              <button
                                onClick={() => handleShare(comic, 'share')}
                                className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                <Copy className="w-4 h-4 mr-3 text-blue-500" />
                                Copy Image
                              </button>
                              <button
                                onClick={() => handleShare(comic, 'download')}
                                className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-amber-50 hover:text-amber-600 transition-colors border-t border-neutral-100"
                              >
                                <Download className="w-4 h-4 mr-3 text-amber-500" />
                                Download
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => deleteComic(comic.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg px-3 py-2 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}