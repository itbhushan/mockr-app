import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { generateEnhancedDialogue, generateEnhancedPrompt } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    // Get user authentication status
    const { userId } = await auth()

    const body = await request.json()
    const { situation, quote, description, characters, setting, tone, style } = body

    // Validate required fields
    if (!situation) {
      return NextResponse.json(
        { error: 'Political situation is required' },
        { status: 400 }
      )
    }

    // Use our streamlined approach: if we have quote and description, use them directly
    let dialogue: string
    let prompt: string

    if (quote && description) {
      // Use the satirical quote as dialogue and the simple description as prompt
      dialogue = quote
      prompt = description
      console.log('🎯 Using streamlined flow: quote as dialogue, description as prompt')
    } else {
      // Fallback to legacy system if needed
      dialogue = quote || await generateEnhancedDialogue(situation, characters, tone)
      prompt = description || await generateEnhancedPrompt(situation, quote, characters, setting, tone, style)
      console.log('⚠️ Using fallback flow: generating dialogue and/or prompt')
    }

    // Try to generate with Hugging Face Pro API
    let imageUrl = `/api/placeholder-comic?dialogue=${encodeURIComponent(dialogue)}&situation=${encodeURIComponent(situation)}&description=${encodeURIComponent(prompt)}`
    let aiGenerated = false

    console.log('🚀 Attempting AI image generation with Hugging Face Pro API...')
    console.log('💬 Generated dialogue:', dialogue)
    console.log('🎭 Applied tone:', tone)
    console.log('📝 Enhanced prompt with Common Man mandate:', prompt.substring(0, 200) + '...')
    console.log('🔗 Placeholder URL:', imageUrl)
    console.log('🔑 Environment check - HF Token exists:', !!process.env.HUGGINGFACE_API_TOKEN)

    // Try Hugging Face AI generation first (Pro API)
    const aiImageUrl = await generateComicWithHuggingFace(prompt)

    if (aiImageUrl) {
      console.log('✅ AI image generation successful!')
      imageUrl = aiImageUrl
      aiGenerated = true
    } else {
      console.log('⚠️ AI image generation failed, using enhanced SVG placeholder system')
      // Fallback to enhanced SVG placeholder with full functionality:
      // - Dynamic dialogue generation with Gemini AI
      // - Speech bubble integration
      // - Context box display
      // - Complete character visualization
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
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to generate comic', details: error instanceof Error ? error.message : String(error) },
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

  console.log('🔑 Checking Hugging Face API token...')
  console.log('🔑 Token exists:', !!apiToken)
  console.log('🔑 Token starts with:', apiToken?.substring(0, 5) || 'N/A')

  if (!apiToken || apiToken === 'your_huggingface_api_token_here') {
    console.warn('❌ Hugging Face API token not configured')
    return null
  }

  try {
    console.log('🌐 Making request to Hugging Face API...')
    console.log('📝 Original prompt from Gemini:', prompt.substring(0, 200) + '...')

    // Transform Gemini description into optimized Stable Diffusion prompt
    const optimizedPrompt = optimizePromptForStableDiffusion(prompt)

    console.log('📝 Optimized prompt for Stable Diffusion:', optimizedPrompt.substring(0, 200) + '...')
    console.log('📝 Full optimized prompt length:', optimizedPrompt.length)

    // Use Stable Diffusion XL with enhanced character-focused prompting
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: optimizedPrompt,
          parameters: {
            negative_prompt: "realistic photo, photorealistic, real people, photography, realistic faces, realistic humans, 3d render, cgi, digital art, colored, colors, gradients, anime style, manga style, complex backgrounds, blurry, low quality, distorted faces, extra limbs, multiple heads, deformed hands, extra fingers, missing fingers, weird anatomy, malformed faces, ugly faces, bad proportions, duplicate, cropped, out of frame, text, watermark, signature, logo, missing characters, incomplete scene",
            num_inference_steps: 50,
            guidance_scale: 9.5,
            width: 1024,
            height: 576,
            scheduler: "DPMSolverMultistepScheduler"
          }
        }),
      }
    )

    console.log('📡 API Response status:', response.status)
    console.log('📡 API Response ok:', response.ok)

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

