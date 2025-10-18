import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { saveFeedback } from '@/lib/feedback'

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user from Clerk
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Please sign in to submit feedback.' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { feedbackType, message, rating } = body

    // Validate input
    if (!feedbackType || !message) {
      return NextResponse.json(
        { error: 'Feedback type and message are required' },
        { status: 400 }
      )
    }

    if (!['general', 'bug', 'feature_request'].includes(feedbackType)) {
      return NextResponse.json(
        { error: 'Invalid feedback type. Must be: general, bug, or feature_request' },
        { status: 400 }
      )
    }

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Get user details from Clerk
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const email = user.emailAddresses[0]?.emailAddress
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim()

    // Save feedback to JSON file
    const success = saveFeedback({
      userId,
      email,
      name: name || undefined,
      feedbackType,
      message,
      rating,
      userAgent: request.headers.get('user-agent') || undefined
    })

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save feedback' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback! We really appreciate it.'
    })
  } catch (error) {
    console.error('Error submitting feedback:', error)
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}
