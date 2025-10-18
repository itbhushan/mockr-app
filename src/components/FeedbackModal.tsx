'use client'

import { useState } from 'react'
import { X, MessageSquare, Star } from 'lucide-react'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState<'general' | 'bug' | 'feature_request'>('general')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedbackType,
          message,
          rating: rating > 0 ? rating : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit feedback')
      }

      // Success!
      setSubmitSuccess(true)
      setMessage('')
      setRating(0)
      setFeedbackType('general')

      // Close modal after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Share Your Feedback</h2>
              <p className="text-sm text-neutral-600">Help us improve Mockr</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="p-6 bg-green-50 border-b border-green-200">
            <p className="text-green-900 font-semibold text-center">
              ✅ Thank you for your feedback!
            </p>
          </div>
        )}

        {/* Form */}
        {!submitSuccess && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Feedback Type */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-3">
                What type of feedback do you have?
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFeedbackType('general')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    feedbackType === 'general'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-2xl mb-1">💬</div>
                  <div className="text-xs font-medium">General</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('bug')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    feedbackType === 'bug'
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-2xl mb-1">🐛</div>
                  <div className="text-xs font-medium">Bug Report</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('feature_request')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    feedbackType === 'feature_request'
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-2xl mb-1">💡</div>
                  <div className="text-xs font-medium">Feature</div>
                </button>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-3">
                How would you rate your experience? (Optional)
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-neutral-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="feedback-message" className="block text-sm font-semibold text-neutral-900 mb-2">
                Your Feedback *
              </label>
              <textarea
                id="feedback-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you think... What did you like? What can we improve?"
                className="w-full h-32 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white font-semibold rounded-xl py-3 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>

            {/* Privacy Note */}
            <p className="text-xs text-neutral-500 text-center">
              Your feedback helps us make Mockr better for everyone. Thank you! 🙏
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
