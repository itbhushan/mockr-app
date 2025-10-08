import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Get dialogue, situation, and description from query parameters
  const { searchParams } = new URL(request.url)
  const dialogue = searchParams.get('dialogue') || '"Everything is under control!"'
  const situation = searchParams.get('situation') || 'Political scenario'
  const description = searchParams.get('description') || ''

  // Debug: Log the API call
  console.log(`[${new Date().toISOString()}] Placeholder Comic API called:`, {
    dialogue: dialogue.substring(0, 50) + (dialogue.length > 50 ? '...' : ''),
    situation: situation.substring(0, 50) + (situation.length > 50 ? '...' : ''),
    description: description.substring(0, 50) + (description.length > 50 ? '...' : ''),
    timestamp: searchParams.get('t')
  })

  // Process the satirical quote for display (no speech bubble needed for R.K. Laxman style)
  const cleanDialogue = dialogue.replace(/"/g, '')

  // Use just the satirical quote as the caption (R.K. Laxman style)
  const captionWords = cleanDialogue.split(' ')
  const captionLines = []
  let currentCaptionLine = ''

  for (const word of captionWords) {
    if ((currentCaptionLine + word).length <= 70) {
      currentCaptionLine += (currentCaptionLine ? ' ' : '') + word
    } else {
      if (currentCaptionLine) captionLines.push(currentCaptionLine)
      currentCaptionLine = word
    }
  }
  if (currentCaptionLine) captionLines.push(currentCaptionLine)

  // Limit to 2 lines max for R.K. Laxman style caption
  const displayCaption = captionLines.slice(0, 2)

  // Dynamically determine scene type based on description, situation and dialogue
  const situationLower = situation.toLowerCase()
  const dialogueLower = dialogue.toLowerCase()
  const descriptionLower = description.toLowerCase()

  console.log('🎨 Analyzing scenario for SVG generation:', {
    situation: situation.substring(0, 50),
    dialogue: dialogue.substring(0, 50),
    description: description.substring(0, 50),
    hasInfluencer: situationLower.includes('influencer') || descriptionLower.includes('influencer'),
    hasDigital: situationLower.includes('digital') || descriptionLower.includes('digital'),
    hasPhone: dialogueLower.includes('mute') || dialogueLower.includes('comment'),
    hasPothole: descriptionLower.includes('pothole') || situationLower.includes('pothole'),
    hasMinister: descriptionLower.includes('minister') || situationLower.includes('minister')
  })

  // Generate appropriate SVG based on scenario (prioritize description for visual accuracy)
  let svgContent = generateDynamicSVG(situation, dialogue, description, displayCaption)

  return new NextResponse(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff'
    }
  })
}

function generateDynamicSVG(situation: string, dialogue: string, description: string, displayCaption: string[]): string {
  const situationLower = situation.toLowerCase()
  const dialogueLower = dialogue.toLowerCase()
  const descriptionLower = description.toLowerCase()

  // Check for pothole/infrastructure scenario (NEW!)
  if (descriptionLower.includes('pothole') ||
      descriptionLower.includes('ribbon-cutting') ||
      descriptionLower.includes('minister in suit, stuck') ||
      situationLower.includes('pothole') ||
      situationLower.includes('infrastructure')) {

    console.log('🎯 Generating pothole infrastructure scene')
    return generatePotholeScene(displayCaption)
  }

  // Check for social media/digital governance scenario
  else if (situationLower.includes('social media') ||
      situationLower.includes('influencer') ||
      situationLower.includes('digital') ||
      descriptionLower.includes('influencer') ||
      descriptionLower.includes('digital') ||
      dialogueLower.includes('mute') ||
      dialogueLower.includes('comment')) {

    console.log('🎯 Generating social media influencer scene')
    return generateInfluencerScene(displayCaption)
  }

  // Check for opposition/policy scenario
  else if (situationLower.includes('opposition') ||
           situationLower.includes('policy') ||
           dialogueLower.includes('opposition') ||
           dialogueLower.includes('shared vision')) {

    console.log('🎯 Generating opposition leader scene')
    return generateOppositionScene(displayCaption)
  }

  // Default to reference image style office scene
  else {
    console.log('🎯 Generating default office scene (reference style)')
    return generateReferenceStyleScene(displayCaption)
  }
}

