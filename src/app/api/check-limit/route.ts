import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { checkDailyLimit } from '@/lib/rateLimiting'

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user from Clerk
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Please sign in to generate comics.' },
        { status: 401 }
      )
    }

    // Check daily limit using Clerk metadata
    const limitCheck = await checkDailyLimit(userId)

    return NextResponse.json({
      success: true,
      allowed: limitCheck.allowed,
      current: limitCheck.current,
      limit: limitCheck.limit,
      remaining: limitCheck.limit - limitCheck.current,
      message: limitCheck.message
    })
  } catch (error) {
    console.error('Error checking usage limit:', error)
    return NextResponse.json(
      { error: 'Failed to check usage limits' },
      { status: 500 }
    )
  }
}
