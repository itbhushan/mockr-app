// Simple file-based feedback storage (no database needed!)
import fs from 'fs'
import path from 'path'

export interface Feedback {
  id: string
  userId: string
  email?: string
  name?: string
  feedbackType: 'general' | 'bug' | 'feature_request'
  rating?: number
  message: string
  userAgent?: string
  createdAt: string
}

const FEEDBACK_FILE = path.join(process.cwd(), 'feedback-data.json')

/**
 * Get all feedback entries
 */
export function getAllFeedback(): Feedback[] {
  try {
    if (!fs.existsSync(FEEDBACK_FILE)) {
      return []
    }
    const data = fs.readFileSync(FEEDBACK_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading feedback file:', error)
    return []
  }
}

/**
 * Save new feedback entry
 */
export function saveFeedback(feedback: Omit<Feedback, 'id' | 'createdAt'>): boolean {
  try {
    const allFeedback = getAllFeedback()

    const newFeedback: Feedback = {
      ...feedback,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    }

    allFeedback.push(newFeedback)

    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(allFeedback, null, 2), 'utf-8')

    console.log(`✅ Feedback saved: ${newFeedback.id}`)
    return true
  } catch (error) {
    console.error('Error saving feedback:', error)
    return false
  }
}

/**
 * Export feedback as CSV string
 */
export function exportFeedbackAsCSV(): string {
  const allFeedback = getAllFeedback()

  if (allFeedback.length === 0) {
    return 'No feedback yet'
  }

  // CSV headers
  const headers = ['Date', 'Email', 'Name', 'Type', 'Rating', 'Message', 'User ID']
  const rows = allFeedback.map(f => [
    new Date(f.createdAt).toLocaleString(),
    f.email || '',
    f.name || '',
    f.feedbackType,
    f.rating?.toString() || '',
    `"${f.message.replace(/"/g, '""')}"`, // Escape quotes in message
    f.userId
  ])

  const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
  return csv
}

/**
 * Get feedback statistics
 */
export function getFeedbackStats(): {
  total: number
  byType: Record<string, number>
  averageRating: number
  recentCount: number
} {
  const allFeedback = getAllFeedback()

  const byType = allFeedback.reduce((acc, f) => {
    acc[f.feedbackType] = (acc[f.feedbackType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const ratings = allFeedback.filter(f => f.rating).map(f => f.rating!)
  const averageRating = ratings.length > 0
    ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
    : 0

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const recentCount = allFeedback.filter(f =>
    new Date(f.createdAt) > oneDayAgo
  ).length

  return {
    total: allFeedback.length,
    byType,
    averageRating: Math.round(averageRating * 10) / 10,
    recentCount
  }
}