function generateReferenceStyleScene(displayCaption: string[]): string {
  return `<svg width="600" height="500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500">
  <!-- Outer border - EXACTLY like reference image -->
  <rect width="600" height="500" fill="white" stroke="#000" stroke-width="8"/>

  <!-- Inner panel -->
  <rect x="15" y="15" width="570" height="380" fill="white" stroke="#000" stroke-width="4"/>

  <!-- REFERENCE IMAGE LAYOUT - Three characters office scene -->

  <!-- Floor with crosshatching -->
  <g stroke="#000" stroke-width="2" fill="none">
    <line x1="25" y1="360" x2="575" y2="360"/>
    <line x1="30" y1="370" x2="570" y2="370"/>
    <line x1="35" y1="380" x2="565" y2="380"/>
    <!-- Diagonal crosshatch lines -->
    <line x1="20" y1="365" x2="100" y2="385"/>
    <line x1="40" y1="365" x2="120" y2="385"/>
    <line x1="60" y1="365" x2="140" y2="385"/>
    <line x1="80" y1="365" x2="160" y2="385"/>
  </g>

  <!-- Back walls and room structure -->
  <g stroke="#000" stroke-width="3" fill="none">
    <!-- Left wall -->
    <line x1="25" y1="25" x2="25" y2="360"/>
    <!-- Right wall -->
    <line x1="575" y1="25" x2="575" y2="360"/>
    <!-- Back wall -->
    <line x1="25" y1="25" x2="575" y2="25"/>

    <!-- Doorways like in reference -->
    <rect x="30" y="25" width="45" height="90" fill="white" stroke="#000" stroke-width="3"/>
    <rect x="525" y="25" width="45" height="90" fill="white" stroke="#000" stroke-width="3"/>

    <!-- Door frames -->
    <line x1="35" y1="25" x2="35" y2="115"/>
    <line x1="70" y1="25" x2="70" y2="115"/>
    <line x1="530" y1="25" x2="530" y2="115"/>
    <line x1="565" y1="25" x2="565" y2="115"/>
  </g>

  <!-- Central desk - exactly like reference -->
  <g stroke="#000" stroke-width="3" fill="white">
    <!-- Main desk surface -->
    <rect x="220" y="280" width="160" height="25"/>
    <!-- Desk front panel -->
    <rect x="220" y="305" width="160" height="40"/>
    <!-- Desk legs -->
    <rect x="230" y="305" width="12" height="45"/>
    <rect x="358" y="305" width="12" height="45"/>

    <!-- Papers scattered on desk (like reference) -->
    <rect x="240" y="270" width="25" height="18" stroke-width="2"/>
    <rect x="270" y="265" width="20" height="15" stroke-width="2"/>
    <rect x="300" y="275" width="30" height="15" stroke-width="2"/>
    <rect x="340" y="268" width="25" height="20" stroke-width="2"/>
  </g>

  <!-- Chair behind desk -->
  <g stroke="#000" stroke-width="3" fill="white">
    <rect x="170" y="240" width="30" height="40"/>
    <rect x="170" y="220" width="30" height="25"/>
  </g>

  <!-- Waste basket (like in reference) -->
  <ellipse cx="480" cy="340" rx="12" ry="18" fill="white" stroke="#000" stroke-width="3"/>
  <g stroke="#000" stroke-width="1">
    <line x1="472" y1="330" x2="488" y2="330"/>
    <line x1="470" y1="340" x2="490" y2="340"/>
    <line x1="472" y1="350" x2="488" y2="350"/>
  </g>

  <!-- CHARACTER 1 - Standing figure (left, like reference) -->
  <g stroke="#000" fill="white">
    <!-- Head -->
    <ellipse cx="120" cy="220" rx="22" ry="28" stroke-width="4"/>

    <!-- Hair -->
    <path d="M 105 200 Q 115 190 135 200" stroke-width="3" fill="none"/>
    <path d="M 110 205 Q 120 195 130 205" stroke-width="2" fill="none"/>

    <!-- Eyes -->
    <circle cx="112" cy="215" r="2" fill="#000"/>
    <circle cx="128" cy="215" r="2" fill="#000"/>

    <!-- Nose -->
    <path d="M 120 220 L 118 225 L 122 225 Z" fill="#000"/>

    <!-- Mouth -->
    <path d="M 115 235 Q 120 238 125 235" stroke-width="2" fill="none"/>

    <!-- Body -->
    <rect x="105" y="248" width="30" height="60" stroke-width="4"/>

    <!-- Arms -->
    <line x1="105" y1="265" x2="85" y2="285" stroke-width="4"/>
    <line x1="135" y1="265" x2="155" y2="285" stroke-width="4"/>

    <!-- Hands -->
    <ellipse cx="85" cy="285" rx="5" ry="7" stroke-width="3"/>
    <ellipse cx="155" cy="285" rx="5" ry="7" stroke-width="3"/>

    <!-- Pants and legs -->
    <rect x="112" y="308" width="16" height="45" stroke-width="3"/>
    <line x1="116" y1="353" x2="116" y2="370" stroke-width="3"/>
    <line x1="124" y1="353" x2="124" y2="370" stroke-width="3"/>

    <!-- Shoes -->
    <ellipse cx="116" cy="375" rx="8" ry="4" fill="#000"/>
    <ellipse cx="124" cy="375" rx="8" ry="4" fill="#000"/>
  </g>

  <!-- CHARACTER 2 - Behind desk (center, like reference) -->
  <g stroke="#000" fill="white">
    <!-- Head -->
    <ellipse cx="300" cy="200" rx="24" ry="30" stroke-width="4"/>

    <!-- Hair (slightly balding) -->
    <path d="M 280 180 Q 290 170 310 175" stroke-width="3" fill="none"/>
    <path d="M 285 185 Q 295 175 305 185" stroke-width="2" fill="none"/>

    <!-- Eyes -->
    <circle cx="292" cy="195" r="2" fill="#000"/>
    <circle cx="308" cy="195" r="2" fill="#000"/>

    <!-- Nose -->
    <path d="M 300 200 L 298 205 L 302 205 Z" fill="#000"/>

    <!-- Mouth (speaking) -->
    <ellipse cx="300" cy="215" rx="5" ry="3" fill="none" stroke-width="2"/>

    <!-- Body -->
    <rect x="280" y="230" width="40" height="65" stroke-width="4"/>

    <!-- Arms (gesturing) -->
    <line x1="280" y1="245" x2="255" y2="265" stroke-width="4"/>
    <line x1="320" y1="245" x2="345" y2="265" stroke-width="4"/>

    <!-- Hands -->
    <ellipse cx="255" cy="265" rx="6" ry="8" stroke-width="3"/>
    <ellipse cx="345" cy="265" rx="6" ry="8" stroke-width="3"/>
  </g>

  <!-- CHARACTER 3 - Right side (like reference checkered pattern) -->
  <g stroke="#000" fill="white">
    <!-- Head -->
    <ellipse cx="450" cy="200" rx="24" ry="30" stroke-width="4"/>

    <!-- Hair -->
    <path d="M 430 180 Q 450 170 470 180" stroke-width="3" fill="none"/>

    <!-- Eyes -->
    <circle cx="442" cy="195" r="2" fill="#000"/>
    <circle cx="458" cy="195" r="2" fill="#000"/>

    <!-- Nose -->
    <path d="M 450 200 L 448 205 L 452 205 Z" fill="#000"/>

    <!-- Mouth -->
    <path d="M 445 215 Q 450 218 455 215" stroke-width="2" fill="none"/>

    <!-- Checkered shirt body -->
    <rect x="430" y="230" width="40" height="65" stroke-width="4"/>

    <!-- Checkered pattern -->
    <line x1="440" y1="230" x2="440" y2="295" stroke-width="2"/>
    <line x1="450" y1="230" x2="450" y2="295" stroke-width="2"/>
    <line x1="460" y1="230" x2="460" y2="295" stroke-width="2"/>
    <line x1="430" y1="240" x2="470" y2="240" stroke-width="2"/>
    <line x1="430" y1="250" x2="470" y2="250" stroke-width="2"/>
    <line x1="430" y1="260" x2="470" y2="260" stroke-width="2"/>
    <line x1="430" y1="270" x2="470" y2="270" stroke-width="2"/>
    <line x1="430" y1="280" x2="470" y2="280" stroke-width="2"/>

    <!-- Arms -->
    <line x1="430" y1="245" x2="410" y2="265" stroke-width="4"/>
    <line x1="470" y1="245" x2="490" y2="265" stroke-width="4"/>

    <!-- Hands -->
    <ellipse cx="410" cy="265" rx="6" ry="8" stroke-width="3"/>
    <ellipse cx="490" cy="265" rx="6" ry="8" stroke-width="3"/>

    <!-- Pants and legs -->
    <rect x="442" y="295" width="16" height="50" stroke-width="3"/>
    <line x1="446" y1="345" x2="446" y2="370" stroke-width="3"/>
    <line x1="454" y1="345" x2="454" y2="370" stroke-width="3"/>

    <!-- Shoes -->
    <ellipse cx="446" cy="375" rx="8" ry="4" fill="#000"/>
    <ellipse cx="454" cy="375" rx="8" ry="4" fill="#000"/>
  </g>

  <!-- Caption area - QUOTE DISPLAY (bottom like reference) -->
  <rect x="20" y="400" width="560" height="80" fill="white" stroke="none"/>

  <!-- Caption text - Display the satirical quote -->
  ${displayCaption.map((line, index) =>
    `<text x="25" y="${425 + (index * 18)}" font-family="Times, serif" font-size="14" font-style="italic" fill="#000">${line}</text>`
  ).join('')}
</svg>`
}

