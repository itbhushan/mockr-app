import { NextRequest, NextResponse } from 'next/server'

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

    // Create a detailed prompt for AI image generation
    const prompt = createComicPrompt(situation, characters, setting, tone, style)

    // Try to generate with Hugging Face API, fallback to placeholder
    let imageUrl = '/api/placeholder-comic'
    let aiGenerated = false

    try {
      const generatedImageUrl = await generateComicWithHuggingFace(prompt)
      if (generatedImageUrl) {
        imageUrl = generatedImageUrl
        aiGenerated = true
      }
    } catch (aiError) {
      console.warn('AI generation failed, using placeholder:', aiError)
    }

    const response = {
      success: true,
      comic: {
        id: Date.now().toString(),
        prompt: prompt,
        imageUrl: imageUrl,
        aiGenerated: aiGenerated,
        situation,
        characters,
        setting,
        tone,
        style,
        createdAt: new Date().toISOString()
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Comic generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate comic' },
      { status: 500 }
    )
  }
}

async function generateComicWithHuggingFace(prompt: string): Promise<string | null> {
  const apiToken = process.env.HUGGINGFACE_API_TOKEN

  if (!apiToken || apiToken === 'your_huggingface_api_token_here') {
    console.warn('Hugging Face API token not configured')
    return null
  }

  try {
    // Use Stable Diffusion XL for better quality
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: "color, colorful, vibrant colors, realistic photo, 3d render, blurry, low quality",
            num_inference_steps: 20,
            guidance_scale: 7.5,
            width: 768,
            height: 512
          }
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Hugging Face API error:', response.status, errorText)
      return null
    }

    // Get the image blob
    const imageBlob = await response.blob()

    // Convert blob to base64 data URL for immediate display
    const arrayBuffer = await imageBlob.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const dataUrl = `data:image/jpeg;base64,${base64}`

    return dataUrl

  } catch (error) {
    console.error('Error calling Hugging Face API:', error)
    return null
  }
}

function createComicPrompt(
  situation: string,
  characters: string,
  setting: string,
  tone: string,
  style: string
): string {
  let prompt = `Black and white political cartoon, newspaper editorial style, single panel comic. `

  // Add specific R.K. Laxman style elements
  if (style === 'laxman') {
    prompt += `R.K. Laxman inspired style: simple line drawings, expressive faces, minimal backgrounds, focus on human emotions and social commentary. `
  }

  // Add situation with satirical context
  prompt += `Satirical scene: ${situation}. `

  // Add characters if specified
  if (characters) {
    prompt += `Main characters: ${characters}. `
  }

  // Add setting if specified
  if (setting) {
    prompt += `Setting: ${setting}. `
  }

  // Add tone-specific elements
  const toneMap: { [key: string]: string } = {
    'satirical': 'Sharp, witty, highlighting contradictions and irony',
    'witty': 'Clever, humorous, light-hearted but insightful',
    'observational': 'Thoughtful, realistic, everyday absurdities',
    'critical': 'Hard-hitting, serious, exposing flaws and problems'
  }

  prompt += `Tone: ${toneMap[tone] || tone}. `

  // Technical specifications for black and white political cartoons
  prompt += `Style: Black and white ink drawing, clean line art, newspaper editorial cartoon, simple but expressive character faces, minimal detailed background, clear visual metaphors, political satire, hand-drawn appearance, no colors, no shading, just black lines on white background.`

  return prompt
}