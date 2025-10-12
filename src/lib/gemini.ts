import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '')

export async function generateSatiricalQuote(situation: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })

    const prompt = `You are R.K. Laxman, India's master political cartoonist. Create a SHARP, WITTY caption for your editorial cartoon about this political situation:

SITUATION: ${situation}

REQUIREMENTS for R.K. Laxman style caption:
- Single satirical sentence (like your classic newspaper captions)
- Should expose the SPECIFIC irony/absurdity in this exact situation
- Dry, observational wit with biting social commentary
- Length: 60-120 characters max (newspaper caption length)
- No quotes needed - this is a caption, not dialogue
- Reference specific details from the situation

CLASSIC R.K. LAXMAN CAPTION EXAMPLES:

Situation: "Politicians visiting hospitals while cutting healthcare budgets"
Caption: "Find out whose birth or death anniversary it is today. Mention he was a great patriot and did much to help the poor, etc. and release the statement to the press!"

Situation: "Government officials stuck in potholes after road inauguration"
Caption: "Too many enquiry reports, sir. If you remove a few, you can sit on them more comfortably."

Situation: "Ministers attending climate summits via private jets"
Caption: "They are not coming in because they say it's going to be the same speech and so is taken as heard."

Situation: "Digital arrest scam targeting minister's wife"
Caption: "Good news, sir! The enquiry report says that no one is responsible in the entire administration for anything!"

Create a satirical caption that captures the absurdity of the specific situation above in classic R.K. Laxman observational style:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let quote = response.text().trim()

    // Clean up the response - remove any formal prefixes and quotes
    quote = quote.replace(/^["']|["']$/g, '')
    quote = quote.replace(/^Here's a caption.*?:\s*/i, '')
    quote = quote.replace(/^Caption:\s*/i, '')
    quote = quote.replace(/^In the style of.*?:\s*/i, '')
    quote = quote.replace(/^R\.K\.?\s*Laxman.*?:\s*/i, '')

    // For R.K. Laxman style, we want a single satirical line
    const lines = quote.split('\n').filter(line => line.trim()).map(line => line.trim())

    // Take the first meaningful line as the caption
    if (lines.length > 0) {
      quote = lines[0]
    } else {
      quote = generateFallbackQuote(situation)
    }

    // Ensure it's not too long (max 120 characters for R.K. Laxman newspaper style)
    if (quote.length > 120) {
      quote = quote.substring(0, 117) + '...'
    }

    return quote

  } catch (error) {
    console.error('Gemini quote generation failed:', error)
    // Return error to prompt user to retry instead of showing fallback
    throw new Error('Failed to generate quote from AI. Please try again.')
  }
}

function generateFallbackQuote(situation: string): string {
  const situationLower = situation.toLowerCase()

  // R.K. Laxman style captions based on situation - single line observational wit

  // H-1B/Visa/Immigration
  if (situationLower.includes('h-1b') || situationLower.includes('visa') || situationLower.includes('immigration')) {
    if (situationLower.includes('fee') || situationLower.includes('cost') || situationLower.includes('$')) {
      return "The American dream now comes with a premium membership fee!"
    }
    return "Nothing says 'welcome to America' quite like a financial barrier!"
  }

  // Healthcare/medical with budget/cutting
  if (situationLower.includes('healthcare') || situationLower.includes('hospital') || situationLower.includes('medical')) {
    if (situationLower.includes('budget') || situationLower.includes('cut') || situationLower.includes('fund')) {
      return "Cutting ribbons and cutting budgets - efficiency at its finest!"
    }
    return "Nothing says healthcare reform like a photo opportunity!"
  }

  // Education with abroad/private schools
  if (situationLower.includes('education') || situationLower.includes('school')) {
    if (situationLower.includes('abroad') || situationLower.includes('private') || situationLower.includes('international')) {
      return "Local schools are perfect for inauguration ceremonies!"
    }
    return "Education investment - one photo-op at a time!"
  }

  // Climate with jets/travel
  if (situationLower.includes('climate') || situationLower.includes('environment') || situationLower.includes('green')) {
    if (situationLower.includes('jet') || situationLower.includes('fly') || situationLower.includes('travel')) {
      return "Flying private to save the planet - irony is truly a renewable resource!"
    }
    return "Going green while burning through carbon credits!"
  }

  // Economy/Growth with contradictory policies
  if (situationLower.includes('growth') || situationLower.includes('economy')) {
    if (situationLower.includes('hurt') || situationLower.includes('harm') || situationLower.includes('damage')) {
      return "Promoting economic growth through creative mathematics!"
    }
    return "The economy is doing great - just ask the right people!"
  }

  // Jobs/Employment
  if (situationLower.includes('job') || situationLower.includes('employment') || situationLower.includes('work')) {
    return "Creating employment opportunities by making them impossible to fill!"
  }

  // Transport/Infrastructure specific scenarios
  if (situationLower.includes('pothole')) {
    const options = [
      "Quality roads with natural speed control features!",
      "Every pothole is a reminder of our road-building excellence!",
      "Testing infrastructure durability from the ground up!"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }
  else if (situationLower.includes('road') && (situationLower.includes('minister') || situationLower.includes('inaugurating'))) {
    const options = [
      "Inaugurating today's roads, tomorrow's repair projects!",
      "Building character-building roads for the public!",
      "Premium road experience with adventure features!"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }
  else if (situationLower.includes('transport') || situationLower.includes('traffic')) {
    const options = [
      "Revolutionary traffic management - making standstill the new fast!",
      "Transport solutions that really move you... backwards!",
      "Patience is now officially a public virtue!"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }
  else if (situationLower.includes('infrastructure') || situationLower.includes('construction')) {
    return "Building tomorrow's problems with today's budget!"
  }
  else if (situationLower.includes('stuck') || situationLower.includes('trapped')) {
    return "Leadership means experiencing problems firsthand for better solutions!"
  }
  else if (situationLower.includes('inaugurating') || situationLower.includes('opening')) {
    return "Grand opening ceremonies - where ribbons matter more than results!"
  }
  else if (situationLower.includes('scam') || situationLower.includes('fraud')) {
    return "Digital literacy programs clearly need more funding!"
  }

  // Generic but still R.K. Laxman style fallback
  return "Trust the process and ignore the results - democracy with a warranty!"
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

IMPORTANT: Do NOT include "Common Man" in your description. Only describe the main event/action.

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