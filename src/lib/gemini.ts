import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '')

export async function generateSatiricalQuote(situation: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })

    // Add timestamp and random seed for variability
    const timestamp = Date.now()
    const randomSeed = Math.floor(Math.random() * 1000)

    const prompt = `You are an R.K. Laxman-style political cartoonist creating editorial cartoon captions. Create a SHARP, SITUATION-SPECIFIC satirical caption for this EXACT political situation:

SITUATION: ${situation}

[Variation ID: ${timestamp}-${randomSeed}]

CRITICAL REQUIREMENTS:
1. MUST directly reference the SPECIFIC situation above - use exact details from it
2. Single satirical sentence exposing the irony/hypocrisy in THIS EXACT situation
3. Length: 50-120 characters (newspaper editorial caption style)
4. Dry, observational wit - not generic commentary
5. No quotes around the caption - this is a caption, not dialogue
6. Each generation must offer a DIFFERENT satirical angle on the same situation

R.K. LAXMAN STYLE CAPTION EXAMPLES (notice how they reference SPECIFIC situation details):

Situation: "Politicians visiting hospitals while cutting healthcare budgets"
Caption: "Wonderful facilities! I must remember to use my private hospital for my next check-up."

Situation: "Government officials stuck in potholes after road inauguration"
Caption: "Quality control inspection! We're testing durability from the ground level."

Situation: "Ministers attending climate summits via private jets"
Caption: "My carbon footprint is offset by the hot air from my speech."

Situation: "Digital arrest scam targeting minister's wife"
Caption: "Cybersecurity training starts at home, apparently."

Situation: "Food minister at feast while farmers protest for fair prices"
Caption: "Solidarity with farmers - I'm personally testing if their produce is worth more."

Situation: "Tax minister explaining tax benefits while hiding money in offshore accounts"
Caption: "Tax optimization is a skill I'm uniquely qualified to teach."

YOUR TASK:
Analyze the situation "${situation}" carefully. Identify the KEY IRONY (what's contradictory or absurd about it). Create a caption where the politician/character acknowledges this irony with dry, deadpan humor. The caption MUST reference specific elements from the situation (names, actions, objects, numbers mentioned).

Generate ONE satirical caption now:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let quote = response.text().trim()

    // Clean up the response - remove any formal prefixes and quotes
    quote = quote.replace(/^["']|["']$/g, '')
    quote = quote.replace(/^Here's a caption.*?:\s*/i, '')
    quote = quote.replace(/^Caption:\s*/i, '')
    quote = quote.replace(/^In the style of.*?:\s*/i, '')

    // We want a single satirical line
    const lines = quote.split('\n').filter(line => line.trim()).map(line => line.trim())

    // Take the first meaningful line as the caption
    if (lines.length > 0) {
      quote = lines[0]
    } else {
      // Return "Try Again" instead of fallback
      return 'Try Again'
    }

    // Ensure it's not too long (max 120 characters for newspaper style)
    if (quote.length > 120) {
      quote = quote.substring(0, 117) + '...'
    }

    return quote

  } catch (error) {
    console.error('Gemini quote generation failed:', error)
    // Return "Try Again" to prompt user to retry
    return 'Try Again'
  }
}

function generateFallbackQuote(situation: string): string {
  const situationLower = situation.toLowerCase()

  // R.K. Laxman style captions - situation-specific dry wit from politician's perspective

  // H-1B/Visa/Immigration
  if (situationLower.includes('h-1b') || situationLower.includes('visa') || situationLower.includes('immigration')) {
    if (situationLower.includes('fee') || situationLower.includes('cost') || situationLower.includes('$')) {
      const options = [
        "Premium visa fees ensure only the most financially committed immigrants!",
        "We're not raising barriers, we're adding value to the American dream!",
        "High visa costs - quality control for quality immigrants!"
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
    return "Open borders, expensive gates - it's all about balance!"
  }

  // Healthcare/medical with budget/cutting
  if (situationLower.includes('healthcare') || situationLower.includes('hospital') || situationLower.includes('medical')) {
    if (situationLower.includes('budget') || situationLower.includes('cut') || situationLower.includes('fund')) {
      const options = [
        "Cutting ribbons and budgets - double efficiency!",
        "Wonderful facilities! I'll use my private hospital, of course.",
        "Healthcare for all - photo opportunities included!"
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
    return "Nothing says reform like a good ribbon-cutting ceremony!"
  }

  // Education with abroad/private schools
  if (situationLower.includes('education') || situationLower.includes('school')) {
    if (situationLower.includes('abroad') || situationLower.includes('private') || situationLower.includes('international')) {
      const options = [
        "Local schools for local kids - mine need international exposure!",
        "I believe in public education so strongly, I chose private for my children!",
        "These schools are excellent - for photo ops!"
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
    return "Education reform starts with impressive inauguration speeches!"
  }

  // Climate with jets/travel
  if (situationLower.includes('climate') || situationLower.includes('environment') || situationLower.includes('green')) {
    if (situationLower.includes('jet') || situationLower.includes('fly') || situationLower.includes('travel')) {
      const options = [
        "My private jet runs on renewable hypocrisy!",
        "Carbon footprint? More like carbon leadership!",
        "Flying first class to fight climate change - sacrifice is key!"
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
    return "Going green - after this red-carpet arrival!"
  }

  // Tax/Money/Offshore
  if (situationLower.includes('tax') && (situationLower.includes('offshore') || situationLower.includes('haven') || situationLower.includes('hiding'))) {
    const options = [
      "I teach tax optimization from personal experience!",
      "Fair taxation - I fairly minimize mine!",
      "Offshore accounts are international investments, technically!"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  // Food/Farmers/Agriculture
  if (situationLower.includes('food') || situationLower.includes('farmer') || situationLower.includes('agriculture')) {
    if (situationLower.includes('feast') || situationLower.includes('protest') || situationLower.includes('price')) {
      const options = [
        "Solidarity with farmers - I'm quality-testing their produce!",
        "Supporting agriculture through aggressive consumption!",
        "Someone needs to check if this food is worth fair prices!"
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
    return "Agricultural reform - one feast at a time!"
  }

  // Economy/Growth with contradictory policies
  if (situationLower.includes('growth') || situationLower.includes('economy')) {
    if (situationLower.includes('hurt') || situationLower.includes('harm') || situationLower.includes('damage')) {
      const options = [
        "Economic growth through creative accounting!",
        "Hurting growth strategically - it's called planning!",
        "The economy is thriving - in my portfolio!"
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
    return "Economic indicators look great from my tax bracket!"
  }

  // Jobs/Employment
  if (situationLower.includes('job') || situationLower.includes('employment') || situationLower.includes('work')) {
    const options = [
      "Job creation - we're creating the application process!",
      "Employment opportunities for all - terms and conditions apply!",
      "We're not blocking jobs, we're building character!"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  // Transport/Infrastructure specific scenarios
  if (situationLower.includes('pothole')) {
    const options = [
      "Quality control - testing roads from ground level!",
      "Natural speed breakers - innovation in road safety!",
      "Potholes are feature updates, not bugs!"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }
  else if (situationLower.includes('road') && (situationLower.includes('minister') || situationLower.includes('inaugurating'))) {
    const options = [
      "Inaugurating today's project, tomorrow's renovation!",
      "These roads will last years - of repairs!",
      "Quality roads - just needs a few minor fixes!"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }
  else if (situationLower.includes('transport') || situationLower.includes('traffic')) {
    const options = [
      "Traffic jams build patience - essential life skills!",
      "Standstill traffic - more time to appreciate the city!",
      "Revolutionary transport - going nowhere, faster!"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }
  else if (situationLower.includes('infrastructure') || situationLower.includes('construction')) {
    const options = [
      "Building the future - one budget overrun at a time!",
      "Infrastructure development - timeline negotiable!",
      "World-class construction - world-class delays!"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }
  else if (situationLower.includes('stuck') || situationLower.includes('trapped')) {
    return "Hands-on inspection - leadership from ground level!"
  }
  else if (situationLower.includes('inaugurating') || situationLower.includes('opening')) {
    return "Ribbons cut, photos taken - mission accomplished!"
  }
  else if (situationLower.includes('scam') || situationLower.includes('fraud') || situationLower.includes('digital arrest')) {
    const options = [
      "Cybersecurity training starts at home, clearly!",
      "Digital literacy - adding it to next year's budget!",
      "We're learning from this... expensive lesson!"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }
  else if (situationLower.includes('corruption') || situationLower.includes('bribe')) {
    const options = [
      "Transparency in action - transparently transactional!",
      "It's not corruption, it's expedited processing!",
      "Efficiency fees - government innovation!"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  // Generic but still R.K. Laxman style fallback - dry politician humor
  const genericOptions = [
    "Democracy in action - just ignore the contradictions!",
    "Public service - serving the public my photo opportunities!",
    "Governance excellence - one ceremony at a time!",
    "Leadership means never having to say you're accountable!"
  ]
  return genericOptions[Math.floor(Math.random() * genericOptions.length)]
}

export async function generateEnhancedDialogue(
  situation: string,
  characters: string,
  tone: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })

    const prompt = `Create a satirical dialogue that DIRECTLY addresses this specific political situation:

