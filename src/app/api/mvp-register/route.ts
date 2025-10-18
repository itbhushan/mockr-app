import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { registerMVPUser } from '@/lib/rateLimiting'

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user from Clerk
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Please sign in first.' },
        { status: 401 }
      )
    }

    // Register user for MVP (100 user cap)
    const result = await registerMVPUser(userId)

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.message || 'Failed to register for MVP',
          waitlist: true // Signal that user should join waitlist
        },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      userNumber: result.userNumber,
      message: result.message
    })
  } catch (error) {
    console.error('Error registering for MVP:', error)
    return NextResponse.json(
      { error: 'Failed to register for MVP' },
      { status: 500 }
    )
  }
}