function optimizePromptForStableDiffusion(description: string): string {
  console.log('🔧 CREATING ADAPTIVE PROMPT FOR R.K. LAXMAN STYLE COMIC...')

  // Analyze the description to create appropriate prompt
  const desc = description.toLowerCase()

  let optimizedPrompt = `(((R.K. Laxman editorial cartoon style))), (((black and white line art))), (((single panel newspaper comic))),`

  // Check for social media/digital governance scenario
  if (desc.includes('social media') || desc.includes('influencer') || desc.includes('digital') || desc.includes('phone')) {
    optimizedPrompt += `
    ((Common Man character with round spectacles and checkered shirt sweating and holding phone)),
    ((Social media influencer on podium with microphone gesturing dramatically)),
    ((Campaign banner displaying "DIGITAL GOVERNANCE 2024")),
    ((Broken digital icons and symbols floating around)),
    ((Speech bubble with "Mute button confusion!")),
    ((Audience watching from below)),

    campaign rally setting, podium stage, simple clean lines, minimalist background,`
  } else if (desc.includes('opposition') || desc.includes('shake hands') || desc.includes('policy')) {
    // Opposition leader scenario
    optimizedPrompt += `
    ((Common Man character with round spectacles and checkered shirt standing shocked on left side)),
    ((Opposition leader and Government official shaking hands behind desk)),
    ((banner above them displaying "SAME FAILED POLICY!")),
    ((election posters in background)),
    ((office interior with desk, chairs, papers scattered)),

    government office setting, political meeting room, simple clean lines, minimalist background,`
  } else {
    // Generic political scenario
    optimizedPrompt += `
    ((Common Man character with round spectacles and checkered shirt looking bewildered)),
    ((Politicians or officials in the scene)),
    ((Simple office or public setting)),

    simple setting, clean lines, minimalist background,`
  }

  optimizedPrompt += `
  high contrast black and white illustration, professional editorial cartoon quality,
  R.K. Laxman artistic style with simple geometric shapes, expressive character faces,
  clear composition, newspaper comic format, single color artwork,
  satirical political cartoon, clean ink drawing style`

  console.log('🔧 ADAPTIVE R.K. LAXMAN PROMPT CREATED')
  console.log('📝 Prompt length:', optimizedPrompt.length)
  console.log('📝 Targeting scenario based on description analysis')

  return optimizedPrompt
}