SITUATION: ${situation}
CHARACTERS: ${characters || 'politician'}
TONE: ${tone}

CRITICAL REQUIREMENTS:
- Must be EXACTLY about the situation described above
- Single line of dialogue (max 70 characters)
- Must be in quotes: "Your dialogue here"
- Should expose the hypocrisy/contradiction in the SPECIFIC situation
- Make it biting, intelligent, and memorable

TONE GUIDELINES:
- Satirical: Expose irony with biting wit ("Healthcare for all... sponsored by Big Pharma!")
- Witty: Clever wordplay about the situation ("My stocks are healthier than my patients!")
- Critical: Direct condemnation ("Profiting from the pain I promise to cure!")
- Observational: Dry, matter-of-fact ("Just balancing my portfolio and principles!")

EXAMPLES FOR HEALTHCARE + PHARMA STOCKS:
- "Free healthcare for all... after I sell my pharma shares!"
- "Your health is my priority... and my investment!"
- "Trust me, I'm financially invested in your wellness!"

Generate ONE dialogue line that DIRECTLY satirizes the exact situation described:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let dialogue = response.text().trim()

    // Clean up the response - ensure it's in quotes
    dialogue = dialogue.replace(/^["']|["']$/g, '') // Remove existing quotes
    dialogue = `"${dialogue}"` // Add proper quotes

    // Ensure it's not too long
    if (dialogue.length > 65) {
      dialogue = dialogue.substring(0, 62) + '..."'
    }

    return dialogue

  } catch (error) {
    console.error('Gemini dialogue generation failed:', error)
    // Fallback to existing dialogue system
    return generateFallbackDialogue(situation, characters, tone)
  }
}

