import { NextRequest, NextResponse } from 'next/server'
import { generateEnhancedPrompt } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    console.log('[API] Generate description request received')

    const body = await request.json()
    const { situation, quote, characters, setting, tone, style } = body

    console.log('[API] Request data:', {
      situation: situation?.substring(0, 50) + '...',
      quote: quote?.substring(0, 50) + '...',
      characters,
      setting,
      tone,
      style
    })

    // Validate required fields
    if (!situation) {
      console.log('[API] Validation failed: No situation provided')
      return NextResponse.json(
        { success: false, error: 'Political situation is required' },
        { status: 400 }
      )
    }

    console.log('[API] Calling generateEnhancedPrompt...')

    // Generate the comic description using Gemini AI
    const description = await generateEnhancedPrompt(situation, quote, characters, setting, tone, style)

    console.log('[API] Description generated successfully, length:', description.length)

    const response = {
      success: true,
      description: description,
      inputs: {
        situation,
        quote,
        characters,
        setting,
        tone,
        style
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('[API] Description generation error:', error)
    console.error('[API] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })

    return NextResponse.json(
      { success: false, error: 'Failed to generate description. Please try again.' },
      { status: 500 }
    )
  }
}