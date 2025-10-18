import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { registerUser } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user from Clerk
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in first.' },
        { status: 401 }
      )
    }

    // Get user email from Clerk
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const email = user.emailAddresses[0]?.emailAddress

    // Register user in database
    const result = await registerUser(userId, email)

    if (!result.success) {
      return NextResponse.json(
        { error: result.message || 'Failed to register user' },
        { status: result.message?.includes('limit reached') ? 403 : 500 }
      )
    }

    return NextResponse.json({
      success: true,
      userNumber: result.userNumber,
      message: result.message
    })
  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    )
  }
}
