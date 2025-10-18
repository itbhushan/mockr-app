import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { checkUserDailyLimit } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user from Clerk
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to generate comics.' },
        { status: 401 }
      )
    }

    // Check daily limit
    const limitCheck = await checkUserDailyLimit(userId)

    return NextResponse.json({
      success: true,
      allowed: limitCheck.allowed,
      current: limitCheck.current,
      limit: limitCheck.limit,
      remaining: limitCheck.limit - limitCheck.current,
      message: limitCheck.message
    })
  } catch (error) {
    console.error('Error checking usage:', error)
    return NextResponse.json(
      { error: 'Failed to check usage limits' },
      { status: 500 }
    )
  }
}
