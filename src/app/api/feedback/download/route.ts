import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { exportFeedbackAsCSV, getFeedbackStats } from '@/lib/feedback'

/**
 * Download all feedback as CSV
 * Protected endpoint - only you (admin) should access this
 */
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Optional: Add admin check here if you want
    // For MVP, any signed-in user can download (since it's just you testing)
    // Later, you can restrict to specific email or user ID

    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const email = user.emailAddresses[0]?.emailAddress

    // Optional: Restrict to your email only
    // if (email !== 'your-admin-email@example.com') {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    // }

    // Export feedback as CSV
    const csvData = exportFeedbackAsCSV()
    const stats = getFeedbackStats()

    // Return CSV file
    return new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="mockr-feedback-${new Date().toISOString().split('T')[0]}.csv"`,
        'X-Feedback-Count': stats.total.toString(),
        'X-Average-Rating': stats.averageRating.toString()
      }
    })
  } catch (error) {
    console.error('Error downloading feedback:', error)
    return NextResponse.json(
      { error: 'Failed to download feedback' },
      { status: 500 }
    )
  }
}