export async function generateEnhancedPrompt(
  situation: string,
  quote?: string,
  characters?: string,
  setting?: string,
  tone?: string,
  style?: string
): Promise<string> {
  try {
    console.log('[Gemini] Starting enhanced prompt generation...')

    // Check if API key is available
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.log('[Gemini] No API key found, using fallback')
      return generateFallbackPrompt(situation, characters, setting, tone, style)
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })
    console.log('[Gemini] Model initialized successfully')

    const prompt = `Create a SIMPLE, FOCUSED visual description for an R.K. Laxman editorial cartoon showing the MAIN ACTION only:

SITUATION: ${situation}
${quote ? `QUOTE: ${quote}` : ''}

Create a SHORT description (under 400 characters) that shows:
1. The MAIN ACTION/EVENT from the situation (DO NOT mention Common Man - he will be added separately)
2. The key irony/contradiction visually represented
3. Simple, clear scene - focus on the main characters and their actions
4. Keep character poses SIMPLE - use side profiles, characters with hands behind back, hands at sides, or simple pointing gestures ONLY. AVOID showing multiple hands or complex hand positions

IMPORTANT: Do NOT include "Common Man" in your description. Only describe the main event/action. Keep hand poses extremely simple.

EXAMPLES:

Situation: "Trump's $100,000 H-1B visa fee could hurt growth"
Quote: "Making America expensive again, one visa at a time!"
Description: "Trump character holds giant '$100,000 VISA FEE' sign while job seekers walk away disappointed. Immigration office with expensive price tags everywhere."

Situation: "Minister's wife duped of $400,000 in digital arrest"
Quote: "Expert in governance, amateur in online security!"
Description: "Minister's wife stares shocked at computer screen showing '$400,000 SCAMMED' alert. Minister tries to comfort her. Digital fraud icons floating around computer. Home office setting."

Situation: "Officer bribing minister for contract"
Quote: "Transparency in action!"
Description: "Officer hands money to Minister. Lamp above them shines, casting light on the bribe. Office setting with documents labeled 'CONTRACT'."

Keep it SIMPLE and VISUAL. Focus on the main action and satirical irony. DO NOT mention Common Man.

Create description for the situation above:`

    console.log('[Gemini] Sending request to Gemini API...')
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text().trim()

    console.log('[Gemini] Prompt generated successfully, length:', text.length)
    return text

  } catch (error) {
    console.error('[Gemini] Prompt generation failed:', error)
    console.log('[Gemini] Using fallback prompt generation')
    // Fallback to existing prompt system
    return generateFallbackPrompt(situation, characters, setting, tone, style)
  }
}

