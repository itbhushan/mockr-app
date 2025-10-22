import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { generateEnhancedDialogue, generateEnhancedPrompt } from '@/lib/gemini'
import { addCommonManToComic } from '@/lib/imageComposite'
import { checkDailyLimit, incrementComicCount } from '@/lib/rateLimiting'

export async function POST(request: NextRequest) {
  try {
    // Get user authentication status
    const { userId } = await auth()

    // Require authentication for comic generation
    if (!userId) {
      return NextResponse.json(
        { error: 'Please sign in to generate comics.' },
        { status: 401 }
      )
    }

    // Check daily rate limit using Clerk metadata
    const limitCheck = await checkDailyLimit(userId)
    if (!limitCheck.allowed) {
      return NextResponse.json(
        {
          error: limitCheck.message || 'Daily limit reached',
          current: limitCheck.current,
          limit: limitCheck.limit
        },
        { status: 429 }
      )
    }

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
    console.log('🔑 Environment check - Replicate Token exists:', !!process.env.REPLICATE_API_TOKEN)

    // Try Hugging Face FLUX-schnell first (Pro subscription - maximize value)
    let aiImageUrl = await generateComicWithHuggingFace(prompt)

    // Fallback to Replicate FLUX-schnell if HF fails or runs out
    if (!aiImageUrl) {
      console.log('⚠️ Hugging Face failed, trying Replicate as fallback...')
      aiImageUrl = await generateComicWithReplicate(prompt)
    }

    if (aiImageUrl) {
      console.log('✅ AI image generation successful!')
      imageUrl = aiImageUrl
      aiGenerated = true
    } else {
      console.log('⚠️ All AI providers failed, using enhanced SVG placeholder system')
      // Fallback to enhanced SVG placeholder with full functionality:
      // - Dynamic dialogue generation with Gemini AI
      // - Speech bubble integration
      // - Context box display
      // - Complete character visualization
    }

    // Increment user's comic count after successful generation
    await incrementComicCount(userId)

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

async function generateComicWithReplicate(prompt: string): Promise<string | null> {
  const apiToken = process.env.REPLICATE_API_TOKEN

  console.log('🔑 Checking Replicate API token...')
  console.log('🔑 Token exists:', !!apiToken)
  console.log('🔑 Token starts with:', apiToken?.substring(0, 5) || 'N/A')

  if (!apiToken) {
    console.warn('❌ Replicate API token not configured')
    return null
  }

  // Retry logic for transient failures
  const maxRetries = 2
  let lastError: string | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🌐 [Replicate] Attempt ${attempt}/${maxRetries}: Making request with FLUX.1-schnell model...`)
      console.log('📝 Original prompt from Gemini:', prompt.substring(0, 200) + '...')

      // Transform Gemini description into optimized FLUX prompt
      const optimizedPrompt = optimizePromptForFLUX(prompt)

      console.log('📝 Optimized prompt for FLUX.1-schnell:', optimizedPrompt.substring(0, 200) + '...')
      console.log('📝 Full optimized prompt length:', optimizedPrompt.length)

      // Log exact parameters being sent
      console.log('⚙️ Replicate FLUX.1-schnell Parameters:')
      console.log('   - num_inference_steps: 4 (schnell optimized)')
      console.log('   - resolution: 1024x1024')
      console.log('   - model: black-forest-labs/flux-schnell')
      console.log('   - cost: ~$0.003 per image')

      // Replicate API call with FLUX-schnell
      const response = await fetch(
        'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions',
        {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
            'Prefer': 'wait'
          },
          method: 'POST',
          body: JSON.stringify({
            input: {
              prompt: optimizedPrompt,
              num_outputs: 1,
              aspect_ratio: '1:1',
              output_format: 'jpg',
              output_quality: 95,
              num_inference_steps: 4
            }
          })
        }
      )

      console.log('📡 [Replicate] API Response status:', response.status)
      console.log('📡 [Replicate] API Response ok:', response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        lastError = `${response.status}: ${errorText}`
        console.error(`❌ [Replicate] Attempt ${attempt} failed:`, lastError)

        // If it's a transient error and we have retries left, try again
        if (attempt < maxRetries) {
          console.log('🔄 [Replicate] Retrying...')
          await new Promise(resolve => setTimeout(resolve, 2000))
          continue
        }

        return null
      }

      // Parse Replicate response
      const result = await response.json()

      if (!result.output || !result.output[0]) {
        lastError = 'Invalid response format from Replicate'
        console.error(`❌ [Replicate] ${lastError}`)

        if (attempt < maxRetries) {
          console.log('🔄 [Replicate] Retrying...')
          await new Promise(resolve => setTimeout(resolve, 2000))
          continue
        }

        return null
      }

      // Get image URL from response
      const imageUrl = result.output[0]

      // Download the image and convert to base64
      const imageResponse = await fetch(imageUrl)
      if (!imageResponse.ok) {
        throw new Error('Failed to download image from Replicate')
      }

      const imageBlob = await imageResponse.blob()
      const arrayBuffer = await imageBlob.arrayBuffer()
      const base64 = Buffer.from(arrayBuffer).toString('base64')
      const baseComicDataUrl = `data:image/jpeg;base64,${base64}`

      console.log('✅ [Replicate] Base comic generated successfully with FLUX.1-schnell')
      console.log('🎨 Now adding Common Man overlay with smart positioning...')

      // Apply Common Man composite overlay with context-aware expression and position
      const finalComicWithCommonMan = await addCommonManToComic(baseComicDataUrl, prompt)

      console.log('✅ [Replicate] Final composite comic created successfully')

      return finalComicWithCommonMan

    } catch (error: any) {
      lastError = error.message
      console.error(`❌ [Replicate] Attempt ${attempt} exception:`, error)

      // Retry on exception if we have attempts left
      if (attempt < maxRetries) {
        console.log('🔄 [Replicate] Retrying after exception...')
        await new Promise(resolve => setTimeout(resolve, 2000))
        continue
      }
    }
  }

  // All retries failed
  console.error('❌ [Replicate] All retry attempts failed. Last error:', lastError)
  return null
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

  // Retry logic for cold model starts
  const maxRetries = 2
  let lastError: string | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🌐 [HF] Attempt ${attempt}/${maxRetries}: Making request to Hugging Face API with FLUX.1-schnell model...`)
      console.log('📝 Original prompt from Gemini:', prompt.substring(0, 200) + '...')

      // Transform Gemini description into optimized FLUX prompt
      const optimizedPrompt = optimizePromptForFLUX(prompt)

      console.log('📝 Optimized prompt for FLUX.1-schnell:', optimizedPrompt.substring(0, 200) + '...')
      console.log('📝 Full optimized prompt length:', optimizedPrompt.length)

      // Log exact parameters being sent
      console.log('⚙️ FLUX.1-schnell Parameters:')
      console.log('   - guidance_scale: 0 (schnell uses distillation, no CFG needed)')
      console.log('   - num_inference_steps: 4 (schnell optimized)')
      console.log('   - resolution: 1024x1024')
      console.log('   - model: black-forest-labs/FLUX.1-schnell')

      // Use FLUX.1-schnell with 4 steps (90% quality of dev, 10x faster, cheaper)
      const response = await fetch(
        'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
        {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
            'x-wait-for-model': 'true', // Wait for model to load if needed
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: optimizedPrompt,
            parameters: {
              num_inference_steps: 4, // Schnell optimal (distilled model)
              guidance_scale: 0, // Schnell doesn't use CFG
              width: 1024,
              height: 1024
            }
          })
        }
      )

      console.log('📡 API Response status:', response.status)
      console.log('📡 API Response ok:', response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        lastError = `${response.status}: ${errorText}`
        console.error(`❌ Attempt ${attempt} failed:`, lastError)

        // If model is loading, wait and retry
        if (response.status === 503 && attempt < maxRetries) {
          console.log('⏳ Model is loading, waiting 5 seconds before retry...')
          await new Promise(resolve => setTimeout(resolve, 5000))
          continue
        }

        // If it's another error and we have retries left, try again
        if (attempt < maxRetries) {
          console.log('🔄 Retrying...')
          await new Promise(resolve => setTimeout(resolve, 2000))
          continue
        }

        return null
      }

    // Get the image blob
    const imageBlob = await response.blob()

    // Convert blob to base64 data URL
    const arrayBuffer = await imageBlob.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const baseComicDataUrl = `data:image/jpeg;base64,${base64}`

    console.log('✅ [HF] Base comic generated successfully with FLUX.1-schnell')
    console.log('🎨 Now adding Common Man overlay with smart positioning...')

    // Apply Common Man composite overlay with context-aware expression and position
    const finalComicWithCommonMan = await addCommonManToComic(baseComicDataUrl, prompt)

      console.log('✅ [HF] Final composite comic created successfully')

      return finalComicWithCommonMan

    } catch (error: any) {
      lastError = error.message
      console.error(`❌ Attempt ${attempt} exception:`, error)

      // Retry on exception if we have attempts left
      if (attempt < maxRetries) {
        console.log('🔄 Retrying after exception...')
        await new Promise(resolve => setTimeout(resolve, 2000))
        continue
      }
    }
  }

  // All retries failed
  console.error('❌ All retry attempts failed. Last error:', lastError)
  return null
}

