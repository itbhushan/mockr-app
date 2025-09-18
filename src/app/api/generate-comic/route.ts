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
    let imageUrl = `/api/placeholder-comic?dialogue=${encodeURIComponent(dialogue)}&situation=${encodeURIComponent(situation)}`
    let aiGenerated = false

    try {
      const enhancedPrompt = `${prompt}

CRITICAL REQUIREMENTS:
1. MUST include a speech bubble with readable text: "${dialogue}"
2. Speech bubble should be oval/circular shape with pointer tail
3. Text must be clearly legible inside the bubble
4. Position speech bubble near character's mouth
5. Include political situation context: "${situation}" at bottom of image
6. Speech bubble text should be in quotes: ${dialogue}

The final image MUST show the dialogue text inside a proper speech bubble as part of the cartoon image itself.`

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
  // Create dynamic, tone-specific dialogue with variety
  const dialogueTemplates = {
    'satirical': [
      generateSatiricalDialogue(situation, characters),
      generateSituationBasedSatirical(situation),
      generateIronicStatement(situation)
    ],
    'witty': [
      generateWittyDialogue(situation, characters),
      generateCleverObservation(situation),
      generatePlayfulQuip(situation)
    ],
    'observational': [
      generateObservationalDialogue(situation, characters),
      generateRealisticComment(situation),
      generateEverydayAbsurdity(situation)
    ],
    'critical': [
      generateCriticalDialogue(situation, characters),
      generateHardHittingStatement(situation),
      generateSeriousCritique(situation)
    ]
  }

  // Select random template from the tone category
  const templates = dialogueTemplates[tone as keyof typeof dialogueTemplates] || dialogueTemplates['satirical']
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)]

  return randomTemplate
}

function generateSatiricalDialogue(situation: string, characters: string): string {
  const situationLower = situation.toLowerCase()
  const timestamp = Date.now() % 1000 // Add variety

  if (situationLower.includes('inflation') || situationLower.includes('price')) {
    const options = [
      `"Don't worry, inflation is just temporary... like my promises!"`,
      `"Rising prices? That's just economic growth in disguise!"`,
      `"I shop here too, see how affordable everything is!"`,
      `"Inflation? More like economic enthusiasm!"`
    ]
    return options[timestamp % options.length]
  } else if (situationLower.includes('climate') || situationLower.includes('environment')) {
    const options = [
      `"We're saving the planet, one private jet at a time!"`,
      `"Carbon neutral? We're carbon positive thinkers!"`,
      `"My emissions offset includes positive vibes!"`,
      `"Green energy starts with green money!"`
    ]
    return options[timestamp % options.length]
  } else if (situationLower.includes('healthcare') || situationLower.includes('hospital')) {
    const options = [
      `"World-class facilities... in a world-class queue!"`,
      `"See? Even the waiting room has AC!"`,
      `"Quality healthcare takes quality time!"`,
      `"Our hospitals are so advanced, they're booked solid!"`
    ]
    return options[timestamp % options.length]
  } else if (situationLower.includes('education') || situationLower.includes('school')) {
    const options = [
      `"Our schools are so good, even I send my kids abroad!"`,
      `"Local education builds local character... elsewhere!"`,
      `"Why study abroad when you can dream locally?"`,
      `"Our education system is internationally recognized... for its challenges!"`
    ]
    return options[timestamp % options.length]
  } else {
    const options = [
      `"Everything is under control... mostly!"`,
      `"Situation normal, all fouled up!"`,
      `"Trust the process... whatever that means!"`,
      `"We're handling this like true professionals!"`
    ]
    return options[timestamp % options.length]
  }
}

function generateSituationBasedSatirical(situation: string): string {
  const timestamp = Date.now() % 100
  const situationWords = situation.toLowerCase().split(' ')

  if (situationWords.includes('promising')) {
    return timestamp % 2 === 0 ? `"I promise to promise better promises!"` : `"My promises come with a satisfaction guarantee!"`
  } else if (situationWords.includes('visiting')) {
    return timestamp % 2 === 0 ? `"Just visiting... don't mind the cameras!"` : `"Surprise inspection! Hope you didn't clean up!"`
  } else if (situationWords.includes('promoting')) {
    return timestamp % 2 === 0 ? `"Promotion is 90% of the solution!"` : `"If you can't fix it, promote it!"`
  }

  return `"This is exactly what I had in mind!"`
}

function generateIronicStatement(situation: string): string {
  const timestamp = Date.now() % 1000
  const options = [
    `"Couldn't have planned it better myself!"`,
    `"This is what success looks like!"`,
    `"Everything according to the master plan!"`,
    `"Exactly as we rehearsed it!"`
  ]
  return options[timestamp % options.length]
}

