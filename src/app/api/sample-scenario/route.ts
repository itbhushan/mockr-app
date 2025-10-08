import { NextResponse } from 'next/server'
import { getRandomScenario } from '@/lib/sampleScenarios'

export async function GET() {
  try {
    const scenario = getRandomScenario()

    return NextResponse.json({
      success: true,
      scenario: {
        situation: scenario.situation,
        characters: scenario.characters,
        setting: scenario.setting,
        tone: scenario.tone,
        style: scenario.style,
        suggestedDialogue: scenario.dialogue
      }
    })
  } catch (error) {
    console.error('Sample scenario generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate sample scenario' },
      { status: 500 }
    )
  }
}