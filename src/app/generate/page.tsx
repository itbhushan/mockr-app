'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, RefreshCw, Download, Share2, Shuffle, Twitter as XIcon, Facebook, MessageCircle, Copy, ChevronDown, FileImage, FileText } from 'lucide-react'
import html2canvas from 'html2canvas'

export default function GeneratePage() {
  const [formData, setFormData] = useState({
    situation: ''
  })
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false)
  const [generatedQuote, setGeneratedQuote] = useState<string | null>(null)
  const [editableQuote, setEditableQuote] = useState<string>('')
  const [isEditingQuote, setIsEditingQuote] = useState(false)
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false)
  const [generatedDescription, setGeneratedDescription] = useState<string | null>(null)
  const [editableDescription, setEditableDescription] = useState<string>('')
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedComic, setGeneratedComic] = useState<{
    imageUrl: string;
    aiGenerated: boolean;
    prompt: string;
    dialogue: string;
    situation: string;
    id: string;
  } | null>(null)
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [isLoadingSample, setIsLoadingSample] = useState(false)
  // const [currentStep, setCurrentStep] = useState<'form' | 'preview' | 'generate'>('form')
  const [showShareDropdown, setShowShareDropdown] = useState(false)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
  const shareDropdownRef = useRef<HTMLDivElement>(null)
  const downloadDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target as Node)) {
        setShowShareDropdown(false)
      }
      if (downloadDropdownRef.current && !downloadDropdownRef.current.contains(event.target as Node)) {
        setShowDownloadDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleGenerateQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGeneratingQuote(true)

    try {
      const response = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ situation: formData.situation }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Quote API response:', data)

      if (data.success) {
        setGeneratedQuote(data.quote)
        console.log('Quote generated successfully:', data.quote)
      } else {
        console.error('Quote generation failed:', data.error)
        alert(`❌ Failed to generate quote from AI.\n\nPlease click "Regenerate Quote" to try again.`)
      }
    } catch (error) {
      console.error('Error calling Quote API:', error)
      alert('❌ Failed to generate quote from AI.\n\nPlease click "Regenerate Quote" to try again.')
    } finally {
      setIsGeneratingQuote(false)
    }
  }

  const handleGenerateDescription = async () => {
    setIsGeneratingDescription(true)

    const quoteToUse = isEditingQuote ? editableQuote : generatedQuote

    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          situation: formData.situation,
          quote: quoteToUse
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Description API response:', data)

      if (data.success) {
        setGeneratedDescription(data.description)
        console.log('Description generated successfully:', data.description.substring(0, 100) + '...')
      } else {
        console.error('Description generation failed:', data.error)
        alert(`Failed to generate description: ${data.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error calling Description API:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsGeneratingDescription(false)
    }
  }

  const autoFillCharacters = (situation: string): string => {
    const situationLower = situation.toLowerCase()

    if (situationLower.includes('healthcare') || situationLower.includes('hospital')) {
      return 'Politician, Common Man, Doctor'
    } else if (situationLower.includes('education') || situationLower.includes('school')) {
      return 'Education Minister, Common Man, Student'
    } else if (situationLower.includes('climate') || situationLower.includes('environment')) {
      return 'Politician, Common Man, Environmental Activist'
    } else if (situationLower.includes('corruption') || situationLower.includes('money')) {
      return 'Politician, Common Man, Businessman'
    } else if (situationLower.includes('traffic') || situationLower.includes('transport')) {
      return 'Transport Minister, Common Man, Driver'
    } else {
      return 'Politician, Common Man'
    }
  }

  const autoFillSetting = (situation: string): string => {
    const situationLower = situation.toLowerCase()

    if (situationLower.includes('healthcare') || situationLower.includes('hospital')) {
      return 'Hospital or Government Office'
    } else if (situationLower.includes('education') || situationLower.includes('school')) {
      return 'School or Education Ministry'
    } else if (situationLower.includes('climate') || situationLower.includes('environment')) {
      return 'Conference Hall or Outdoor Setting'
    } else if (situationLower.includes('corruption') || situationLower.includes('money')) {
      return 'Government Office'
    } else if (situationLower.includes('traffic') || situationLower.includes('transport')) {
      return 'Traffic Jam or Transport Office'
    } else {
      return 'Government Office or Public Setting'
    }
  }

  const handleGenerateComic = async () => {
    setIsGenerating(true)

    const quoteToUse = isEditingQuote ? editableQuote : generatedQuote
    const descriptionToUse = isEditingDescription ? editableDescription : generatedDescription

    // Auto-generate characters, setting, tone, and style based on the situation
    const enhancedFormData = {
      situation: formData.situation,
      quote: quoteToUse,
      description: descriptionToUse,
      characters: autoFillCharacters(formData.situation),
      setting: autoFillSetting(formData.situation),
      tone: 'satirical',
      style: 'laxman'
    }

    try {
      const response = await fetch('/api/generate-comic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedFormData),
      })

      const data = await response.json()

      if (data.success) {
        const comic = {
          imageUrl: data.comic.imageUrl,
          aiGenerated: data.comic.aiGenerated,
          prompt: data.comic.prompt,
          dialogue: data.comic.dialogue,
          situation: data.comic.situation,
          id: data.comic.id
        }

        setGeneratedComic(comic)

        // Save to local storage for gallery
        saveComicToGallery({
          id: data.comic.id,
          imageUrl: data.comic.imageUrl,
          aiGenerated: data.comic.aiGenerated,
          dialogue: data.comic.dialogue,
          situation: data.comic.situation,
          tone: 'satirical',
          style: 'laxman',
          createdAt: new Date().toISOString()
        })

        // If it's a placeholder comic, fetch the SVG content
        if (!data.comic.aiGenerated) {
          try {
            const apiUrl = `/api/placeholder-comic?dialogue=${encodeURIComponent(data.comic.dialogue)}&situation=${encodeURIComponent(data.comic.situation)}&t=${Date.now()}`
            const svgResponse = await fetch(apiUrl)
            const svgText = await svgResponse.text()
            setSvgContent(svgText)
          } catch (error) {
            console.error('Error fetching SVG:', error)
          }
        } else {
          setSvgContent(null)
        }

        console.log('Comic generated:', data.comic)
      } else {
        console.error('Generation failed:', data.error)
        alert('Failed to generate comic. Please try again.')
      }
    } catch (error) {
      console.error('Error calling API:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  // const handleBackToForm = () => {
  //   setCurrentStep('form')
  //   setGeneratedDescription(null)
  //   setGeneratedComic(null)
  //   setSvgContent(null)
  // }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDownload = async (format: 'jpg' | 'png' | 'svg' | 'pdf' = 'jpg') => {
    if (!generatedComic) return

    const filename = `mockr-comic-${generatedComic.id}`

    // For JPG and PNG, use screenshot capture for full comic with quote and situation
    if (format === 'jpg' || format === 'png') {
      console.log('[Download] Capturing screenshot for', format)
      const screenshotBlob = await captureComicScreenshot()

      if (screenshotBlob) {
        const downloadUrl = URL.createObjectURL(screenshotBlob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = `${filename}.${format}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(downloadUrl)
        console.log('[Download] Screenshot downloaded successfully as', format)
        return
      } else {
        console.error('[Download] Screenshot capture failed, falling back to original method')
        // Fall through to original method
      }
    }

    // Handle other formats or fallback
    if (format === 'svg') {
      downloadSVGDirect(filename)
    } else if (format === 'pdf') {
      downloadAsPDF()
    } else if (format === 'png') {
      downloadPNGFromSVG(filename)
    } else if (format === 'jpg') {
      downloadJPGFromSVG(filename)
    }
  }

  const createCompositeImage = async (format: 'jpg' | 'png', filename: string) => {
    if (!generatedComic) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size - taller to include quote and situation
    canvas.width = 1200
    canvas.height = 1000

    // Fill white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw satirical quote at top with comic font styling
    ctx.fillStyle = '#92400e' // yellow-800
    ctx.font = 'bold 32px Comic Sans MS, fantasy'
    ctx.textAlign = 'center'

    // Draw quote header
    ctx.fillStyle = '#713f12' // yellow-900
    ctx.font = 'bold 20px Arial'
    ctx.fillText('💬 SATIRICAL QUOTE', canvas.width / 2, 50)

    // Draw quote text with wrapping
    ctx.fillStyle = '#92400e' // yellow-800
    ctx.font = 'bold 28px Comic Sans MS, fantasy'
    const quoteText = `"${generatedComic.dialogue}"`
    const quoteLines = wrapText(ctx, quoteText, canvas.width - 100)

    let yOffset = 100
    quoteLines.forEach(line => {
      ctx.fillText(line, canvas.width / 2, yOffset)
      yOffset += 40
    })

    // Add some spacing
    yOffset += 30

    try {
      // Load and draw the comic image
      const comicImg = new window.Image()
      await new Promise((resolve, reject) => {
        comicImg.onload = resolve
        comicImg.onerror = reject

        if (generatedComic.imageUrl.startsWith('data:')) {
          comicImg.src = generatedComic.imageUrl
        } else if (svgContent) {
          // Convert SVG to data URL
          const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
          const svgUrl = URL.createObjectURL(svgBlob)
          comicImg.src = svgUrl
        }
      })

      // Calculate comic dimensions to fit in available space
      const maxComicHeight = 600
      const availableWidth = canvas.width - 100
      let comicWidth = comicImg.width
      let comicHeight = comicImg.height

      // Scale to fit
      if (comicHeight > maxComicHeight) {
        const scale = maxComicHeight / comicHeight
        comicWidth *= scale
        comicHeight *= scale
      }

      if (comicWidth > availableWidth) {
        const scale = availableWidth / comicWidth
        comicWidth *= scale
        comicHeight *= scale
      }

      // Center and draw comic
      const comicX = (canvas.width - comicWidth) / 2
      ctx.drawImage(comicImg, comicX, yOffset, comicWidth, comicHeight)
      yOffset += comicHeight + 40

    } catch (error) {
      console.error('Error loading comic image:', error)
      // Draw placeholder if image fails
      ctx.fillStyle = '#e5e7eb'
      ctx.fillRect(50, yOffset, canvas.width - 100, 400)
      ctx.fillStyle = '#6b7280'
      ctx.font = '20px Arial'
      ctx.fillText('Comic Image', canvas.width / 2, yOffset + 200)
      yOffset += 440
    }

    // Draw political situation at bottom
    ctx.fillStyle = '#1e40af' // blue-800
    ctx.font = 'bold 18px Arial'
    ctx.fillText('📍 POLITICAL SITUATION', canvas.width / 2, yOffset)

    ctx.fillStyle = '#1e3a8a' // blue-900
    ctx.font = '16px Arial'
    const situationLines = wrapText(ctx, generatedComic.situation, canvas.width - 100)

    yOffset += 30
    situationLines.forEach(line => {
      ctx.fillText(line, canvas.width / 2, yOffset)
      yOffset += 25
    })

    // Add Mockr branding at bottom
    yOffset += 30
    ctx.fillStyle = '#000000'
    ctx.font = '14px Arial'
    ctx.fillText('Created by', canvas.width / 2 - 40, yOffset)

    ctx.fillStyle = '#1e40af'
    ctx.font = 'bold 18px Arial'
    ctx.fillText('Mockr', canvas.width / 2 + 20, yOffset)

    // Download the composite image
    canvas.toBlob(blob => {
      if (blob) {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${filename}.${format}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
      }
    }, `image/${format}`, format === 'jpg' ? 0.9 : 1.0)
  }

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ')
    const lines = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = ctx.measureText(currentLine + ' ' + word).width
      if (width < maxWidth) {
        currentLine += ' ' + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)
    return lines
  }

  const downloadSVGDirect = (filename: string) => {
    if (!svgContent) {
      alert('SVG content not available')
      return
    }

    try {
      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${filename}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('SVG download failed:', error)
      alert('Download failed. Please try again.')
    }
  }

  const downloadPNGFromSVG = async (filename: string) => {
    if (!generatedComic) {
      alert('❌ Comic content not available')
      return
    }

    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Larger canvas to include quote and situation
      canvas.width = 1200
      canvas.height = 1400 // Increased height for quote and situation

      // Fill white background
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      let yOffset = 40

      // Draw satirical quote at top
      ctx.fillStyle = '#15803d' // green-700
      ctx.font = 'bold 18px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('💬 SATIRICAL QUOTE', canvas.width / 2, yOffset)

      yOffset += 35

      ctx.fillStyle = '#166534' // green-800
      ctx.font = 'bold 24px Arial'
      const quoteText = `"${generatedComic.dialogue}"`
      const quoteLines = wrapText(ctx, quoteText, canvas.width - 100)

      quoteLines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, yOffset)
        yOffset += 32
      })

      yOffset += 30

      // Load and draw the comic image
      const img = new window.Image()
      let svgUrl: string | null = null

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          // Calculate comic dimensions to fit
          const maxComicHeight = 800
          const availableWidth = canvas.width - 60
          let comicWidth = img.width
          let comicHeight = img.height

          const aspectRatio = comicWidth / comicHeight

          if (comicHeight > maxComicHeight) {
            comicHeight = maxComicHeight
            comicWidth = maxComicHeight * aspectRatio
          }

          if (comicWidth > availableWidth) {
            comicWidth = availableWidth
            comicHeight = availableWidth / aspectRatio
          }

          // Center and draw comic
          const comicX = (canvas.width - comicWidth) / 2
          ctx.drawImage(img, comicX, yOffset, comicWidth, comicHeight)
          yOffset += comicHeight + 30

          // Clean up SVG URL if it was created
          if (svgUrl) {
            URL.revokeObjectURL(svgUrl)
          }

          resolve()
        }

        img.onerror = () => {
          if (svgUrl) {
            URL.revokeObjectURL(svgUrl)
          }
          reject(new Error('Failed to load image'))
        }

        // Handle both base64 data URLs and SVG content
        if (generatedComic.imageUrl.startsWith('data:')) {
          img.src = generatedComic.imageUrl
        } else if (svgContent) {
          const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
          svgUrl = URL.createObjectURL(svgBlob)
          img.src = svgUrl
        } else {
          reject(new Error('Comic content not available'))
        }
      })

      // Draw political situation at bottom
      ctx.fillStyle = '#1e40af' // blue-700
      ctx.font = 'bold 18px Arial'
      ctx.fillText('📍 POLITICAL SITUATION', canvas.width / 2, yOffset)

      yOffset += 30

      ctx.fillStyle = '#1e3a8a' // blue-900
      ctx.font = '16px Arial'
      const situationLines = wrapText(ctx, generatedComic.situation, canvas.width - 100)

      situationLines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, yOffset)
        yOffset += 24
      })

      // Download the composite image
      canvas.toBlob(blob => {
        if (blob) {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `${filename}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(link.href)
        }
      }, 'image/png')
    } catch (error) {
      console.error('PNG conversion failed:', error)
      alert('Download failed. Please try again.')
    }
  }

  const downloadJPGFromSVG = async (filename: string) => {
    if (!generatedComic) {
      alert('❌ Comic content not available')
      return
    }

    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Larger canvas to include quote and situation
      canvas.width = 1200
      canvas.height = 1400 // Increased height for quote and situation

      // Fill white background (important for JPG)
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      let yOffset = 40

      // Draw satirical quote at top
      ctx.fillStyle = '#15803d' // green-700
      ctx.font = 'bold 18px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('💬 SATIRICAL QUOTE', canvas.width / 2, yOffset)

      yOffset += 35

      ctx.fillStyle = '#166534' // green-800
      ctx.font = 'bold 24px Arial'
      const quoteText = `"${generatedComic.dialogue}"`
      const quoteLines = wrapText(ctx, quoteText, canvas.width - 100)

      quoteLines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, yOffset)
        yOffset += 32
      })

      yOffset += 30

      // Load and draw the comic image
      const img = new window.Image()
      let svgUrl: string | null = null

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          // Calculate comic dimensions to fit
          const maxComicHeight = 800
          const availableWidth = canvas.width - 60
          let comicWidth = img.width
          let comicHeight = img.height

          const aspectRatio = comicWidth / comicHeight

          if (comicHeight > maxComicHeight) {
            comicHeight = maxComicHeight
            comicWidth = maxComicHeight * aspectRatio
          }

          if (comicWidth > availableWidth) {
            comicWidth = availableWidth
            comicHeight = availableWidth / aspectRatio
          }

          // Center and draw comic
          const comicX = (canvas.width - comicWidth) / 2
          ctx.drawImage(img, comicX, yOffset, comicWidth, comicHeight)
          yOffset += comicHeight + 30

          // Clean up SVG URL if it was created
          if (svgUrl) {
            URL.revokeObjectURL(svgUrl)
          }

          resolve()
        }

        img.onerror = () => {
          if (svgUrl) {
            URL.revokeObjectURL(svgUrl)
          }
          reject(new Error('Failed to load image'))
        }

        // Handle both base64 data URLs and SVG content
        if (generatedComic.imageUrl.startsWith('data:')) {
          img.src = generatedComic.imageUrl
        } else if (svgContent) {
          const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
          svgUrl = URL.createObjectURL(svgBlob)
          img.src = svgUrl
        } else {
          reject(new Error('Comic content not available'))
        }
      })

      // Draw political situation at bottom
      ctx.fillStyle = '#1e40af' // blue-700
      ctx.font = 'bold 18px Arial'
      ctx.fillText('📍 POLITICAL SITUATION', canvas.width / 2, yOffset)

      yOffset += 30

      ctx.fillStyle = '#1e3a8a' // blue-900
      ctx.font = '16px Arial'
      const situationLines = wrapText(ctx, generatedComic.situation, canvas.width - 100)

      situationLines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, yOffset)
        yOffset += 24
      })

      // Download the composite image
      canvas.toBlob(blob => {
        if (blob) {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `${filename}.jpg`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(link.href)
        }
      }, 'image/jpeg', 0.95)
    } catch (error) {
      console.error('JPG conversion failed:', error)
      alert('Download failed. Please try again.')
    }
  }

  const convertSVGToPNG = (filename: string) => {
    if (!svgContent) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 1200
    canvas.height = 800

    const img = new window.Image()
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)

    img.onload = () => {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(blob => {
        if (blob) {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `${filename}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }, 'image/png')

      URL.revokeObjectURL(svgUrl)
    }

    img.src = svgUrl
  }

  const convertSVGToJPG = (filename: string) => {
    if (!svgContent) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 1200
    canvas.height = 800

    const img = new window.Image()
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)

    img.onload = () => {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(blob => {
        if (blob) {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `${filename}.jpg`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }, 'image/jpeg', 0.9)

      URL.revokeObjectURL(svgUrl)
    }

    img.src = svgUrl
  }

  const convertAndDownload = (format: 'png', filename: string) => {
    if (!generatedComic?.imageUrl.startsWith('data:')) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new window.Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      canvas.toBlob(blob => {
        if (blob) {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `${filename}.${format}`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }, `image/${format}`)
    }

    img.src = generatedComic.imageUrl
  }

  const downloadAsPDF = () => {
    // For PDF generation, we'll use a simple approach with jsPDF
    alert('PDF download feature coming soon! For now, please use PNG or JPG format.')
  }

  const saveComicToGallery = (comic: {
    id: string
    imageUrl: string
    aiGenerated: boolean
    dialogue: string
    situation: string
    tone: string
    style: string
    createdAt: string
  }) => {
    try {
      const existing = localStorage.getItem('mockr-saved-comics')
      const savedComics = existing ? JSON.parse(existing) : []

      // Check if comic already exists (prevent duplicates)
      const existingIndex = savedComics.findIndex((saved: any) => saved.id === comic.id)
      if (existingIndex >= 0) {
        // Update existing comic
        savedComics[existingIndex] = comic
      } else {
        // Add new comic to the beginning
        savedComics.unshift(comic)
      }

      // Keep only the latest 10 comics to prevent storage overflow
      // Note: Base64 images are large (~500KB-2MB each), so we limit to 10 to stay under localStorage quota (5-10MB)
      const trimmedComics = savedComics.slice(0, 10)

      localStorage.setItem('mockr-saved-comics', JSON.stringify(trimmedComics))
      console.log('Comic saved to gallery:', comic.id)
    } catch (error) {
      // Handle QuotaExceededError specifically
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded, reducing saved comics to 5')
        try {
          // Emergency fallback: keep only 5 most recent comics
          const existing = localStorage.getItem('mockr-saved-comics')
          const savedComics = existing ? JSON.parse(existing) : []
          const existingIndex = savedComics.findIndex((saved: any) => saved.id === comic.id)

          if (existingIndex >= 0) {
            savedComics[existingIndex] = comic
          } else {
            savedComics.unshift(comic)
          }

          const reducedComics = savedComics.slice(0, 5)
          localStorage.setItem('mockr-saved-comics', JSON.stringify(reducedComics))
          console.log('Comic saved to gallery with reduced limit:', comic.id)
        } catch (retryError) {
          // If still failing, clear storage and save only current comic
          console.error('Still exceeding quota, clearing old comics')
          localStorage.setItem('mockr-saved-comics', JSON.stringify([comic]))
        }
      } else {
        console.error('Error saving comic to gallery:', error)
      }
    }
  }

  const handleShare = async (platform: 'twitter' | 'facebook' | 'whatsapp' | 'copy') => {
    if (!generatedComic || !generatedComic.imageUrl) {
      alert('❌ Comic content not available. Please generate a comic first.')
      return
    }

    // No text needed - screenshot already contains quote and situation
    // Just share the image

    // Capture screenshot of the comic preview
    console.log('[Share] Attempting to capture screenshot...')
    const screenshotBlob = await captureComicScreenshot()

    if (!screenshotBlob) {
      console.error('[Share] Screenshot capture returned null')
      alert('❌ Failed to capture comic screenshot.\n\nPlease try:\n1. Wait for comic to fully load\n2. Try downloading instead (Download button)\n3. Check browser console for errors')
      return
    }

    console.log('[Share] Screenshot captured successfully, proceeding with', platform)

    const file = new File([screenshotBlob], 'mockr-comic.jpg', { type: 'image/jpeg' })

    switch (platform) {
      case 'twitter':
        // Download screenshot
        const downloadUrlX = URL.createObjectURL(screenshotBlob)
        const linkX = document.createElement('a')
        linkX.href = downloadUrlX
        linkX.download = 'mockr-comic.jpg'
        document.body.appendChild(linkX)
        linkX.click()
        document.body.removeChild(linkX)
        URL.revokeObjectURL(downloadUrlX)

        // Open X (Twitter) compose window - user will attach image manually
        const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('#MockrApp #PoliticalSatire')}`
        setTimeout(() => {
          window.open(xUrl, '_blank', 'width=550,height=400')
        }, 500)

        alert('✅ Comic screenshot downloaded!\n\n📝 X (Twitter) will open - attach the downloaded image to your post.')
        break

      case 'facebook':
        // Download screenshot
        const downloadUrlFb = URL.createObjectURL(screenshotBlob)
        const linkFb = document.createElement('a')
        linkFb.href = downloadUrlFb
        linkFb.download = 'mockr-comic.jpg'
        document.body.appendChild(linkFb)
        linkFb.click()
        document.body.removeChild(linkFb)
        URL.revokeObjectURL(downloadUrlFb)

        alert('✅ Comic screenshot downloaded!\n\n📝 Please upload it manually to Facebook.')
        break

      case 'whatsapp':
        // Detect if mobile or desktop
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

        if (isMobile) {
          // Mobile: Use native share sheet ONLY (no file downloads)
          // Try to share even if canShare reports false - some browsers support it anyway
          console.log('[Share] Mobile detected')
          console.log('[Share] User agent:', navigator.userAgent)
          console.log('[Share] navigator.share available:', !!navigator.share)

          if (navigator.share) {
            try {
              console.log('[Share] Attempting native share with image...')
              console.log('[Share] canShare available:', !!navigator.canShare)
              console.log('[Share] canShare files:', navigator.canShare ? navigator.canShare({ files: [file] }) : 'N/A')
              console.log('[Share] File details:', { name: file.name, type: file.type, size: file.size })

              // Try sharing with file only (no text message)
              await navigator.share({
                files: [file]
              })
              console.log('[Share] Native share successful!')
              return
            } catch (error: any) {
              console.error('[Share] Share with file failed:', error)

              // Check if user cancelled (AbortError) - this is normal, don't show error
              if (error.name === 'AbortError') {
                console.log('[Share] User cancelled share')
                return
              }

              // File sharing failed - skip text-only share (user wants image only)
              console.log('[Share] File sharing not supported, using download fallback')

              // All sharing attempts failed - download as fallback
              console.log('[Share] All share attempts failed, falling back to download')
              const downloadUrl = URL.createObjectURL(screenshotBlob)
              const link = document.createElement('a')
              link.href = downloadUrl
              link.download = 'mockr-comic.jpg'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              URL.revokeObjectURL(downloadUrl)

              alert('✅ Comic downloaded to your device!\n\nYou can now:\n1. Open WhatsApp\n2. Select a chat\n3. Tap attach (📎)\n4. Choose the downloaded comic\n5. Send!')
              return
            }
          } else {
            // Browser doesn't support Web Share API at all
            alert('❌ Your browser does not support sharing.\n\nPlease try:\n1. Update your browser\n2. Use the Download button instead')
            return
          }
        } else {
          // Desktop: Copy to clipboard and open WhatsApp Web
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/jpeg': screenshotBlob
              })
            ])

            // Open WhatsApp Web
            setTimeout(() => {
              window.open('https://web.whatsapp.com', '_blank')
            }, 500)

            alert('✅ Comic screenshot copied to clipboard!\n\n📝 WhatsApp Web will open:\n\n1. Select a chat\n2. Paste (Ctrl+V / Cmd+V) the image directly\n3. Add your message and send!')
          } catch (clipboardError) {
            console.error('[Share] Clipboard copy failed:', clipboardError)
            alert('❌ Failed to copy image to clipboard.\n\nPlease use the Download button instead.')
          }
        }
        break

      case 'copy':
        // Copy screenshot to clipboard
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/jpeg': screenshotBlob
            })
          ])
          alert('✅ Comic screenshot copied to clipboard!\n\nYou can now paste it anywhere.')
        } catch (err) {
          console.error('[Clipboard] Failed to copy screenshot:', err)
          alert('❌ Failed to copy to clipboard')
        }
        break
    }
  }

  const handleGenerateSample = async () => {
    setIsLoadingSample(true)
    try {
      const response = await fetch('/api/sample-scenario')
      const data = await response.json()

      if (data.success) {
        setFormData({
          situation: data.scenario.situation
        })
        // Reset other states when loading new sample
        setGeneratedQuote(null)
        setGeneratedDescription(null)
        setGeneratedComic(null)
        setSvgContent(null)
        setIsEditingQuote(false)
        setIsEditingDescription(false)
        console.log('Sample scenario loaded:', data.scenario)
      } else {
        console.error('Sample generation failed:', data.error)
        alert('Failed to generate sample. Please try again.')
      }
    } catch (error) {
      console.error('Error loading sample:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoadingSample(false)
    }
  }

  // Screenshot capture function for sharing
  const captureComicScreenshot = async (): Promise<Blob | null> => {
    try {
      console.log('[Screenshot] Starting capture...')

      const element = document.getElementById('comic-preview-capture')
      if (!element) {
        console.error('[Screenshot] Element not found: comic-preview-capture')
        return null
      }

      console.log('[Screenshot] Element found, capturing with html2canvas...')

      // Wait for images to load and layout to settle
      await new Promise(resolve => setTimeout(resolve, 500))

      // Capture the element as canvas with high quality
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // High resolution
        useCORS: true, // Handle cross-origin images
        logging: false,
        allowTaint: true,
        foreignObjectRendering: false, // Better compatibility
        imageTimeout: 15000 // Wait for images to load
      })

      console.log('[Screenshot] Canvas captured successfully:', canvas.width, 'x', canvas.height)

      // Convert canvas to blob
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            console.log('[Screenshot] Blob created successfully:', blob.size, 'bytes')
          } else {
            console.error('[Screenshot] Failed to create blob')
          }
          resolve(blob)
        }, 'image/jpeg', 0.95)
      })
    } catch (error) {
      console.error('[Screenshot] Capture failed:', error)
      return null
    }
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
              href="/gallery"
              className="bg-white hover:bg-neutral-50 text-blue-600 font-semibold rounded-xl border border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
            >
              Gallery
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Form Section - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden p-6 lg:p-8">
              <div className="mb-8">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-neutral-900 mb-4">
                  Create Your Comic
                </h1>
                <p className="text-lg lg:text-xl leading-relaxed text-neutral-600">
                  Describe your political satire idea and watch AI bring it to life in classic editorial cartoon style.
                </p>
              </div>

              {/* Sample Generation Button */}
              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Need Inspiration?</h3>
                    <p className="text-sm text-blue-700">Get a curated political scenario to start with</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleGenerateSample}
                    disabled={isLoadingSample}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isLoadingSample ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <Shuffle className="w-4 h-4" />
                        <span>Generate Sample</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <form onSubmit={handleGenerateQuote} className="space-y-8">
                {/* Political Situation Input - Full Width */}
                <div>
                  <label htmlFor="situation" className="block text-lg font-semibold leading-tight tracking-tight text-neutral-900 mb-2">
                    Political Situation *
                  </label>
                  <textarea
                    id="situation"
                    name="situation"
                    value={formData.situation}
                    onChange={handleInputChange}
                    placeholder="Enter any political situation or current news happening in the world... (e.g., Politicians visiting hospitals to promote healthcare reforms, Ministers inaugurating new schools while sending their kids abroad, Leaders attending climate summits after taking private jets)"
                    className="textarea-primary h-24 resize-none"
                    required
                  />
                  <p className="text-sm text-neutral-500 mt-2">
                    Our AI will automatically handle characters, background, tone and art style based on your situation.
                  </p>
                </div>

                {/* Generate Quote Button */}
                <button
                  type="submit"
                  disabled={isGeneratingQuote || !formData.situation}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isGeneratingQuote ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                      Generating Quote...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-3" />
                      {generatedQuote ? 'Regenerate Quote' : 'Generate Satirical Quote'}
                    </>
                  )}
                </button>

                {/* Quote Preview and Edit */}
                {generatedQuote && (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-green-900">Satirical Quote:</h3>
                        <button
                          type="button"
                          onClick={() => {
                            if (!isEditingQuote) {
                              setEditableQuote(generatedQuote)
                              setIsEditingQuote(true)
                            } else {
                              setGeneratedQuote(editableQuote)
                              setIsEditingQuote(false)
                            }
                          }}
                          className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition-colors"
                        >
                          {isEditingQuote ? 'Save Changes' : 'Edit Quote'}
                        </button>
                      </div>

                      {isEditingQuote ? (
                        <textarea
                          value={editableQuote}
                          onChange={(e) => setEditableQuote(e.target.value)}
                          className="w-full h-20 p-3 text-sm text-green-800 bg-white border border-green-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Edit the quote..."
                        />
                      ) : (
                        <p className="text-lg text-green-800 leading-relaxed font-medium italic">
                          {generatedQuote}
                        </p>
                      )}
                    </div>

                    {/* Generate Comic Description Button */}
                    <button
                      type="button"
                      onClick={handleGenerateDescription}
                      disabled={isGeneratingDescription || isEditingQuote}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGeneratingDescription ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                          Generating Description...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-3" />
                          {generatedDescription ? 'Regenerate Comic Description' : 'Generate Comic Description'}
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Description Preview and Edit */}
                {generatedDescription && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-blue-900">Comic Description:</h3>
                        <button
                          type="button"
                          onClick={() => {
                            if (!isEditingDescription) {
                              setEditableDescription(generatedDescription)
                              setIsEditingDescription(true)
                            } else {
                              setGeneratedDescription(editableDescription)
                              setIsEditingDescription(false)
                            }
                          }}
                          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors"
                        >
                          {isEditingDescription ? 'Save Changes' : 'Edit Description'}
                        </button>
                      </div>

                      {isEditingDescription ? (
                        <textarea
                          value={editableDescription}
                          onChange={(e) => setEditableDescription(e.target.value)}
                          className="w-full h-32 p-3 text-sm text-blue-800 bg-white border border-blue-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Edit the comic description..."
                        />
                      ) : (
                        <p className="text-sm text-blue-800 leading-relaxed whitespace-pre-wrap">
                          {generatedDescription}
                        </p>
                      )}
                    </div>

                    {/* Generate Comic Button - Always Available When Description Exists */}
                    <button
                      type="button"
                      onClick={handleGenerateComic}
                      disabled={isGenerating || isEditingDescription}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                          Generating Comic...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-3" />
                          {generatedComic ? 'Generate Another Comic Version' : 'Generate Comic'}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Preview Section - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden p-6 lg:p-8 sticky top-32">
              <h2 className="text-2xl lg:text-3xl font-semibold leading-tight tracking-tight text-neutral-900 mb-6">
                Preview
              </h2>

              {!generatedComic && !isGenerating && (
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                      <Sparkles className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                    <p className="text-neutral-500 font-medium mb-2">Your Comic Will Appear Here</p>
                    <p className="text-sm lg:text-base leading-relaxed text-neutral-400">
                      {generatedDescription ? 'Click "Generate Comic" to create your image' : generatedQuote ? 'Click "Generate Comic Description" to continue' : 'Enter political situation and generate quote first'}
                    </p>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md animate-pulse">
                      <RefreshCw className="w-10 h-10 lg:w-12 lg:h-12 text-white animate-spin" />
                    </div>
                    <p className="text-neutral-600 font-medium mb-2">AI is Creating Your Comic...</p>
                    <p className="text-sm lg:text-base leading-relaxed text-neutral-400">This may take a few moments</p>
                  </div>
                </div>
              )}

              {generatedComic && (
                <div className="space-y-4">
                  {/* Wrapping div with ID for screenshot capture */}
                  <div id="comic-preview-capture" className="bg-white rounded-2xl shadow-sm border border-neutral-100">
                    {/* Comic Image - Larger Display */}
                    <div className="aspect-square bg-white relative">
                      {generatedComic.imageUrl.startsWith('data:') ? (
                        <Image
                          src={generatedComic.imageUrl}
                          alt={`Comic: ${generatedComic.situation.substring(0, 50)}...`}
                          fill
                          className="object-contain"
                        />
                      ) : svgContent ? (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: 'white', aspectRatio: '4/3' }}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: svgContent.replace(
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

                    {/* Comic Details - Compact */}
                    <div className="p-4">
                      <div className="mb-3">
                        <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                          "{generatedComic.dialogue}"
                        </h3>
                        <p className="text-xs text-neutral-600">
                          {generatedComic.situation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Compact */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Enhanced Download Dropdown */}
                    <div className="relative" ref={downloadDropdownRef}>
                      <button
                        onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                        className="bg-white hover:bg-neutral-50 text-blue-600 text-sm font-medium rounded-lg border border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md group py-2 w-full flex items-center justify-center"
                      >
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        Download
                        <ChevronDown className={`w-3.5 h-3.5 ml-1.5 transition-transform ${showDownloadDropdown ? 'rotate-180' : ''}`} />
                      </button>

                      {showDownloadDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-neutral-200 z-10 overflow-hidden">
                          <button
                            onClick={() => { handleDownload('jpg'); setShowDownloadDropdown(false) }}
                            className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <FileImage className="w-4 h-4 mr-3 text-blue-500" />
                            Download as JPG
                          </button>
                          <button
                            onClick={() => { handleDownload('png'); setShowDownloadDropdown(false) }}
                            className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <FileImage className="w-4 h-4 mr-3 text-green-500" />
                            Download as PNG
                          </button>
                          <button
                            onClick={() => { handleDownload('svg'); setShowDownloadDropdown(false) }}
                            className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                          >
                            <FileText className="w-4 h-4 mr-3 text-purple-500" />
                            Download as SVG
                          </button>
                          <button
                            onClick={() => { handleDownload('pdf'); setShowDownloadDropdown(false) }}
                            className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-red-50 hover:text-red-600 transition-colors border-t border-neutral-100"
                          >
                            <FileText className="w-4 h-4 mr-3 text-red-500" />
                            Download as PDF
                            <span className="ml-auto text-xs text-neutral-400">(Soon)</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Enhanced Share Dropdown */}
                    <div className="relative" ref={shareDropdownRef}>
                      <button
                        onClick={() => setShowShareDropdown(!showShareDropdown)}
                        className="bg-gradient-to-r from-amber-500 to-amber-400 hover:opacity-90 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md group py-2 w-full flex items-center justify-center"
                      >
                        <Share2 className="w-3.5 h-3.5 mr-1.5" />
                        Share
                        <ChevronDown className={`w-3.5 h-3.5 ml-1.5 transition-transform ${showShareDropdown ? 'rotate-180' : ''}`} />
                      </button>

                      {showShareDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-neutral-200 z-10 overflow-hidden">
                          <button
                            onClick={() => { handleShare('twitter'); setShowShareDropdown(false) }}
                            className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <XIcon className="w-4 h-4 mr-3 text-neutral-900" />
                            Share on X
                          </button>
                          <button
                            onClick={() => { handleShare('facebook'); setShowShareDropdown(false) }}
                            className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <Facebook className="w-4 h-4 mr-3 text-blue-600" />
                            Share on Facebook
                          </button>
                          <button
                            onClick={() => { handleShare('whatsapp'); setShowShareDropdown(false) }}
                            className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4 mr-3 text-green-500" />
                            Share on WhatsApp
                          </button>
                          <button
                            onClick={() => { handleShare('copy'); setShowShareDropdown(false) }}
                            className="w-full flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-800 transition-colors border-t border-neutral-100"
                          >
                            <Copy className="w-4 h-4 mr-3 text-neutral-500" />
                            Copy Link
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setGeneratedComic(null)}
                    className="w-full text-blue-600 hover:text-blue-700 transition-colors text-center py-2 border border-blue-200 rounded-lg"
                  >
                    ← Back to Description (Generate Another Version)
                  </button>
                </div>
              )}

              {/* Quick Tip - Single Simple Guidance */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-900">
                  💡 <span className="font-semibold">Tip:</span> Describe a frustrating political or news situation - be specific about the contradiction or irony
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}