function generateWittyDialogue(situation: string, characters: string): string {
  const situationLower = situation.toLowerCase()
  const timestamp = Date.now() % 1000

  if (situationLower.includes('traffic') || situationLower.includes('transport')) {
    const options = [
      `"The metro will solve this... in 2035!"`,
      `"Traffic builds character... and patience!"`,
      `"This jam session isn't what I ordered!"`,
      `"Rush hour? More like crush hour!"`
    ]
    return options[timestamp % options.length]
  } else if (situationLower.includes('digital') || situationLower.includes('tech')) {
    const options = [
      `"Like and subscribe to democracy!"`,
      `"Going viral with good governance!"`,
      `"Democracy 2.0: Now with fewer bugs!"`,
      `"Have you tried turning the government off and on again?"`
    ]
    return options[timestamp % options.length]
  } else {
    const options = [
      `"Trust me, I'm a professional politician!"`,
      `"This wasn't in the job description!"`,
      `"I have a PhD in problem-solving!"`,
      `"Experience is the best teacher... apparently!"`
    ]
    return options[timestamp % options.length]
  }
}

function generateCleverObservation(situation: string): string {
  const timestamp = Date.now() % 1000
  const options = [
    `"Interesting interpretation of 'improvement'!"`,
    `"That's one way to look at it!"`,
    `"Creative problem-solving at its finest!"`,
    `"Innovation in action, clearly!"`
  ]
  return options[timestamp % options.length]
}

function generatePlayfulQuip(situation: string): string {
  const timestamp = Date.now() % 1000
  const options = [
    `"Plot twist nobody saw coming!"`,
    `"And for my next trick..."`,
    `"Ta-da! Modern governance!"`,
    `"Surprise! It's exactly what you expected!"`
  ]
  return options[timestamp % options.length]
}

function generateObservationalDialogue(situation: string, characters: string): string {
  const situationLower = situation.toLowerCase()
  const timestamp = Date.now() % 1000

  if (situationLower.includes('meeting') || situationLower.includes('conference')) {
    const options = [
      `"Another productive meeting about having meetings."`,
      `"The solution is more committees."`,
      `"Let's circle back on this agenda item."`,
      `"We'll form a task force to study the problem."`
    ]
    return options[timestamp % options.length]
  } else {
    const options = [
      `"This is how we've always done it."`,
      `"Standard operating procedure."`,
      `"Just following the established protocol."`,
      `"The system is working as intended."`
    ]
    return options[timestamp % options.length]
  }
}

function generateRealisticComment(situation: string): string {
  const timestamp = Date.now() % 1000
  const options = [
    `"Welcome to the real world."`,
    `"This is what bureaucracy looks like."`,
    `"Par for the course."`,
    `"Same old, same old."`
  ]
  return options[timestamp % options.length]
}

function generateEverydayAbsurdity(situation: string): string {
  const timestamp = Date.now() % 1000
  const options = [
    `"Just another day at the office."`,
    `"Normal Tuesday activities."`,
    `"Business as usual."`,
    `"Keep calm and carry on."`
  ]
  return options[timestamp % options.length]
}

function generateCriticalDialogue(situation: string, characters: string): string {
  const situationLower = situation.toLowerCase()
  const timestamp = Date.now() % 1000

  if (situationLower.includes('corruption') || situationLower.includes('scandal')) {
    const options = [
      `"Transparency was never our strong suit."`,
      `"What you don't know can't hurt... me."`,
      `"Ethics are more like guidelines anyway."`,
      `"The rules don't apply to rule-makers."`
    ]
    return options[timestamp % options.length]
  } else {
    const options = [
      `"The people deserve better."`,
      `"This is not what we signed up for."`,
      `"Accountability went out the window."`,
      `"Someone needs to answer for this."`
    ]
    return options[timestamp % options.length]
  }
}

function generateHardHittingStatement(situation: string): string {
  const timestamp = Date.now() % 1000
  const options = [
    `"Actions speak louder than promises."`,
    `"The emperor's new governance."`,
    `"Power corrupts, absolutely."`,
    `"The system is rigged."`
  ]
  return options[timestamp % options.length]
}

function generateSeriousCritique(situation: string): string {
  const timestamp = Date.now() % 1000
  const options = [
    `"This is what failure looks like."`,
    `"Unacceptable by any standard."`,
    `"The people deserve answers."`,
    `"This cannot continue."`
  ]
  return options[timestamp % options.length]
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

  // Strong technical specifications with speech bubble emphasis
  prompt += `Art style: clean black ink lines on white background, no shading, no gradients, no textures, simple geometric shapes, bold clear outlines, minimalist design, professional editorial cartoon quality, similar to newspaper comics, single color (black), vector-style illustration. MUST include a prominent speech bubble with clear, readable text positioned near the main character's mouth. The speech bubble should be a standard oval/round shape with a pointer tail pointing to the speaking character.`

  return prompt
}