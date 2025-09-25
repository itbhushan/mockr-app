import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Get dialogue and situation from query parameters
  const { searchParams } = new URL(request.url)
  const dialogue = searchParams.get('dialogue') || '"Everything is under control!"'
  const situation = searchParams.get('situation') || 'Political scenario'

  // Debug: Log the API call
  console.log(`[${new Date().toISOString()}] Placeholder Comic API called:`, {
    dialogue: dialogue.substring(0, 50) + (dialogue.length > 50 ? '...' : ''),
    situation: situation.substring(0, 50) + (situation.length > 50 ? '...' : ''),
    timestamp: searchParams.get('t')
  })

  // Process the satirical quote for display (no speech bubble needed for R.K. Laxman style)
  const cleanDialogue = dialogue.replace(/"/g, '')

  // Split both satirical quote and situation for bottom caption area (max 80 characters per line)
  const captionText = `${cleanDialogue} - ${situation}`
  const captionWords = captionText.split(' ')
  const captionLines = []
  let currentCaptionLine = ''

  for (const word of captionWords) {
    if ((currentCaptionLine + word).length <= 80) {
      currentCaptionLine += (currentCaptionLine ? ' ' : '') + word
    } else {
      if (currentCaptionLine) captionLines.push(currentCaptionLine)
      currentCaptionLine = word
    }
  }
  if (currentCaptionLine) captionLines.push(currentCaptionLine)

  // Limit to 3 lines max for R.K. Laxman style caption
  const displayCaption = captionLines.slice(0, 3)


  const svgContent = `<svg width="600" height="500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500">
  <!-- Outer border - thick black frame like R.K. Laxman -->
  <rect width="600" height="500" fill="white" stroke="#000" stroke-width="6"/>

  <!-- Inner comic panel -->
  <rect x="10" y="10" width="580" height="430" fill="white" stroke="#000" stroke-width="3"/>

  <!-- R.K. LAXMAN STYLE INTERIOR SETTING -->
  <!-- Floor with crosshatching -->
  <line x1="20" y1="380" x2="580" y2="380" stroke="#000" stroke-width="3"/>
  <!-- Crosshatch pattern for floor -->
  <g stroke="#000" stroke-width="1">
    <line x1="30" y1="390" x2="570" y2="390"/>
    <line x1="25" y1="400" x2="575" y2="400"/>
    <line x1="30" y1="410" x2="570" y2="410"/>
    <line x1="25" y1="420" x2="575" y2="420"/>
  </g>

  <!-- Office interior elements -->
  <!-- Back wall with vertical lines -->
  <line x1="50" y1="50" x2="50" y2="300" stroke="#000" stroke-width="3"/>
  <line x1="550" y1="50" x2="550" y2="300" stroke="#000" stroke-width="3"/>
  <!-- Ceiling line -->
  <line x1="50" y1="50" x2="550" y2="50" stroke="#000" stroke-width="3"/>

  <!-- Government office furniture -->
  <!-- Desk in center -->
  <rect x="200" y="300" width="120" height="25" fill="white" stroke="#000" stroke-width="3"/>
  <!-- Desk legs -->
  <line x1="210" y1="325" x2="210" y2="370" stroke="#000" stroke-width="3"/>
  <line x1="310" y1="325" x2="310" y2="370" stroke="#000" stroke-width="3"/>

  <!-- Chair behind desk -->
  <rect x="240" y="270" width="40" height="50" fill="white" stroke="#000" stroke-width="3"/>
  <!-- Chair back -->
  <rect x="240" y="250" width="40" height="30" fill="white" stroke="#000" stroke-width="3"/>

  <!-- File cabinet -->
  <rect x="450" y="280" width="40" height="100" fill="white" stroke="#000" stroke-width="3"/>
  <!-- Cabinet drawers -->
  <line x1="450" y1="305" x2="490" y2="305" stroke="#000" stroke-width="2"/>
  <line x1="450" y1="330" x2="490" y2="330" stroke="#000" stroke-width="2"/>
  <line x1="450" y1="355" x2="490" y2="355" stroke="#000" stroke-width="2"/>

  <!-- Window on back wall -->
  <rect x="350" y="80" width="80" height="60" fill="white" stroke="#000" stroke-width="3"/>
  <!-- Window panes -->
  <line x1="390" y1="80" x2="390" y2="140" stroke="#000" stroke-width="2"/>
  <line x1="350" y1="110" x2="430" y2="110" stroke="#000" stroke-width="2"/>

  <!-- POLITICIAN CHARACTER (Behind desk - authority position) -->
  <!-- Head -->
  <ellipse cx="260" cy="200" rx="25" ry="30" fill="white" stroke="#000" stroke-width="4"/>

  <!-- Hair (slicked back politician style) -->
  <path d="M 240 180 Q 260 170 280 180" stroke="#000" stroke-width="3" fill="none"/>
  <path d="M 245 185 Q 255 175 265 185" stroke="#000" stroke-width="2" fill="none"/>
  <path d="M 255 185 Q 265 175 275 185" stroke="#000" stroke-width="2" fill="none"/>

  <!-- Eyes (confident, slightly arrogant) -->
  <ellipse cx="250" cy="195" rx="3" ry="2" fill="#000"/>
  <ellipse cx="270" cy="195" rx="3" ry="2" fill="#000"/>

  <!-- Eyebrows (authoritative) -->
  <path d="M 245 185 L 255 188" stroke="#000" stroke-width="3"/>
  <path d="M 265 188 L 275 185" stroke="#000" stroke-width="3"/>

  <!-- Nose (prominent politician nose) -->
  <path d="M 260 200 L 255 210 L 265 210 Z" fill="#000"/>

  <!-- Mouth (smug smile) -->
  <path d="M 250 220 Q 260 225 270 220" stroke="#000" stroke-width="3" fill="none"/>

  <!-- Body (formal suit) -->
  <rect x="235" y="230" width="50" height="70" fill="white" stroke="#000" stroke-width="4"/>

  <!-- Suit details -->
  <!-- Tie -->
  <rect x="255" y="230" width="10" height="40" fill="#000"/>
  <!-- Suit lapels -->
  <path d="M 235 245 L 250 240 L 250 260" stroke="#000" stroke-width="3" fill="none"/>
  <path d="M 285 245 L 270 240 L 270 260" stroke="#000" stroke-width="3" fill="none"/>

  <!-- Arms gesturing -->
  <line x1="235" y1="250" x2="200" y2="270" stroke="#000" stroke-width="5"/>
  <line x1="285" y1="250" x2="320" y2="270" stroke="#000" stroke-width="5"/>

  <!-- Hands -->
  <ellipse cx="200" cy="270" rx="8" ry="6" fill="white" stroke="#000" stroke-width="3"/>
  <ellipse cx="320" cy="270" rx="8" ry="6" fill="white" stroke="#000" stroke-width="3"/>

  <!-- THE COMMON MAN (R.K. Laxman's ICONIC character - positioned prominently) -->
  <!-- Head (characteristic egg shape) -->
  <ellipse cx="400" cy="180" rx="28" ry="32" fill="white" stroke="#000" stroke-width="5"/>

  <!-- ICONIC balding pattern -->
  <path d="M 380 160 Q 385 145 390 155" stroke="#000" stroke-width="4" fill="none"/>
  <path d="M 410 155 Q 415 145 420 160" stroke="#000" stroke-width="4" fill="none"/>
  <!-- Few remaining hair strands -->
  <path d="M 388 158 Q 392 150 396 158" stroke="#000" stroke-width="2" fill="none"/>
  <path d="M 404 158 Q 408 150 412 158" stroke="#000" stroke-width="2" fill="none"/>

  <!-- ICONIC round spectacles -->
  <circle cx="390" cy="175" r="10" fill="none" stroke="#000" stroke-width="4"/>
  <circle cx="410" cy="175" r="10" fill="none" stroke="#000" stroke-width="4"/>
  <!-- Spectacle bridge -->
  <line x1="400" y1="175" x2="400" y2="175" stroke="#000" stroke-width="4"/>
  <!-- Spectacle arms -->
  <line x1="380" y1="175" x2="370" y2="175" stroke="#000" stroke-width="4"/>
  <line x1="420" y1="175" x2="430" y2="175" stroke="#000" stroke-width="4"/>

  <!-- Eyes behind glasses (bewildered expression) -->
  <circle cx="390" cy="175" r="2" fill="#000"/>
  <circle cx="410" cy="175" r="2" fill="#000"/>

  <!-- ICONIC mustache -->
  <path d="M 385 190 Q 400 195 415 190" stroke="#000" stroke-width="4" fill="none"/>

  <!-- Nose (simple) -->
  <path d="M 400 185 L 398 190 L 402 190 Z" fill="#000"/>

  <!-- Mouth (concerned/bewildered) -->
  <ellipse cx="400" cy="200" rx="5" ry="3" fill="none" stroke="#000" stroke-width="3"/>

  <!-- Worry lines -->
  <path d="M 385 165 Q 390 160 395 165" stroke="#000" stroke-width="2" fill="none"/>
  <path d="M 405 165 Q 410 160 415 165" stroke="#000" stroke-width="2" fill="none"/>

  <!-- ICONIC CHECKERED SHIRT -->
  <rect x="375" y="212" width="50" height="70" fill="white" stroke="#000" stroke-width="5"/>

  <!-- Detailed checkered pattern -->
  <!-- Vertical lines -->
  <line x1="385" y1="212" x2="385" y2="282" stroke="#000" stroke-width="2"/>
  <line x1="395" y1="212" x2="395" y2="282" stroke="#000" stroke-width="2"/>
  <line x1="405" y1="212" x2="405" y2="282" stroke="#000" stroke-width="2"/>
  <line x1="415" y1="212" x2="415" y2="282" stroke="#000" stroke-width="2"/>
  <!-- Horizontal lines -->
  <line x1="375" y1="222" x2="425" y2="222" stroke="#000" stroke-width="2"/>
  <line x1="375" y1="232" x2="425" y2="232" stroke="#000" stroke-width="2"/>
  <line x1="375" y1="242" x2="425" y2="242" stroke="#000" stroke-width="2"/>
  <line x1="375" y1="252" x2="425" y2="252" stroke="#000" stroke-width="2"/>
  <line x1="375" y1="262" x2="425" y2="262" stroke="#000" stroke-width="2"/>
  <line x1="375" y1="272" x2="425" y2="272" stroke="#000" stroke-width="2"/>

  <!-- Arms (hanging naturally, showing resignation) -->
  <line x1="375" y1="235" x2="350" y2="260" stroke="#000" stroke-width="5"/>
  <line x1="425" y1="235" x2="450" y2="260" stroke="#000" stroke-width="5"/>

  <!-- Hands -->
  <ellipse cx="350" cy="260" rx="6" ry="8" fill="white" stroke="#000" stroke-width="3"/>
  <ellipse cx="450" cy="260" rx="6" ry="8" fill="white" stroke="#000" stroke-width="3"/>

  <!-- Simple pants -->
  <rect x="390" y="282" width="20" height="50" fill="white" stroke="#000" stroke-width="3"/>

  <!-- Legs -->
  <line x1="395" y1="332" x2="395" y2="370" stroke="#000" stroke-width="4"/>
  <line x1="405" y1="332" x2="405" y2="370" stroke="#000" stroke-width="4"/>

  <!-- Simple shoes -->
  <ellipse cx="395" cy="375" rx="12" ry="5" fill="#000"/>
  <ellipse cx="405" cy="375" rx="12" ry="5" fill="#000"/>

  <!-- THIRD CHARACTER - Another official/bureaucrat -->
  <!-- Head -->
  <ellipse cx="120" cy="220" rx="22" ry="25" fill="white" stroke="#000" stroke-width="4"/>

  <!-- Hair -->
  <path d="M 105 205 Q 120 195 135 205" stroke="#000" stroke-width="3" fill="none"/>

  <!-- Eyes -->
  <ellipse cx="112" cy="215" rx="2" ry="1" fill="#000"/>
  <ellipse cx="128" cy="215" rx="2" ry="1" fill="#000"/>

  <!-- Nose -->
  <path d="M 120 220 L 118 225 L 122 225 Z" fill="#000"/>

  <!-- Mouth -->
  <path d="M 115 235 Q 120 238 125 235" stroke="#000" stroke-width="2" fill="none"/>

  <!-- Body -->
  <rect x="100" y="245" width="40" height="60" fill="white" stroke="#000" stroke-width="3"/>

  <!-- Arms -->
  <line x1="100" y1="260" x2="80" y2="280" stroke="#000" stroke-width="4"/>
  <line x1="140" y1="260" x2="160" y2="280" stroke="#000" stroke-width="4"/>

  <!-- Hands -->
  <ellipse cx="80" cy="280" rx="5" ry="6" fill="white" stroke="#000" stroke-width="3"/>
  <ellipse cx="160" cy="280" rx="5" ry="6" fill="white" stroke="#000" stroke-width="3"/>

  <!-- R.K. LAXMAN STYLE CAPTION (Bottom of panel - combines satirical quote + situation) -->
  <!-- Caption area background -->
  <rect x="20" y="445" width="560" height="45" fill="white" stroke="none"/>

  <!-- Caption text - EXACT R.K. Laxman style - satirical quote followed by situation -->
  ${displayCaption.map((line, index) =>
    `<text x="300" y="${465 + (index * 15)}" text-anchor="middle" font-family="Times, serif" font-size="14" font-weight="normal" fill="#000">${line}</text>`
  ).join('')}
</svg>`

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