function generateInfluencerScene(displayCaption: string[]): string {
  return `<svg width="600" height="500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500">
  <!-- Outer border - R.K. Laxman style -->
  <rect width="600" height="500" fill="white" stroke="#000" stroke-width="8"/>

  <!-- Inner panel -->
  <rect x="15" y="15" width="570" height="380" fill="white" stroke="#000" stroke-width="4"/>

  <!-- CAMPAIGN RALLY SETTING - Social media influencer scene -->

  <!-- Floor with perspective lines -->
  <g stroke="#000" stroke-width="2" fill="none">
    <line x1="25" y1="360" x2="575" y2="360"/>
    <line x1="30" y1="370" x2="570" y2="370"/>
    <line x1="35" y1="380" x2="565" y2="380"/>
  </g>

  <!-- Stage/podium platform -->
  <rect x="350" y="320" width="180" height="40" fill="white" stroke="#000" stroke-width="3"/>
  <!-- Podium -->
  <rect x="420" y="260" width="40" height="60" fill="white" stroke="#000" stroke-width="3"/>

  <!-- Campaign banner -->
  <rect x="100" y="80" width="400" height="30" fill="white" stroke="#000" stroke-width="3"/>
  <text x="300" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#000">DIGITAL GOVERNANCE 2024</text>

  <!-- Broken digital icons -->
  <g stroke="#000" stroke-width="3" fill="none">
    <path d="M 520 120 Q 530 110 540 120" />
    <line x1="528" y1="132" x2="532" y2="128"/>
    <line x1="532" y1="132" x2="528" y2="128"/>
  </g>

  <!-- SOCIAL MEDIA INFLUENCER on podium -->
  <g stroke="#000" fill="white">
    <ellipse cx="440" cy="200" rx="22" ry="25" stroke-width="4"/>
    <path d="M 420 185 Q 430 175 450 180" stroke-width="3" fill="none"/>
    <circle cx="432" cy="195" r="2" fill="#000"/>
    <circle cx="448" cy="195" r="2" fill="#000"/>
    <ellipse cx="440" cy="215" rx="6" ry="4" fill="none" stroke-width="3"/>
    <rect x="420" y="225" width="40" height="65" stroke-width="4"/>
    <!-- Phone in hand -->
    <rect x="485" y="225" width="10" height="15" stroke-width="3"/>
  </g>

  <!-- THE COMMON MAN (sweating with phone) -->
  <g stroke="#000" fill="white">
    <ellipse cx="120" cy="220" rx="28" ry="32" stroke-width="5"/>
    <!-- Sweat drops -->
    <circle cx="105" cy="210" r="2" fill="#000"/>
    <circle cx="135" cy="205" r="2" fill="#000"/>
    <!-- Spectacles -->
    <circle cx="110" cy="215" r="10" fill="none" stroke-width="4"/>
    <circle cx="130" cy="215" r="10" fill="none" stroke-width="4"/>
    <circle cx="110" cy="215" r="3" fill="#000"/>
    <circle cx="130" cy="215" r="3" fill="#000"/>
    <!-- Checkered shirt -->
    <rect x="95" y="252" width="50" height="70" stroke-width="5"/>
    <line x1="105" y1="252" x2="105" y2="322" stroke-width="2"/>
    <line x1="115" y1="252" x2="115" y2="322" stroke-width="2"/>
    <line x1="125" y1="252" x2="125" y2="322" stroke-width="2"/>
    <line x1="135" y1="252" x2="135" y2="322" stroke-width="2"/>
    <line x1="95" y1="262" x2="145" y2="262" stroke-width="2"/>
    <line x1="95" y1="272" x2="145" y2="272" stroke-width="2"/>
    <line x1="95" y1="282" x2="145" y2="282" stroke-width="2"/>
    <line x1="95" y1="292" x2="145" y2="292" stroke-width="2"/>
    <!-- Phone in hand -->
    <rect x="165" y="295" width="12" height="18" stroke-width="3"/>
  </g>

  <!-- Caption area - QUOTE DISPLAY -->
  <rect x="20" y="400" width="560" height="80" fill="white" stroke="none"/>

  <!-- Caption text - Display the satirical quote -->
  ${displayCaption.map((line, index) =>
    `<text x="25" y="${425 + (index * 18)}" font-family="Times, serif" font-size="14" font-style="italic" fill="#000">${line}</text>`
  ).join('')}
</svg>`
}

