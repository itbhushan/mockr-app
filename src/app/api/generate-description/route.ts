import { NextRequest, NextResponse } from 'next/server'
import { generateEnhancedPrompt } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { situation, characters, setting, tone, style } = body

    // Validate required fields
    if (!situation) {
      return NextResponse.json(
        { error: 'Political situation is required' },
        { status: 400 }
      )
    }

    // Generate the comic description using Gemini AI
    const description = await generateEnhancedPrompt(situation, characters, setting, tone, style)

    const response = {
      success: true,
      description: description,
      inputs: {
        situation,
        characters,
        setting,
        tone,
        style
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Description generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    )
  }
}