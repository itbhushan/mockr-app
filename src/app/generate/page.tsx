'use client'

import { useState } from 'react'
import { ArrowLeft, Sparkles, Upload, Zap, RefreshCw, Download, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function GeneratePage() {
  const [formData, setFormData] = useState({
    situation: '',
    characters: '',
    setting: '',
    tone: 'satirical',
    style: 'laxman'
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedComic, setGeneratedComic] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedComic('/placeholder-comic.jpg') // Placeholder for generated comic
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen mockr-gradient-subtle">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 lg:py-6 bg-white/95 backdrop-blur-md border-b border-neutral-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 text-neutral-600 hover:text-blue-600 transition-colors" />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 mockr-gradient-hero rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl lg:text-2xl">M</span>
              </div>
              <span className="text-2xl lg:text-3xl font-bold text-gradient">Mockr</span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <button className="btn-secondary text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3">
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
                <h1 className="text-display-sm text-neutral-900 mb-4">
                  Create Your Comic
                </h1>
                <p className="text-body-md text-neutral-600">
                  Describe your political satire idea and watch AI bring it to life in R.K. Laxman's iconic style.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Situation Input */}
                <div>
                  <label htmlFor="situation" className="block text-heading-sm text-neutral-900 mb-3">
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
                  <label htmlFor="characters" className="block text-heading-sm text-neutral-900 mb-3">
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
                  <label htmlFor="setting" className="block text-heading-sm text-neutral-900 mb-3">
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
                  <label htmlFor="tone" className="block text-heading-sm text-neutral-900 mb-3">
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
                  <label htmlFor="style" className="block text-heading-sm text-neutral-900 mb-3">
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
                  className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed group"
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
              <h2 className="text-heading-md text-neutral-900 mb-6">
                Preview
              </h2>

              {!generatedComic && !isGenerating && (
                <div className="aspect-[4/3] mockr-gradient-subtle rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 mockr-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                      <Sparkles className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                    <p className="text-neutral-500 font-medium mb-2">Your Comic Will Appear Here</p>
                    <p className="text-caption text-neutral-400">Fill out the form to generate your satirical masterpiece</p>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="aspect-[4/3] mockr-gradient-subtle rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 mockr-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center shadow-md animate-pulse">
                      <RefreshCw className="w-10 h-10 lg:w-12 lg:h-12 text-white animate-spin" />
                    </div>
                    <p className="text-neutral-600 font-medium mb-2">AI is Creating Your Comic...</p>
                    <p className="text-caption text-neutral-400">This may take a few moments</p>
                  </div>
                </div>
              )}

              {generatedComic && (
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-neutral-100 rounded-2xl flex items-center justify-center shadow-md">
                    <div className="text-center">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 mockr-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                        <Sparkles className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                      </div>
                      <p className="text-neutral-600 font-medium">Generated Comic Preview</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="btn-secondary group py-3">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    <button className="btn-accent group py-3">
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
                <h3 className="text-heading-sm text-blue-900 mb-3">
                  💡 Pro Tips
                </h3>
                <ul className="space-y-2 text-caption text-blue-700">
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