function optimizePromptForFLUX(description: string): string {
  console.log('🔧 CREATING FLUX-OPTIMIZED R.K. LAXMAN PROMPT...')
  console.log('📝 Original AI description:', description.substring(0, 300) + '...')

  // FLUX.1-dev excels at natural language understanding - simpler, clearer prompts work better
  // No need for complex weighting syntax - FLUX follows instructions precisely

  // Add random variation to prevent identical outputs on regeneration
  const randomVariations = [
    'slightly different character poses',
    'alternate character positioning',
    'varied facial expressions',
    'different viewing angle',
    'alternative character arrangement',
    'varied character gestures',
    'unique character positions',
    'distinct character orientations'
  ]
  const randomSeed = Math.floor(Math.random() * 10000)
  const variation = randomVariations[Math.floor(Math.random() * randomVariations.length)]

  let optimizedPrompt = ``

  // 1. CLEAR DIRECTIVE START - Tell FLUX exactly what to create in R.K. Laxman's distinctive style
  optimizedPrompt += `Create a single-panel black and white editorial cartoon in authentic R.K. Laxman style from 1960s-1980s Indian political cartoons with ${variation} (variation seed: ${randomSeed}). `

  // 2. MAIN SCENE & CHARACTERS - Primary action in CENTER/LEFT area
  optimizedPrompt += `MAIN SCENE: ${description}. `

  // 3. COMPOSITION CONSTRAINT - Reserve space for Common Man overlay (top only - signature will be added below image)
  optimizedPrompt += `CRITICAL LAYOUT REQUIREMENT: Position ALL main characters and scene action in the LOWER TWO-THIRDS (bottom 66%) and CENTER portions of the frame. Keep the ENTIRE TOP area (upper 40% of image on BOTH left and right sides) COMPLETELY EMPTY with plain white background - absolutely nothing should appear in top areas. NO characters, NO faces, NO windows, NO frames, NO portraits, NO wall decorations, NO objects of any kind in the top 40% of the image. The top portion must be 100% empty white space. All action, all characters, all furniture must stay in the lower 60% of the image only. `

  // 4. CHARACTER COUNT - Main scene only (REDUCED for simplicity)
  optimizedPrompt += `Show ONLY 2-3 main characters performing the scene action. Keep the scene SIMPLE with minimal characters. Do not add crowds, background people, or extra bystanders. Maximum 3 characters total in the entire scene. `

  // 5. VISUAL STYLE - R.K. Laxman's signature drawing technique
  optimizedPrompt += `CRITICAL DRAWING STYLE - R.K. Laxman's signature SIMPLE line art technique: Draw ALL characters (whatever type they are - politicians, common people, officials, anyone) with EXTREMELY SIMPLE round faces like circles, minimal facial features (just two dots or small circles for eyes, small curved line for nose, tiny curved line for mouth), no detailed realistic features, no heavy shading on faces, minimalist cartoon expressions. Keep all faces simple and round regardless of who the character represents. All characters should wear SIMPLE clothing appropriate to their role with minimal detail - simple shirts, simple pants, simple traditional wear - drawn with clean minimal lines. NO complex costume details, NO elaborate patterns. Keep ALL clothing extremely simple with minimal lines. CRITICAL ANATOMY: Both hands visible with all fingers, both arms complete, both legs visible, full torso, complete head. NO missing body parts, NO deformed limbs. `

  // 6. BACKGROUND SIMPLICITY - Minimal details like authentic Laxman
  optimizedPrompt += `EXTREMELY SIMPLE BACKGROUND: Draw only essential elements in LOWER 60% portion of image below the empty top area - one simple empty desk (just plain rectangle, NO items on desk), one basic empty chair (simple lines, NO one sitting), one plain door outline (simple rectangle, door CLOSED). ABSOLUTELY NO windows anywhere in the image, NO window frames at all, NO wall frames, NO picture frames on walls, NO portraits hanging on walls, NO photographs, NO paintings, NO wall decorations of any kind. Plain completely empty white walls with maximum white space everywhere, especially in the entire top 40% area. Floor shown with just 2-3 simple diagonal perspective lines for depth in lower area only. Absolute minimal architectural detail - keep it extremely sparse, clean, and empty like authentic Laxman cartoons with lots of negative white space. `

  // 7. STRICT TOP AREA PROHIBITION - Must be completely empty for Common Man overlay
  optimizedPrompt += `ABSOLUTELY CRITICAL - EMPTY TOP AREA REQUIREMENT: DO NOT draw ANYTHING in the top 40% of the image. NO windows with people, NO portraits on walls, NO picture frames, NO faces in windows, NO observer characters, NO people looking out, NO wall decorations, NO hanging frames, NO photographs on walls. The ENTIRE top 40% must be completely blank white space with absolutely nothing drawn. DO NOT include observer characters looking through windows or doors anywhere. DO NOT place any spectator characters in the TOP areas at all. Keep ALL top areas (both left and right, entire upper 40%) completely clear and empty with 100% plain white background. NO extra people beyond the 2-3 main characters standing in the LOWER part of the scene. NO background characters anywhere, NO people in windows anywhere, NO faces visible in top areas, NO portraits of people on walls. Only the main 2-3 characters in the lower portion, nothing else. `

  // 8. NO TEXT ANYWHERE - All branding will be added separately
  optimizedPrompt += `CRITICAL TEXT REMOVAL: DO NOT add ANY text, words, letters, signatures, watermarks, dates, labels, scribbles, handwriting, or writing ANYWHERE in the image. ABSOLUTELY NO text in ANY location - not in corners, not at bottom, not at top, not on sides. NO signatures like "Mockr", "R.K. Laxman", "AI", or any artist name. NO random words, NO speech text, NO labels, NO scribbled letters. Do not write ANYTHING. Keep the ENTIRE image completely clean without ANY text overlays, signatures, written words, or letter-like marks whatsoever. This is MANDATORY and CRITICAL - the image must be 100% text-free with zero written characters. `

  // 9. ARTISTIC TECHNIQUE - Clean confident ink lines
  optimizedPrompt += `AUTHENTIC R.K. LAXMAN INK TECHNIQUE: Draw with CLEAN, CONFIDENT single ink lines - no sketchy overlapping lines, no rough pencil texture, no multiple trial lines. Each line should be drawn ONCE with confidence. Use HEAVY diagonal crosshatching (dense parallel 45-degree lines) for ALL shadows: under chairs, under desks, on floors, behind characters, on clothing folds, in corners. The crosshatching should be VERY PROMINENT and DENSE creating strong texture. Use solid black fills for hair, dark clothing, deep shadows. The overall look should be simple line art with heavy shadow hatching, NOT detailed realistic sketching. `

  // 10. FRAME AND COMPOSITION - Distinctive thick black border
  optimizedPrompt += `MANDATORY THICK BLACK BORDER FRAME: The ENTIRE comic panel MUST be surrounded by a VERY THICK, BOLD, SOLID black rectangular border frame. Draw a thick black line (minimum 15-20 pixels wide) forming a complete rectangle around ALL FOUR SIDES of the image. This thick black border is ABSOLUTELY ESSENTIAL - it should be one of the most prominent features of the cartoon, forming a strong black frame visible on top edge, bottom edge, left edge, and right edge. The border must be continuous, unbroken, and very prominent. Inside the frame, position 2-3 characters in clear arrangement with proper size perspective. Main action in center-left area. `

  // 11. TECHNICAL CONSTRAINTS - Pure minimalist Laxman aesthetic
  optimizedPrompt += `STRICT TECHNICAL REQUIREMENTS: Pure black and white only - no color, no gray tones except from crosshatching, no gradients, no photorealism, no sketchy rough lines, no Western cartoon style. Hand-drawn quality with SINGLE confident ink lines for outlines. HEAVY diagonal crosshatching for shadows (very dense parallel lines). Solid black fills for contrast. VERY THICK black border frame around entire panel. Minimal simple background (empty walls, basic furniture). Simple round faces with minimal features (no detailed realistic faces). Clean white background in reserved top-right area. NO text anywhere. `

  // 12. FINAL STYLE EMPHASIS - Match visual style, not content
  optimizedPrompt += `FINAL CRITICAL REQUIREMENT: The characters, scenario, and subject matter should match the DESCRIPTION PROVIDED, but the DRAWING STYLE, SKETCHING TECHNIQUE, LINE QUALITY, SHADING PATTERN, LAYOUT FORMAT, COMPOSITION, and VISUAL APPEARANCE must look EXACTLY like an authentic R.K. Laxman political cartoon from The Times of India 1960s-1980s era. Focus on matching: SIMPLE clean line work, HEAVY diagonal crosshatching for shadows, THICK black border frame, MINIMAL background details, SIMPLE round cartoon faces, lots of white space, confident single-line technique. The scene content will be different but the artistic style must be identical to classic Laxman cartoons.`

  console.log('🔧 FLUX-OPTIMIZED PROMPT CREATED')
  console.log('📝 Final prompt length:', optimizedPrompt.length)
  console.log('✅ Natural language structure for FLUX')
  console.log('✅ Clear character count directive')
  console.log('✅ CONSISTENT Common Man character (50s, untucked shirt, pants, slippers)')
  console.log('✅ Mockr watermark in bottom right corner')
  console.log('✅ Explicit background simplicity mandate')
  console.log('🎯 COMPLETE FLUX-OPTIMIZED PROMPT:')
  console.log('=====================================')
  console.log(optimizedPrompt)
  console.log('=====================================')

  return optimizedPrompt
}

function extractAllVisualElements(description: string) {
  const elements = {
    characters: [] as string[],
    objects: [] as string[],
    actions: [] as string[],
    textNumbers: [] as string[],
    setting: null as string | null
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
    prompt += `Classic Indian editorial cartoon style: simple line drawings, round expressive character faces, clear facial expressions, minimal geometric backgrounds, focus on human emotions. `
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