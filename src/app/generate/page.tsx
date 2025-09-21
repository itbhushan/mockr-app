'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, RefreshCw, Download, Share2, Shuffle } from 'lucide-react'

export default function GeneratePage() {
  const [formData, setFormData] = useState({
    situation: '',
    characters: '',
    setting: '',
    tone: 'satirical',
    style: 'laxman'
  })
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
  const [currentStep, setCurrentStep] = useState<'form' | 'preview' | 'generate'>('form')

  const handleGenerateDescription = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGeneratingDescription(true)

    // Auto-fill empty fields based on the political situation
    const enhancedFormData = {
      ...formData,
      characters: formData.characters || autoFillCharacters(formData.situation),
      setting: formData.setting || autoFillSetting(formData.situation)
    }

    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedFormData),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedDescription(data.description)
        setCurrentStep('preview')
        console.log('Description generated:', data.description)
      } else {
        console.error('Description generation failed:', data.error)
        alert('Failed to generate description. Please try again.')
      }
    } catch (error) {
      console.error('Error calling API:', error)
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
    setCurrentStep('generate')

    try {
      const response = await fetch('/api/generate-comic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedComic({
          imageUrl: data.comic.imageUrl,
          aiGenerated: data.comic.aiGenerated,
          prompt: data.comic.prompt,
          dialogue: data.comic.dialogue,
          situation: data.comic.situation,
          id: data.comic.id
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

  const handleBackToForm = () => {
    setCurrentStep('form')
    setGeneratedDescription(null)
    setGeneratedComic(null)
    setSvgContent(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDownload = () => {
    if (!generatedComic) return

    if (generatedComic.imageUrl.startsWith('data:')) {
      // Download AI-generated image
      const link = document.createElement('a')
      link.href = generatedComic.imageUrl
      link.download = `mockr-comic-${generatedComic.id}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // For SVG placeholder, we need to convert it first
      fetch(generatedComic.imageUrl)
        .then(response => response.text())
        .then(svgText => {
          const blob = new Blob([svgText], { type: 'image/svg+xml' })
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `mockr-comic-${generatedComic.id}.svg`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        })
        .catch(error => {
          console.error('Download failed:', error)
          alert('Download failed. Please try again.')
        })
    }
  }

  const handleGenerateSample = async () => {
    setIsLoadingSample(true)
    try {
      const response = await fetch('/api/sample-scenario')
      const data = await response.json()

      if (data.success) {
        setFormData({
          situation: data.scenario.situation,
          characters: data.scenario.characters,
          setting: data.scenario.setting,
          tone: data.scenario.tone,
          style: data.scenario.style
        })
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
            <button className="bg-white hover:bg-neutral-50 text-blue-600 font-semibold rounded-xl border border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3">
              Save Draft
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden p-8 lg:p-10">
              <div className="mb-8">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-neutral-900 mb-4">
                  Create Your Comic
                </h1>
                <p className="text-lg lg:text-xl leading-relaxed text-neutral-600">
                  Describe your political satire idea and watch AI bring it to life in R.K. Laxman's iconic style.
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

              <form onSubmit={handleGenerateDescription} className="space-y-8">
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
                    placeholder="Describe the political scenario you want to satirize... (e.g., Politicians promising free healthcare while holding pharma stocks)"
                    className="textarea-primary h-24 resize-none"
                    required
                  />
                </div>

                {/* Compact Grid Layout for Other Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Characters Input */}
                  <div>
                    <label htmlFor="characters" className="block text-sm font-semibold leading-tight tracking-tight text-neutral-900 mb-2">
                      Characters
                    </label>
                    <input
                      type="text"
                      id="characters"
                      name="characters"
                      value={formData.characters}
                      onChange={handleInputChange}
                      placeholder="Auto-filled if empty"
                      className="input-primary text-sm"
                    />
                  </div>

                  {/* Background Input */}
                  <div>
                    <label htmlFor="setting" className="block text-sm font-semibold leading-tight tracking-tight text-neutral-900 mb-2">
                      Background
                    </label>
                    <input
                      type="text"
                      id="setting"
                      name="setting"
                      value={formData.setting}
                      onChange={handleInputChange}
                      placeholder="Auto-filled if empty"
                      className="input-primary text-sm"
                    />
                  </div>

                  {/* Tone Selection */}
                  <div>
                    <label htmlFor="tone" className="block text-sm font-semibold leading-tight tracking-tight text-neutral-900 mb-2">
                      Tone
                    </label>
                    <select
                      id="tone"
                      name="tone"
                      value={formData.tone}
                      onChange={handleInputChange}
                      className="input-primary text-sm"
                    >
                      <option value="satirical">Satirical</option>
                      <option value="witty">Witty</option>
                      <option value="observational">Observational</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  {/* Art Style Selection */}
                  <div>
                    <label htmlFor="style" className="block text-sm font-semibold leading-tight tracking-tight text-neutral-900 mb-2">
                      Art Style
                    </label>
                    <select
                      id="style"
                      name="style"
                      value={formData.style}
                      onChange={handleInputChange}
                      className="input-primary text-sm"
                    >
                      <option value="laxman">R.K. Laxman Classic</option>
                      <option value="modern">Modern Satirical</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="detailed">Detailed Editorial</option>
                    </select>
                  </div>
                </div>

                {/* Generate Comic Description Button - Always Available */}
                <button
                  type="submit"
                  disabled={isGeneratingDescription || !formData.situation}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed group"
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

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden p-8 lg:p-10 sticky top-32">
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
                      {generatedDescription ? 'Click "Generate Comic" to create your image' : 'Enter political situation and generate description first'}
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
                <div className="space-y-6">
                  <div className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-neutral-200" style={{ minHeight: '500px' }}>
                    {generatedComic.imageUrl.startsWith('data:') ? (
                      // Display AI-generated image with speech bubble and context overlay - FULL WIDTH
                      <div className="relative w-full h-full min-h-[500px]">
                        <Image
                          src={generatedComic.imageUrl}
                          alt="Generated political cartoon"
                          fill
                          className="object-contain rounded-2xl w-full h-full"
                          style={{ objectFit: 'contain' }}
                        />

                        {/* Speech Bubble - Enhanced positioning for better AI composition */}
                        <div className="absolute top-8 left-4 sm:top-12 sm:left-16 z-10">
                          <div className="relative">
                            {/* Speech bubble with enhanced visibility */}
                            <div className="relative bg-white/95 border-2 border-black rounded-full px-4 py-2 sm:px-6 sm:py-3 min-w-[120px] max-w-[240px] sm:min-w-[140px] sm:max-w-[280px] shadow-lg">
                              <p className="text-xs sm:text-sm font-semibold text-black leading-tight text-center">
                                {generatedComic.dialogue}
                              </p>
                              {/* Speech bubble pointer - positioned for better readability */}
                              <div className="absolute bottom-0 left-6 sm:left-8 transform translate-y-1/2">
                                <div className="w-0 h-0 border-l-[6px] sm:border-l-[8px] border-l-transparent border-r-[6px] sm:border-r-[8px] border-r-transparent border-t-[8px] sm:border-t-[12px] border-t-black"></div>
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[6px] sm:-translate-y-[10px] w-0 h-0 border-l-[4px] sm:border-l-[6px] border-l-transparent border-r-[4px] sm:border-r-[6px] border-r-transparent border-t-[6px] sm:border-t-[10px] border-t-white"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Situation Context - Enhanced visibility */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg">
                          <p className="text-xs sm:text-sm font-medium text-black bg-white/95 px-2 py-1 sm:px-3 sm:py-1 rounded border border-black text-center shadow-lg leading-tight">
                            {generatedComic.situation.length > 80
                              ? `${generatedComic.situation.substring(0, 80)}...`
                              : generatedComic.situation}
                          </p>
                        </div>

                        {/* Mockr Watermark - Enhanced visibility */}
                        <div className="absolute bottom-2 right-2 sm:right-4">
                          <p className="text-xs font-medium text-black bg-white/80 px-2 py-1 rounded">
                            Created by Mockr
                          </p>
                        </div>
                      </div>
                    ) : (
                      // Display SVG placeholder - FULL SIZE
                      <div
                        className="w-full h-full"
                        style={{backgroundColor: 'white', minHeight: '500px', padding: '10px'}}
                      >
                        {svgContent ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: svgContent.replace(
                                /<svg[^>]*>/,
                                '<svg width="100%" height="100%" style="width: 100%; height: 100%; min-height: 480px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">'
                              )
                            }}
                            className="w-full h-full"
                            style={{
                              width: '100%',
                              height: '100%',
                              minHeight: '480px'
                            }}
                          />
                        ) : (
                          <div className="text-center flex items-center justify-center h-full">
                            <div>
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                              <p className="text-sm text-gray-500">Loading comic...</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                  {/* Political Situation Context - Visible Below Comic */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 shadow-sm">
                    <p className="text-sm font-semibold text-blue-800 mb-2">Political Situation:</p>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      {generatedComic.situation}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleDownload}
                      className="bg-white hover:bg-neutral-50 text-blue-600 font-semibold rounded-xl border border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 group py-3 flex items-center justify-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    <button className="bg-gradient-to-r from-amber-500 to-amber-400 hover:opacity-90 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 group py-3">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>

                  <button
                    onClick={() => setGeneratedComic(null)}
                    className="w-full text-blue-600 hover:text-blue-700 transition-colors text-center py-2 border border-blue-200 rounded-lg"
                  >
                    ← Back to Description (Generate Another Version)
                  </button>
                </div>
              )}

              {/* Quick Tips */}
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
                <h3 className="text-xl lg:text-2xl font-semibold leading-tight tracking-tight text-blue-900 mb-3">
                  💡 Pro Tips
                </h3>
                <ul className="space-y-2 text-sm lg:text-base leading-relaxed text-blue-700">
                  <li>• Be specific about the political situation</li>
                  <li>• Include contradictions for better satire</li>
                  <li>• Mention visual elements you want to see</li>
                  <li>• Keep it timely and relatable</li>
                </ul>

                <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600">
                    <strong>🎨 Smart Comics:</strong> Currently using enhanced placeholder system with dynamic dialogue, speech bubbles, and context display. AI image generation coming soon!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}