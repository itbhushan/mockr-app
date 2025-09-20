import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '')

export async function generateEnhancedDialogue(
  situation: string,
  characters: string,
  tone: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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
  characters: string,
  setting: string,
  tone: string,
  style: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Create a SITUATION-SPECIFIC image generation prompt for this exact political scenario:

SPECIFIC SITUATION: ${situation}
CHARACTERS: ${characters || 'politician, citizens'}
SETTING: ${setting || 'relevant to situation'}
TONE: ${tone}
STYLE: ${style}

CRITICAL: The image must VISUALLY REPRESENT the exact situation described above.

Create a detailed Stable Diffusion XL prompt that includes:

1. SITUATION-SPECIFIC SCENE: Describe the exact visual that represents this political scenario
2. CHARACTER ACTIONS: What the characters are doing that relates to this specific situation
3. VISUAL CONTRADICTIONS: Show the hypocrisy/irony mentioned in the situation
4. PROPS/OBJECTS: Include specific items that relate to the situation (documents, money, symbols)
5. FACIAL EXPRESSIONS: Match the ${tone} tone with appropriate expressions

EXAMPLE FOR HEALTHCARE + PHARMA STOCKS:
"Political cartoon showing a politician at podium promising healthcare while secretly holding pharma stock certificates behind back, hospital in background with long queues, money symbols floating around politician, R.K. Laxman style black and white line art"

Generate a detailed, situation-specific prompt (max 250 words) that captures THIS EXACT political scenario visually:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text().trim()

  } catch (error) {
    console.error('Gemini prompt generation failed:', error)
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
  characters: string,
  setting: string,
  tone: string,
  style: string
): string {
  const situationLower = situation.toLowerCase()

  // Create situation-specific visual elements
  let specificElements = ""

  if (situationLower.includes('healthcare') && situationLower.includes('pharma')) {
    specificElements = "politician at podium with hidden pharmaceutical stock certificates, hospital background with long patient queues, money symbols floating around"
  } else if (situationLower.includes('education') && situationLower.includes('abroad')) {
    specificElements = "politician pointing to local school while holding airplane tickets, contrast between poor local school and luxury imagery"
  } else if (situationLower.includes('climate') && situationLower.includes('jet')) {
    specificElements = "politician speaking about environment with private jet visible in background, carbon emission clouds"
  } else {
    specificElements = "politician making promises while contradictory actions visible in background"
  }

  return `Professional R.K. Laxman style editorial cartoon, clean black and white line art, single panel illustration. Scene showing: ${specificElements}. Characters: ${characters || 'politician with expressive face showing hypocrisy'}. Setting: ${setting || 'relevant to political situation'}. Visual mood: ${tone} with clear irony and contradiction visible. Simple line drawings, expressive faces, minimal backgrounds, focus on satirical storytelling. Editorial cartoon quality, newspaper style, clear visual narrative that exposes political hypocrisy.`
}