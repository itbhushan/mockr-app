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

    const prompt = `Create a CARTOON-STYLE R.K. Laxman editorial comic prompt for this exact scenario:

SPECIFIC SITUATION: ${situation}
CHARACTERS: ${characters || 'politician, citizens'}
SETTING: ${setting || 'relevant to situation'}
TONE: ${tone}
STYLE: ${style}

CRITICAL: THIS MUST BE A CARTOON/COMIC ILLUSTRATION - NOT A REALISTIC PHOTO

MANDATORY ELEMENTS FOR CARTOON COMIC STYLE:

1. THE COMMON MAN CHARACTER (ABSOLUTELY MANDATORY - NO EXCEPTIONS):
   - MUST BE THE MOST VISIBLE CHARACTER after the main politician
   - CARTOON APPEARANCE: Middle-aged Indian man cartoon character with distinctive balding head showing side hair tufts, round wire-rim spectacles, simple white shirt with vertical stripes or checkered pattern, dark plain pants, modest mustache
   - CARTOON FACIAL EXPRESSION: Bewildered, concerned, or surprised cartoon expression with raised eyebrows showing confusion at political hypocrisy
   - CARTOON BODY LANGUAGE: Standing prominently in the FOREGROUND, arms crossed or hands at sides, clearly observing the main political action
   - POSITION: MUST BE in the LEFT or RIGHT FOREGROUND of the image, NEVER behind other characters, NEVER obscured
   - SIZE: Should be approximately 1/2 the size of main political figure - LARGE ENOUGH to be clearly seen
   - VISUAL PRIORITY: Second most important visual element after the main politician
   - CRITICAL: If this character is not clearly visible, the image is INCOMPLETE and REJECTED

2. CARTOON EDITORIAL STYLE (R.K. LAXMAN AUTHENTIC - STRICT ADHERENCE):
   - EDITORIAL CARTOON: Black and white line art cartoon, NOT realistic photography
   - CARTOON LINE ART: Clean, bold black cartoon outlines, simple cross-hatching for minimal shadows only
   - CARTOON COMPOSITION: Single panel editorial cartoon, newspaper comic style, minimal geometric background elements
   - CARTOON CHARACTER STYLE: Round cartoon faces, simple expressive cartoon features, clear distinct cartoon facial expressions, medium line weight
   - CARTOON BACKGROUND: Extremely minimal cartoon elements - only essential cartoon objects like simple buildings, basic geometric shapes, mostly white space
   - EDITORIAL CARTOON QUALITY: Professional newspaper cartoon standard, clear cartoon visual narrative

3. SATIRICAL COMPOSITION:
   - Main political figures engaged in hypocritical behavior
   - The Common Man reacting with appropriate facial expression
   - Visual elements that expose the contradiction/irony
   - Props that relate specifically to the situation

EXAMPLE FOR HEALTHCARE + PHARMA STOCKS:
"R.K. Laxman style editorial cartoon: Politician at podium promising free healthcare while secretly holding pharmaceutical stock certificates behind back. Hospital in background with long patient queues. The Common Man (balding, spectacles, checkered shirt, dark pants) stands to the side with bewildered expression, watching the hypocrisy. Clean black and white line art, cross-hatching shadows, minimal background, focus on satirical storytelling."

Generate a detailed Stable Diffusion XL prompt that creates a CARTOON/COMIC illustration (NOT realistic photo). Start with 'EDITORIAL CARTOON: Black and white line art cartoon illustration.' Then ensure the Common Man character is visible. The Common Man MUST be the second most important visual element. Capture this EXACT political scenario in authentic R.K. Laxman cartoon style:`

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
    specificElements = "politician at podium promising free healthcare while secretly holding pharmaceutical stock certificates behind back, hospital background with long patient queues, money symbols floating around"
  } else if (situationLower.includes('education') && situationLower.includes('abroad')) {
    specificElements = "politician pointing to local school while holding airplane tickets for personal use, contrast between poor local school and luxury foreign education imagery"
  } else if (situationLower.includes('climate') && situationLower.includes('jet')) {
    specificElements = "politician speaking about environment while private jet visible in background, carbon emission clouds ironically surrounding the scene"
  } else if (situationLower.includes('corruption') || situationLower.includes('scandal')) {
    specificElements = "politician giving speech about transparency while briefcase of money partially hidden, documents scattered around"
  } else {
    specificElements = "politician making grand promises while contradictory actions clearly visible in background"
  }

  return `EDITORIAL CARTOON: Black and white line art cartoon illustration, NOT realistic photography. R.K. Laxman style editorial cartoon, pure black and white cartoon line art, single panel newspaper comic illustration. CARTOON STYLE MANDATE: This must be a drawn cartoon/comic illustration with simple line art, NOT a realistic photo or 3D render. FOREGROUND CARTOON CHARACTER: The Common Man cartoon character MUST be prominently visible in the foreground. CRITICAL CARTOON CHARACTER PLACEMENT: In the FOREGROUND, position a cartoon middle-aged Indian man with distinctive balding head and side hair tufts, round wire-rim spectacles, simple white shirt with vertical stripes, dark plain pants, modest mustache. He MUST be clearly visible as a CARTOON CHARACTER in the LEFT or RIGHT foreground, showing bewildered/concerned cartoon expression while observing political hypocrisy. SIZE REQUIREMENT: The Common Man cartoon should be 1/2 the size of the main political cartoon figure - LARGE and CLEARLY VISIBLE. MAIN CARTOON SCENE: ${specificElements}. Additional cartoon characters: ${characters || 'politician cartoon with expressive face showing hypocrisy'}. Cartoon setting: ${setting || 'minimal relevant cartoon background'}. CARTOON COMPOSITION RULES: 1) Common Man cartoon in foreground - NOT obscured, 2) Main politician cartoon in center/background, 3) Simple cartoon background elements. STRICT CARTOON VISUAL STYLE: Only black ink lines on white background, no colors, no shading, no gradients, clean bold cartoon outlines, simple cross-hatching for minimal shadows, extremely minimal geometric cartoon background elements, professional newspaper editorial cartoon quality, drawn illustration style. VISUAL HIERARCHY: 1) Common Man cartoon (foreground), 2) Main politician cartoon (center), 3) Background cartoon elements. The Common Man represents public bewilderment at political absurdity and is MANDATORY for authentic R.K. Laxman cartoon style. IMPORTANT: This is a hand-drawn style cartoon illustration, not a photograph.`
}