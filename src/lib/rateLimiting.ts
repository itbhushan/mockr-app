// Clerk-based rate limiting (no database required!)
import { clerkClient } from '@clerk/nextjs/server'

export const DAILY_COMIC_LIMIT = 10
export const MAX_MVP_USERS = 100

// Whitelisted testing email addresses with unlimited access
const UNLIMITED_ACCESS_EMAILS = [
  'bhuvnagreens@gmail.com',
  'refundreturn8@gmail.com'
]

export interface DailyUsage {
  date: string
  count: number
  lastGenerated: string
}

export interface UserMetadata {
  dailyUsage?: DailyUsage
  totalComics?: number
  registrationNumber?: number
  registeredAt?: string
}

/**
 * Check if user has reached their daily comic generation limit
 */
export async function checkDailyLimit(userId: string): Promise<{
  allowed: boolean
  current: number
  limit: number
  message?: string
}> {
  try {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const metadata = (user.publicMetadata || {}) as UserMetadata

    // Check if user has unlimited access (whitelisted testing accounts)
    const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase()
    if (userEmail && UNLIMITED_ACCESS_EMAILS.includes(userEmail)) {
      console.log(`[Rate Limit] Unlimited access granted for testing account: ${userEmail}`)
      return {
        allowed: true,
        current: 0,
        limit: 999999, // Show as unlimited in UI
        message: 'Testing account - unlimited access'
      }
    }

    const today = new Date().toISOString().split('T')[0]
    const dailyUsage = metadata.dailyUsage

    // Check if usage is from today
    if (dailyUsage && dailyUsage.date === today) {
      const current = dailyUsage.count
      const allowed = current < DAILY_COMIC_LIMIT

      return {
        allowed,
        current,
        limit: DAILY_COMIC_LIMIT,
        message: allowed ? undefined : 'Daily limit reached. Come back tomorrow for more comics!'
      }
    }

    // New day or first time
    return {
      allowed: true,
      current: 0,
      limit: DAILY_COMIC_LIMIT
    }
  } catch (error) {
    console.error('Error checking daily limit:', error)
    // Fail open - allow generation if check fails
    return {
      allowed: true,
      current: 0,
      limit: DAILY_COMIC_LIMIT,
      message: 'Rate limiting unavailable'
    }
  }
}

/**
 * Increment user's daily comic count
 */
export async function incrementComicCount(userId: string): Promise<boolean> {
  try {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const metadata = (user.publicMetadata || {}) as UserMetadata

    // Skip incrementing for whitelisted testing accounts
    const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase()
    if (userEmail && UNLIMITED_ACCESS_EMAILS.includes(userEmail)) {
      console.log(`[Rate Limit] Skipping count increment for testing account: ${userEmail}`)
      return true
    }

    const today = new Date().toISOString().split('T')[0]
    const now = new Date().toISOString()

    let newCount = 1
    let totalComics = (metadata.totalComics || 0) + 1

    // Check if we need to reset or increment
    if (metadata.dailyUsage && metadata.dailyUsage.date === today) {
      newCount = metadata.dailyUsage.count + 1
    }

    // Update user metadata
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...metadata,
        dailyUsage: {
          date: today,
          count: newCount,
          lastGenerated: now
        },
        totalComics
      }
    })

    return true
  } catch (error) {
    console.error('Error incrementing comic count:', error)
    return false
  }
}

/**
 * Get current user count (for 100 user MVP cap)
 */
export async function getTotalUserCount(): Promise<number> {
  try {
    const client = await clerkClient()
    const response = await client.users.getUserList({ limit: 500 })

    // Count only users who have metadata.registrationNumber (registered for MVP)
    const registeredUsers = response.data.filter(user => {
      const metadata = user.publicMetadata as UserMetadata
      return metadata.registrationNumber !== undefined
    })

    return registeredUsers.length
  } catch (error) {
    console.error('Error getting total user count:', error)
    return 0
  }
}

/**
 * Register new user for MVP (assign number 1-100)
 */
export async function registerMVPUser(userId: string): Promise<{
  success: boolean
  userNumber?: number
  message?: string
}> {
  try {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const metadata = (user.publicMetadata || {}) as UserMetadata

    // Check if already registered
    if (metadata.registrationNumber) {
      return {
        success: true,
        userNumber: metadata.registrationNumber,
        message: `Welcome back! You are MVP user #${metadata.registrationNumber}`
      }
    }

    // Check total users
    const totalUsers = await getTotalUserCount()
    if (totalUsers >= MAX_MVP_USERS) {
      return {
        success: false,
        message: 'MVP is at capacity (100 users). Join our waitlist for the full launch!'
      }
    }

    // Register user
    const userNumber = totalUsers + 1
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...metadata,
        registrationNumber: userNumber,
        registeredAt: new Date().toISOString()
      }
    })

    return {
      success: true,
      userNumber,
      message: `Welcome to Mockr! You are MVP user #${userNumber} of 100`
    }
  } catch (error) {
    console.error('Error registering MVP user:', error)
    return {
      success: false,
      message: 'Error during registration. Please try again.'
    }
  }
}

/**
 * Check if user is registered for MVP
 */
export async function isUserRegistered(userId: string): Promise<boolean> {
  try {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const metadata = (user.publicMetadata || {}) as UserMetadata

    return metadata.registrationNumber !== undefined
  } catch (error) {
    console.error('Error checking user registration:', error)
    return false
  }
}
