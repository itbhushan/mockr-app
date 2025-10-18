'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, TrendingUp } from 'lucide-react'

interface UsageStats {
  allowed: boolean
  current: number
  limit: number
  remaining: number
  message?: string
}

export default function UsageIndicator() {
  const [usage, setUsage] = useState<UsageStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await fetch('/api/check-limit')

        if (!response.ok) {
          if (response.status === 401) {
            // User not authenticated - don't show error
            setIsLoading(false)
            return
          }
          throw new Error('Failed to fetch usage stats')
        }

        const data = await response.json()
        setUsage(data)
      } catch (err) {
        console.error('Error fetching usage:', err)
        setError('Failed to load usage stats')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsage()
  }, [])

  // Don't render if loading or no usage data
  if (isLoading || !usage) return null

  // Don't render if there's an error
  if (error) return null

  // Calculate percentage
  const percentage = (usage.current / usage.limit) * 100

  // Determine color scheme based on usage
  const getColorScheme = () => {
    if (percentage >= 100) return 'bg-red-50 border-red-200 text-red-900'
    if (percentage >= 80) return 'bg-amber-50 border-amber-200 text-amber-900'
    if (percentage >= 50) return 'bg-yellow-50 border-yellow-200 text-yellow-900'
    return 'bg-green-50 border-green-200 text-green-900'
  }

  const getProgressBarColor = () => {
    if (percentage >= 100) return 'bg-red-500'
    if (percentage >= 80) return 'bg-amber-500'
    if (percentage >= 50) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className={`rounded-xl border p-4 shadow-sm ${getColorScheme()}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {percentage >= 100 ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <TrendingUp className="w-5 h-5" />
          )}
          <div>
            <h3 className="font-semibold text-sm">Daily Usage</h3>
            <p className="text-xs opacity-80">
              {usage.current} of {usage.limit} comics used today
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{usage.remaining}</p>
          <p className="text-xs opacity-80">remaining</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${getProgressBarColor()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {/* Warning Messages */}
      {percentage >= 100 && (
        <p className="text-xs mt-3 font-medium">
          ⚠️ Daily limit reached. Come back tomorrow for more comics!
        </p>
      )}
      {percentage >= 80 && percentage < 100 && (
        <p className="text-xs mt-3 font-medium">
          💡 You're close to your daily limit. Use them wisely!
        </p>
      )}
    </div>
  )
}