// Enhanced fallback functions with situation-specific logic
function generateFallbackDialogue(situation: string, characters: string, tone: string): string {
  const situationLower = situation.toLowerCase()

  // Healthcare/pharma specific
  if (situationLower.includes('healthcare') && (situationLower.includes('pharma') || situationLower.includes('stock'))) {
    const options = [
      `"Free healthcare for all... after I sell my pharma shares!"`,
      `"Your health is my priority... and my investment!"`,
      `"Trust me, I'm financially invested in your wellness!"`
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  // Education promises
  else if (situationLower.includes('education') && situationLower.includes('abroad')) {
    return `"Local education builds character... that's why I send my kids abroad!"`
  }

  // Climate/environment hypocrisy
  else if (situationLower.includes('climate') && (situationLower.includes('private jet') || situationLower.includes('emission'))) {
    return `"Carbon neutral? I'm carbon positive... about my jet!"`
  }

  // Inflation/economy
  else if (situationLower.includes('inflation') || situationLower.includes('price')) {
    return `"Rising prices? That's just economic enthusiasm!"`
  }

  // Generic but satirical fallback
  else {
    const genericOptions = [
      `"Trust the process... whatever that means!"`,
      `"Everything according to plan... mostly!"`,
      `"I have this completely under control!"`
    ]
    return genericOptions[Math.floor(Math.random() * genericOptions.length)]
  }
}

function generateFallbackPrompt(
  situation: string,
  quote?: string,
  characters?: string,
  setting?: string,
  tone?: string,
  style?: string
): string {
  const cleanSituation = situation.replace(/['"]/g, '').trim()
  const cleanQuote = quote ? quote.replace(/['"]/g, '').trim() : ''

  // Create simple, focused description based on situation keywords (NO Common Man - added separately)
  const situationLower = cleanSituation.toLowerCase()

  let description = ""

  // Extract key elements and create specific visual based on situation - focus on MAIN ACTION only
  if (situationLower.includes('scam') || situationLower.includes('fraud') || situationLower.includes('duped')) {
    if (situationLower.includes('wife') || situationLower.includes('family')) {
      description = "Politician's wife looking shocked at computer screen showing '$400,000 SCAMMED' while politician tries to explain. Digital scam icons around. Home office setting."
    } else {
      description = "Person looking shocked at computer screen showing scam alerts while official looks embarrassed. Digital fraud setting."
    }
  }
  else if (situationLower.includes('visa') || situationLower.includes('h-1b')) {
    if (situationLower.includes('fee') || situationLower.includes('$')) {
      description = "Giant '$100,000' price tag attached to American visa while job seekers walk away disappointed. Immigration office setting."
    } else {
      description = "Expensive visa barriers blocking job seekers while politician waves welcome sign. Immigration setting."
    }
  }
  else if (situationLower.includes('hospital') || situationLower.includes('healthcare')) {
    description = "Politician cutting ribbon at hospital entrance while patients wait in long emergency room lines. Hospital setting."
  }
  else if (situationLower.includes('school') || situationLower.includes('education')) {
    description = "Politician inaugurating local school while secretly holding brochures for international schools. School setting."
  }
  else if (situationLower.includes('climate') || situationLower.includes('environment')) {
    description = "Politician giving green speech while private jet takes off in background. Conference setting."
  }
  else if (situationLower.includes('job') || situationLower.includes('employment')) {
    description = "Job fair with all booths showing 'No Vacancy' signs while politician promises employment. Job fair setting."
  }
  else if (situationLower.includes('corruption') || situationLower.includes('money')) {
    description = "Politician counting money behind desk while citizens wait in poverty outside office. Government office setting."
  }
  else if (situationLower.includes('bribe') || situationLower.includes('bribing')) {
    description = "Officer hands money to Minister. Lamp shines above, casting light on the bribe. Office setting with documents."
  }
  else {
    // Create description based on any specific nouns or actions in the situation
    const words = cleanSituation.split(' ')
    const keyWords = words.filter(word => word.length > 4).slice(0, 3).join(', ')
    description = `Politician dealing with situation involving ${keyWords} while citizens look concerned. Relevant setting.`
  }

  if (cleanQuote) {
    description += ` Speech bubble: "${cleanQuote}"`
  }

  return description
}