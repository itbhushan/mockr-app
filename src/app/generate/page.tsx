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
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedComic, setGeneratedComic] = useState<{
    imageUrl: string;
    aiGenerated: boolean;
    prompt: string;
    dialogue: string;
    id: string;
  } | null>(null)
  const [isLoadingSample, setIsLoadingSample] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

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
          id: data.comic.id
        })
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

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Situation Input */}
                <div>
                  <label htmlFor="situation" className="block text-xl lg:text-2xl font-semibold leading-tight tracking-tight text-neutral-900 mb-3">
                    Political Situation *
                  </label>
                  <textarea
                    id="situation"
                    name="situation"
                    value={formData.situation}
                    onChange={handleInputChange}
                    placeholder="Describe the political scenario you want to satirize... (e.g., Politicians promising free healthcare while holding pharma stocks)"
                    className="textarea-primary h-32 resize-none"
                    required
                  />
                </div>

                {/* Characters Input */}
                <div>
                  <label htmlFor="characters" className="block text-xl lg:text-2xl font-semibold leading-tight tracking-tight text-neutral-900 mb-3">
                    Characters
                  </label>
                  <input
                    type="text"
                    id="characters"
                    name="characters"
                    value={formData.characters}
                    onChange={handleInputChange}
                    placeholder="Who should be in the comic? (e.g., Politician, Common Man, Journalist)"
                    className="input-primary"
                  />
                </div>

                {/* Setting Input */}
                <div>
                  <label htmlFor="setting" className="block text-xl lg:text-2xl font-semibold leading-tight tracking-tight text-neutral-900 mb-3">
                    Setting
                  </label>
                  <input
                    type="text"
                    id="setting"
                    name="setting"
                    value={formData.setting}
                    onChange={handleInputChange}
                    placeholder="Where does this take place? (e.g., Parliament, Street, Office)"
                    className="input-primary"
                  />
                </div>

                {/* Tone Selection */}
                <div>
                  <label htmlFor="tone" className="block text-xl lg:text-2xl font-semibold leading-tight tracking-tight text-neutral-900 mb-3">
                    Tone
                  </label>
                  <select
                    id="tone"
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="input-primary"
                  >
                    <option value="satirical">Satirical</option>
                    <option value="witty">Witty</option>
                    <option value="observational">Observational</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                {/* Style Selection */}
                <div>
                  <label htmlFor="style" className="block text-xl lg:text-2xl font-semibold leading-tight tracking-tight text-neutral-900 mb-3">
                    Art Style
                  </label>
                  <select
                    id="style"
                    name="style"
                    value={formData.style}
                    onChange={handleInputChange}
                    className="input-primary"
                  >
                    <option value="laxman">R.K. Laxman Classic</option>
                    <option value="modern">Modern Satirical</option>
                    <option value="minimalist">Minimalist</option>
                    <option value="detailed">Detailed Editorial</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isGenerating || !formData.situation}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                      Generating Your Comic...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-3" />
                      Generate Comic
                    </>
                  )}
                </button>
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
                    <p className="text-sm lg:text-base leading-relaxed text-neutral-400">Fill out the form to generate your satirical masterpiece</p>
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
                  <div className="relative aspect-[4/3] bg-white rounded-2xl shadow-md overflow-hidden border border-neutral-200">
                    {generatedComic.imageUrl.startsWith('data:') ? (
                      // Display AI-generated image
                      <Image
                        src={generatedComic.imageUrl}
                        alt="Generated political cartoon"
                        fill
                        className="object-contain"
                      />
                    ) : (
                      // Display SVG placeholder
                      <iframe
                        src={generatedComic.imageUrl}
                        className="w-full h-full border-0"
                        title="Generated comic placeholder"
                      />
                    )}

                    {/* AI Status Badge */}
                    <div className="absolute top-3 right-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        generatedComic.aiGenerated
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {generatedComic.aiGenerated ? '🤖 AI Generated' : '📝 Placeholder'}
                      </div>
                    </div>
                  </div>

                  {/* Comic Info Display */}
                  {generatedComic.dialogue && (
                    <div className="mt-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                      <h4 className="text-sm font-semibold text-neutral-700 mb-2">📝 Comic Details:</h4>
                      <p className="text-xs text-neutral-500 mb-1"><strong>Dialogue:</strong> {generatedComic.dialogue}</p>
                      <p className="text-xs text-neutral-500"><strong>Style:</strong> {generatedComic.aiGenerated ? 'AI Generated with speech bubble' : 'Placeholder with embedded text'}</p>
                    </div>
                  )}

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
                    className="w-full text-blue-600 hover:text-blue-700 transition-colors text-center py-2"
                  >
                    Generate Another Version
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}