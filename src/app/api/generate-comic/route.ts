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

    // Generate dialogue for the comic
    const dialogue = await generateDialogue(situation, characters, tone)

    // Try to generate with Hugging Face API, fallback to placeholder
    let imageUrl = '/api/placeholder-comic'
    let aiGenerated = false

    try {
      const enhancedPrompt = `${prompt} Speech bubble contains: ${dialogue}`
      const generatedImageUrl = await generateComicWithHuggingFace(enhancedPrompt)
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
        dialogue: dialogue, // Include generated dialogue
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

async function generateDialogue(situation: string, characters: string, tone: string): Promise<string> {
  const apiToken = process.env.HUGGINGFACE_API_TOKEN

  if (!apiToken || apiToken === 'your_huggingface_api_token_here') {
    // Fallback to predefined dialogue patterns
    const toneDialogue = {
      'satirical': `"Everything is under control!"`,
      'witty': `"Trust me, I'm an expert!"`,
      'observational': `"This is how we've always done it."`,
      'critical': `"The situation is completely normal."`
    }
    return toneDialogue[tone as keyof typeof toneDialogue] || `"No comment!"`
  }

  try {
    const dialoguePrompt = `Generate a short, witty dialogue (1-2 sentences max) for a political cartoon.

    Situation: ${situation}
    Characters: ${characters}
    Tone: ${tone}

    The dialogue should be:
    - Ironic and satirical
    - Show contradiction between words and actions
    - Keep it under 15 words
    - Suitable for speech bubble in cartoon
    - Political but not offensive

    Return only the dialogue in quotes, nothing else.`

    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: dialoguePrompt,
          parameters: {
            max_length: 50,
            temperature: 0.8,
            do_sample: true
          }
        }),
      }
    )

    if (response.ok) {
      const result = await response.json()
      if (result && result[0] && result[0].generated_text) {
        // Extract just the dialogue part
        const dialogue = result[0].generated_text.replace(dialoguePrompt, '').trim()
        return dialogue || `"No comment!"`
      }
    }
  } catch (error) {
    console.warn('Dialogue generation failed:', error)
  }

  // Enhanced fallback based on situation keywords
  const situationLower = situation.toLowerCase()
  if (situationLower.includes('inflation') || situationLower.includes('price')) {
    return `"Prices are completely under control!"`
  } else if (situationLower.includes('climate') || situationLower.includes('environment')) {
    return `"We're leading the green revolution!"`
  } else if (situationLower.includes('healthcare') || situationLower.includes('hospital')) {
    return `"World-class healthcare for everyone!"`
  } else if (situationLower.includes('education') || situationLower.includes('school')) {
    return `"Our education system is the best!"`
  } else if (situationLower.includes('traffic') || situationLower.includes('transport')) {
    return `"Traffic will be solved very soon!"`
  } else {
    return `"Everything is going according to plan!"`
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
  prompt += `Art style: clean black ink lines on white background, no shading, no gradients, no textures, simple geometric shapes, bold clear outlines, minimalist design, professional editorial cartoon quality, similar to newspaper comics, single color (black), vector-style illustration. Include a speech bubble with text for dialogue.`

  return prompt
}