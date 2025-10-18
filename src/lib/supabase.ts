import { createClient } from '@supabase/supabase-js'

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

// Create Supabase client (only if configured)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Export flag for conditional features
export const SUPABASE_ENABLED = isSupabaseConfigured

// Database Types
export interface UserUsage {
  id: string
  user_id: string
  comics_generated: number
  date: string
  created_at: string
  updated_at: string
}

export interface UserFeedback {
  id: string
  user_id: string
  email?: string
  feedback_type: 'general' | 'bug' | 'feature_request'
  rating?: number
  message: string
  created_at: string
}

export interface UserRegistration {
  id: string
  user_id: string
  email?: string
  registration_number: number
  created_at: string
}

// Helper function to check if a user has reached their daily limit
export async function checkUserDailyLimit(userId: string): Promise<{
  allowed: boolean
  current: number
  limit: number
  message?: string
}> {
  if (!supabase) {
    return { allowed: true, current: 0, limit: 10, message: 'Rate limiting unavailable' }
  }

  try {
    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('user_usage')
      .select('comics_generated')
      .eq('user_id', userId)
      .eq('date', today)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned (first comic of the day)
      console.error('Error checking daily limit:', error)
      return { allowed: true, current: 0, limit: 10, message: 'Error checking limit' }
    }

    const current = data?.comics_generated || 0
    const limit = 10

    return {
      allowed: current < limit,
      current,
      limit,
      message: current >= limit ? 'Daily limit reached. Come back tomorrow!' : undefined
    }
  } catch (err) {
    console.error('Unexpected error checking daily limit:', err)
    return { allowed: true, current: 0, limit: 10, message: 'Error checking limit' }
  }
}

// Helper function to increment user's comic generation count
export async function incrementUserComicCount(userId: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured, skipping usage tracking')
    return true
  }

  try {
    const today = new Date().toISOString().split('T')[0]

    // Try to increment existing record
    const { data: existing } = await supabase
      .from('user_usage')
      .select('id, comics_generated')
      .eq('user_id', userId)
      .eq('date', today)
      .single()

    if (existing) {
      // Update existing record
      const { error } = await supabase
        .from('user_usage')
        .update({ comics_generated: existing.comics_generated + 1 })
        .eq('id', existing.id)

      if (error) {
        console.error('Error updating usage count:', error)
        return false
      }
    } else {
      // Create new record for today
      const { error } = await supabase
        .from('user_usage')
        .insert({
          user_id: userId,
          comics_generated: 1,
          date: today
        })

      if (error) {
        console.error('Error creating usage record:', error)
        return false
      }
    }

    return true
  } catch (err) {
    console.error('Unexpected error incrementing comic count:', err)
    return false
  }
}

// Helper function to check total user count (for 100 user cap)
export async function getTotalUserCount(): Promise<number> {
  if (!supabase) {
    return 0
  }

  try {
    const { count, error } = await supabase
      .from('user_registrations')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error getting user count:', error)
      return 0
    }

    return count || 0
  } catch (err) {
    console.error('Unexpected error getting user count:', err)
    return 0
  }
}

// Helper function to register a new user
export async function registerUser(userId: string, email?: string): Promise<{
  success: boolean
  userNumber?: number
  message?: string
}> {
  if (!supabase) {
    return { success: true, message: 'User tracking unavailable' }
  }

  try {
    // Check if user already registered
    const { data: existing } = await supabase
      .from('user_registrations')
      .select('registration_number')
      .eq('user_id', userId)
      .single()

    if (existing) {
      return {
        success: true,
        userNumber: existing.registration_number,
        message: 'User already registered'
      }
    }

    // Check total user count
    const totalUsers = await getTotalUserCount()
    if (totalUsers >= 100) {
      return {
        success: false,
        message: 'User limit reached. We are currently in MVP beta with limited spots.'
      }
    }

    // Register new user
    const { data, error } = await supabase
      .from('user_registrations')
      .insert({ user_id: userId, email })
      .select('registration_number')
      .single()

    if (error) {
      console.error('Error registering user:', error)
      return { success: false, message: 'Error during registration' }
    }

    return {
      success: true,
      userNumber: data.registration_number,
      message: `Welcome! You are user #${data.registration_number}`
    }
  } catch (err) {
    console.error('Unexpected error registering user:', err)
    return { success: false, message: 'Error during registration' }
  }
}

// Helper function to submit feedback
export async function submitFeedback(
  userId: string,
  email: string | undefined,
  feedbackType: 'general' | 'bug' | 'feature_request',
  message: string,
  rating?: number
): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured, feedback not saved')
    return false
  }

  try {
    const { error } = await supabase
      .from('user_feedback')
      .insert({
        user_id: userId,
        email,
        feedback_type: feedbackType,
        message,
        rating
      })

    if (error) {
      console.error('Error submitting feedback:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Unexpected error submitting feedback:', err)
    return false
  }
}
