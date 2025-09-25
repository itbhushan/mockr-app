import { NextRequest, NextResponse } from 'next/server'
import { generateSatiricalQuote } from '@/lib/gemini'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const situation = searchParams.get('situation') || 'Ministers attending climate summits while using private jets'

  try {
    // Generate R.K. Laxman style caption
    const caption = await generateSatiricalQuote(situation)

    // Return direct SVG with the caption
    const placeholderApiUrl = `/api/placeholder-comic?dialogue=${encodeURIComponent(caption)}&situation=${encodeURIComponent(situation)}&t=${Date.now()}`

    // Redirect to the placeholder comic with the generated caption
    return NextResponse.redirect(new URL(placeholderApiUrl, request.url))

  } catch (error) {
    console.error('Test API failed:', error)
    return NextResponse.json({ error: 'Failed to generate comic' }, { status: 500 })
  }
}