function extractAllVisualElements(description: string) {
  const elements = {
    characters: [],
    objects: [],
    actions: [],
    textNumbers: [],
    setting: null
  }

  const desc = description.toLowerCase()

  // Extract CHARACTERS (people in the scene)
  if (desc.includes('common man')) elements.characters.push('Common Man with round spectacles and checkered shirt')
  if (desc.includes('politician') && !desc.includes('politician\'s')) elements.characters.push('politician character')
  if (desc.includes('politician\'s wife') || desc.includes('minister\'s wife')) elements.characters.push('politician\'s wife character')
  if (desc.includes('trump')) elements.characters.push('Trump character with distinctive appearance')
  if (desc.includes('job seekers')) elements.characters.push('job seeker characters')
  if (desc.includes('patients')) elements.characters.push('patient characters')

  // Extract OBJECTS (physical items that must be visible)
  if (desc.includes('computer screen')) elements.objects.push('computer screen')
  if (desc.includes('computer')) elements.objects.push('computer')
  if (desc.includes('screen')) elements.objects.push('screen')
  if (desc.includes('price tag')) elements.objects.push('price tag')
  if (desc.includes('sign')) elements.objects.push('sign')
  if (desc.includes('ribbon')) elements.objects.push('ribbon')
  if (desc.includes('papers')) elements.objects.push('papers')
  if (desc.includes('desk')) elements.objects.push('desk')
  if (desc.includes('flag')) elements.objects.push('flag')

  // Extract ACTIONS/EXPRESSIONS (emotions and poses that must be visible)
  if (desc.includes('shocked')) elements.actions.push('shocked facial expression')
  if (desc.includes('looking shocked')) elements.actions.push('looking shocked')
  if (desc.includes('bewildered')) elements.actions.push('bewildered expression')
  if (desc.includes('tries to explain')) elements.actions.push('explaining gesture')
  if (desc.includes('counting money')) elements.actions.push('counting money action')
  if (desc.includes('cutting ribbon')) elements.actions.push('ribbon cutting ceremony')
  if (desc.includes('walk away')) elements.actions.push('people walking away')

  // Extract TEXT/NUMBERS (must be readable in image)
  const textMatches = desc.match(/['""][^'""]*['""]|[\$\d,]+/g)
  if (textMatches) {
    textMatches.forEach(match => {
      const cleanMatch = match.replace(/['"]/g, '')
      elements.textNumbers.push(`text displaying "${cleanMatch}"`)
    })
  }

  // Extract specific dollar amounts
  const dollarMatches = desc.match(/\$[\d,]+/g)
  if (dollarMatches) {
    dollarMatches.forEach(amount => {
      elements.textNumbers.push(`${amount} text visible on screen or sign`)
    })
  }

  // Extract SETTING (background/location)
  if (desc.includes('office setting')) elements.setting = 'office interior background'
  if (desc.includes('hospital setting')) elements.setting = 'hospital background'
  if (desc.includes('immigration office')) elements.setting = 'immigration office background'
  if (desc.includes('home office')) elements.setting = 'home office background'
  if (desc.includes('job fair')) elements.setting = 'job fair background'

  return elements
}

function extractMainScenario(prompt: string): string {
  // Extract the main political scenario from the Gemini description
  const scenarioKeywords = ['politician', 'Trump', 'job fair', 'government', 'election', 'policy', 'political', 'office', 'campaign', 'speech', 'rally', 'conference', 'meeting', 'announcement']
  let scenario = "political situation"

  // Look for descriptive phrases about the main scenario
  const lines = prompt.toLowerCase().split('\n')
  for (const line of lines) {
    // Check if line contains scenario description
    if (line.includes('trump') || line.includes('politician') || line.includes('scenario') || line.includes('situation')) {
      // Extract key scenario elements
      if (line.includes('job fair') || line.includes('employment')) {
        scenario = "Trump at job fair with no vacancy signs"
      } else if (line.includes('healthcare') || line.includes('hospital')) {
        scenario = "politician visiting healthcare facility"
      } else if (line.includes('campaign') || line.includes('rally')) {
        scenario = "political campaign or rally"
      } else if (line.includes('office') || line.includes('government building')) {
        scenario = "government office or official building"
      } else if (line.includes('speech') || line.includes('podium')) {
        scenario = "politician giving speech or presentation"
      }
      break
    }
  }

  return scenario
}

function extractOtherCharacters(prompt: string): string {
  // Extract other characters besides Common Man with proper emphasis
  const characters = []
  const lowerPrompt = prompt.toLowerCase()

  // Main political figures
  if (lowerPrompt.includes('trump') || lowerPrompt.includes('donald')) {
    characters.push('((Donald Trump caricature with distinctive hair and suit))')
  } else if (lowerPrompt.includes('politician') || lowerPrompt.includes('minister') || lowerPrompt.includes('official')) {
    characters.push('((generic politician character in formal attire))')
  }

  // Supporting characters
  if (lowerPrompt.includes('citizen') || lowerPrompt.includes('people') || lowerPrompt.includes('crowd')) {
    characters.push('citizens in background')
  }
  if (lowerPrompt.includes('worker') || lowerPrompt.includes('employee') || lowerPrompt.includes('job seeker')) {
    characters.push('workers or job seekers')
  }
  if (lowerPrompt.includes('reporter') || lowerPrompt.includes('media')) {
    characters.push('media representatives')
  }

  return characters.join(', ')
}

function extractSetting(prompt: string): string {
  // Extract setting information with appropriate detail level
  let setting = "minimal background with simple geometric shapes"
  const lowerPrompt = prompt.toLowerCase()

  // Identify specific settings mentioned in the prompt
  if (lowerPrompt.includes('job fair') || lowerPrompt.includes('employment center')) {
    setting = "job fair setting with booths, tables, \"No Vacancy\" signs"
  } else if (lowerPrompt.includes('office') || lowerPrompt.includes('workplace')) {
    setting = "office interior with desk, papers, minimal furniture"
  } else if (lowerPrompt.includes('podium') || lowerPrompt.includes('stage') || lowerPrompt.includes('platform')) {
    setting = "speaking platform with podium or microphone"
  } else if (lowerPrompt.includes('government building') || lowerPrompt.includes('capitol') || lowerPrompt.includes('official building')) {
    setting = "government building exterior or interior"
  } else if (lowerPrompt.includes('hospital') || lowerPrompt.includes('healthcare') || lowerPrompt.includes('medical')) {
    setting = "healthcare facility or hospital setting"
  } else if (lowerPrompt.includes('campaign') || lowerPrompt.includes('rally') || lowerPrompt.includes('crowd')) {
    setting = "campaign event or rally venue"
  } else if (lowerPrompt.includes('street') || lowerPrompt.includes('public') || lowerPrompt.includes('outdoor')) {
    setting = "public outdoor setting or street scene"
  }

  return setting
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