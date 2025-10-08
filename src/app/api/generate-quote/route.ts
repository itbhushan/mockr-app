import { NextRequest, NextResponse } from 'next/server'
import { generateSatiricalQuote } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    console.log('[API] Generate quote request received')

    const body = await request.json()
    const { situation } = body

    console.log('[API] Request data:', {
      situation: situation?.substring(0, 50) + '...'
    })

    // Validate required fields
    if (!situation) {
      console.log('[API] Validation failed: No situation provided')
      return NextResponse.json(
        { success: false, error: 'Political situation is required' },
        { status: 400 }
      )
    }

    console.log('[API] Calling generateSatiricalQuote...')

    // Generate the satirical quote using Gemini AI
    const quote = await generateSatiricalQuote(situation)

    console.log('[API] Quote generated successfully, length:', quote.length)

    const response = {
      success: true,
      quote: quote,
      situation: situation
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('[API] Quote generation error:', error)
    console.error('[API] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })

    return NextResponse.json(
      { success: false, error: 'Failed to generate quote. Please try again.' },
      { status: 500 }
    )
  }
}