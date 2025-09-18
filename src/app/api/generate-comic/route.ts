import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  try {
    // Get user authentication status
    const { userId } = await auth()

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
        userId: userId || null, // Track which user created this comic
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
            negative_prompt: "realistic photo, 3d render, photorealistic, blurry, low quality, distorted faces, extra limbs, multiple heads, deformed hands, extra fingers, missing fingers, weird anatomy, malformed faces, ugly faces, bad proportions, duplicate, cropped, out of frame, text, watermark, signature, logo, multiple people in background, crowded, busy background, detailed background, complex background, realistic lighting, shadows, gradients",
            num_inference_steps: 30,
            guidance_scale: 8.5,
            width: 768,
            height: 512,
            scheduler: "DPMSolverMultistepScheduler"
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
  // Start with strong style anchors
  let prompt = `professional editorial cartoon, clean black and white line art, newspaper comic style, single panel illustration. `

  // Add style-specific elements
  if (style === 'laxman') {
    prompt += `R.K. Laxman artistic style: simple line drawings, round expressive character faces, clear facial expressions, minimal geometric backgrounds, focus on human emotions. `
  } else {
    prompt += `${style} editorial cartoon style, clean simple lines, expressive characters. `
  }

  // Create clear scene description
  prompt += `Scene: ${situation}. `

  // Add characters with clear descriptions
  if (characters) {
    const characterList = characters.split(',').map(char => char.trim())
    if (characterList.length === 1) {
      prompt += `Single character: ${characters}, standing in center, clear facial expression, simple body pose. `
    } else {
      prompt += `Characters: ${characters}, each with distinct clear facial features, simple poses, well-separated positions. `
    }
  } else {
    prompt += `One or two main characters with clear distinct faces, simple standing poses. `
  }

  // Add simple setting
  if (setting) {
    prompt += `Simple background: ${setting}, minimal geometric shapes, clean environment. `
  } else {
    prompt += `Minimal background, simple geometric shapes, clean white space. `
  }

  // Add tone-specific visual cues
  const toneMap: { [key: string]: string } = {
    'satirical': 'exaggerated expressions, visual irony, contradictory elements',
    'witty': 'playful expressions, clever visual metaphors, light humor',
    'observational': 'realistic expressions, everyday objects, relatable situations',
    'critical': 'serious expressions, dramatic poses, strong visual statements'
  }

  prompt += `Visual mood: ${toneMap[tone] || 'clear expressive faces'}. `

  // Strong technical specifications
  prompt += `Art style: clean black ink lines on white background, no shading, no gradients, no textures, simple geometric shapes, bold clear outlines, minimalist design, professional editorial cartoon quality, similar to newspaper comics, single color (black), vector-style illustration.`

  return prompt
}