function generatePotholeScene(displayCaption: string[]): string {
  return `<svg width="600" height="500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500">
  <!-- Outer border - R.K. Laxman style -->
  <rect width="600" height="500" fill="white" stroke="#000" stroke-width="8"/>

  <!-- Inner panel -->
  <rect x="15" y="15" width="570" height="380" fill="white" stroke="#000" stroke-width="4"/>

  <!-- POTHOLE INFRASTRUCTURE SCENE - Minister stuck in pothole at ribbon-cutting -->

  <!-- Ground level with crosshatching -->
  <g stroke="#000" stroke-width="2" fill="none">
    <line x1="25" y1="300" x2="575" y2="300"/>
    <line x1="30" y1="310" x2="570" y2="310"/>
    <!-- Diagonal crosshatch lines for ground texture -->
    <line x1="20" y1="305" x2="100" y2="315"/>
    <line x1="40" y1="305" x2="120" y2="315"/>
    <line x1="60" y1="305" x2="140" y2="315"/>
    <line x1="480" y1="305" x2="560" y2="315"/>
    <line x1="500" y1="305" x2="580" y2="315"/>
  </g>

  <!-- GIANT POTHOLE in center (where minister is stuck) -->
  <g stroke="#000" stroke-width="4" fill="white">
    <!-- Pothole crater -->
    <ellipse cx="350" cy="340" rx="80" ry="50"/>
    <!-- Jagged edges to show broken road -->
    <path d="M 270 320 L 280 310 L 290 325 L 300 315 L 320 330 L 340 320 L 360 335 L 380 325 L 400 340 L 420 330 L 430 345 Z" fill="none" stroke-width="3"/>

    <!-- Pothole label sign -->
    <rect x="380" y="280" width="120" height="25" fill="white" stroke="#000" stroke-width="3"/>
    <text x="440" y="297" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#000">INAUGURAL SPEECH CRITIC</text>
    <!-- Sign post -->
    <line x1="440" y1="305" x2="440" y2="320" stroke="#000" stroke-width="3"/>
  </g>

  <!-- MINISTER IN SUIT - STUCK IN POTHOLE -->
  <g stroke="#000" fill="white">
    <!-- Minister's head (visible above pothole) -->
    <ellipse cx="350" cy="320" rx="20" ry="22" stroke-width="4"/>

    <!-- Hair (formal style) -->
    <path d="M 335 305 Q 350 295 365 305" stroke-width="3" fill="none"/>

    <!-- Panicked expression -->
    <circle cx="343" cy="315" r="2" fill="#000"/>
    <circle cx="357" cy="315" r="2" fill="#000"/>
    <!-- Worried mouth -->
    <path d="M 345 330 Q 350 335 355 330" stroke-width="3" fill="none"/>

    <!-- Formal suit collar/tie visible -->
    <rect x="340" y="340" width="20" height="15" stroke-width="3"/>
    <!-- Tie -->
    <rect x="347" y="340" width="6" height="12" stroke-width="2"/>

    <!-- Arms gesturing for help (only upper arms visible) -->
    <line x1="330" y1="345" x2="310" y2="330" stroke-width="4"/>
    <line x1="370" y1="345" x2="390" y2="330" stroke-width="4"/>
    <!-- Hands -->
    <ellipse cx="310" cy="330" rx="5" ry="7" stroke-width="3"/>
    <ellipse cx="390" cy="330" rx="5" ry="7" stroke-width="3"/>
  </g>

  <!-- COMMON MAN - watching with arms crossed -->
  <g stroke="#000" fill="white">
    <!-- Head -->
    <ellipse cx="150" cy="200" rx="25" ry="28" stroke-width="4"/>

    <!-- Hair -->
    <path d="M 130 185 Q 150 175 170 185" stroke-width="3" fill="none"/>

    <!-- Spectacles (signature Common Man feature) -->
    <circle cx="140" cy="195" r="10" fill="none" stroke-width="3"/>
    <circle cx="160" cy="195" r="10" fill="none" stroke-width="3"/>
    <line x1="150" y1="195" x2="155" y2="195" stroke-width="2"/>
    <!-- Eyes behind glasses -->
    <circle cx="140" cy="195" r="3" fill="#000"/>
    <circle cx="160" cy="195" r="3" fill="#000"/>

    <!-- Skeptical expression -->
    <path d="M 145 210 Q 150 215 155 210" stroke-width="2" fill="none"/>

    <!-- Checkered shirt body -->
    <rect x="125" y="228" width="50" height="65" stroke-width="4"/>

    <!-- Checkered pattern -->
    <line x1="135" y1="228" x2="135" y2="293" stroke-width="2"/>
    <line x1="145" y1="228" x2="145" y2="293" stroke-width="2"/>
    <line x1="155" y1="228" x2="155" y2="293" stroke-width="2"/>
    <line x1="165" y1="228" x2="165" y2="293" stroke-width="2"/>
    <line x1="125" y1="238" x2="175" y2="238" stroke-width="2"/>
    <line x1="125" y1="248" x2="175" y2="248" stroke-width="2"/>
    <line x1="125" y1="258" x2="175" y2="258" stroke-width="2"/>
    <line x1="125" y1="268" x2="175" y2="268" stroke-width="2"/>
    <line x1="125" y1="278" x2="175" y2="278" stroke-width="2"/>

    <!-- ARMS CROSSED (signature pose) -->
    <line x1="125" y1="245" x2="110" y2="265" stroke-width="4"/>
    <line x1="175" y1="245" x2="190" y2="265" stroke-width="4"/>
    <!-- Crossed arms effect -->
    <line x1="110" y1="265" x2="165" y2="250" stroke-width="4"/>
    <line x1="190" y1="265" x2="135" y2="250" stroke-width="4"/>

    <!-- Pants and legs -->
    <rect x="142" y="293" width="16" height="45" stroke-width="3"/>
    <line x1="146" y1="338" x2="146" y2="355" stroke-width="3"/>
    <line x1="154" y1="338" x2="154" y2="355" stroke-width="3"/>

    <!-- Shoes -->
    <ellipse cx="146" cy="360" rx="8" ry="4" fill="#000"/>
    <ellipse cx="154" cy="360" rx="8" ry="4" fill="#000"/>
  </g>

  <!-- RIBBON-CUTTING CEREMONY SETUP -->
  <!-- Ribbon stretched across (now broken/hanging) -->
  <g stroke="#000" stroke-width="3" fill="none">
    <line x1="250" y1="280" x2="320" y2="285"/>
    <line x1="380" y1="285" x2="450" y2="280"/>
    <!-- Ribbon posts -->
    <line x1="250" y1="280" x2="250" y2="300" stroke-width="4"/>
    <line x1="450" y1="280" x2="450" y2="300" stroke-width="4"/>
  </g>

  <!-- Scissors fallen on ground -->
  <g stroke="#000" stroke-width="3" fill="white">
    <path d="M 320 350 L 325 345 L 330 350 L 325 355 Z"/>
    <line x1="325" y1="345" x2="325" y2="355"/>
  </g>

  <!-- Background crowd watching -->
  <g stroke="#000" stroke-width="2" fill="white">
    <!-- Simple crowd silhouettes -->
    <circle cx="500" cy="220" r="15"/>
    <circle cx="520" cy="210" r="15"/>
    <circle cx="480" cy="225" r="15"/>
    <!-- Crowd bodies -->
    <rect x="490" y="235" width="20" height="30"/>
    <rect x="510" y="225" width="20" height="35"/>
    <rect x="470" y="240" width="20" height="25"/>
  </g>

  <!-- Caption area - QUOTE DISPLAY -->
  <rect x="20" y="400" width="560" height="80" fill="white" stroke="none"/>

  <!-- Caption text - Display the satirical quote -->
  ${displayCaption.map((line, index) =>
    `<text x="25" y="${425 + (index * 18)}" font-family="Times, serif" font-size="14" font-style="italic" fill="#000">${line}</text>`
  ).join('')}
</svg>`
}

function generateOppositionScene(displayCaption: string[]): string {
  return generateReferenceStyleScene(displayCaption)
}