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

  // Split dialogue into lines for speech bubble (max 15 characters per line)
  const words = dialogue.replace(/"/g, '').split(' ')
  const lines = []
  let currentLine = ''

  for (const word of words) {
    if ((currentLine + word).length <= 15) {
      currentLine += (currentLine ? ' ' : '') + word
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)

  // Limit to 2 lines max for speech bubble
  const speechLines = lines.slice(0, 2)

  // Split situation into lines for bottom context (max 45 characters per line)
  const situationWords = situation.split(' ')
  const situationLines = []
  let currentSituationLine = ''

  for (const word of situationWords) {
    if ((currentSituationLine + word).length <= 45) {
      currentSituationLine += (currentSituationLine ? ' ' : '') + word
    } else {
      if (currentSituationLine) situationLines.push(currentSituationLine)
      currentSituationLine = word
    }
  }
  if (currentSituationLine) situationLines.push(currentSituationLine)

  // Limit to 2 lines max for situation
  const displaySituation = situationLines.slice(0, 2)


  const svgContent = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 350">
  <!-- Background -->
  <rect width="400" height="350" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>

  <!-- Comic panel border -->
  <rect x="20" y="20" width="360" height="280" fill="white" stroke="#1e293b" stroke-width="3"/>

  <!-- Title -->
  <text x="200" y="45" text-anchor="middle" font-family="serif" font-size="14" font-weight="bold" fill="#1e293b">
    MOCKR POLITICAL CARTOON
  </text>

  <!-- Character: Head (larger and more visible) -->
  <circle cx="120" cy="135" r="35" fill="#fef2f2" stroke="#1e293b" stroke-width="3"/>

  <!-- Character: Eyes -->
  <circle cx="110" cy="125" r="3" fill="#1e293b"/>
  <circle cx="130" cy="125" r="3" fill="#1e293b"/>

  <!-- Character: Nose -->
  <ellipse cx="120" cy="135" rx="2" ry="4" fill="#1e293b"/>

  <!-- Character: Mouth/Expression -->
  <path d="M 105 145 Q 120 155 135 145" stroke="#1e293b" stroke-width="3" fill="none"/>

  <!-- Character: Body (rectangular torso) -->
  <rect x="95" y="170" width="50" height="70" fill="#e5e7eb" stroke="#1e293b" stroke-width="3"/>

  <!-- Character: Tie -->
  <polygon points="115,170 125,170 125,200 120,205 115,200" fill="#dc2626" stroke="#1e293b" stroke-width="2"/>

  <!-- Character: Arms -->
  <line x1="95" y1="190" x2="75" y2="210" stroke="#1e293b" stroke-width="4"/>
  <line x1="145" y1="190" x2="165" y2="210" stroke="#1e293b" stroke-width="4"/>

  <!-- Character: Hands -->
  <circle cx="75" cy="210" r="6" fill="#fef2f2" stroke="#1e293b" stroke-width="2"/>
  <circle cx="165" cy="210" r="6" fill="#fef2f2" stroke="#1e293b" stroke-width="2"/>

  <!-- Character: Legs -->
  <line x1="105" y1="240" x2="105" y2="270" stroke="#1e293b" stroke-width="4"/>
  <line x1="135" y1="240" x2="135" y2="270" stroke="#1e293b" stroke-width="4"/>

  <!-- Character: Feet -->
  <ellipse cx="105" cy="275" rx="8" ry="5" fill="#1e293b"/>
  <ellipse cx="135" cy="275" rx="8" ry="5" fill="#1e293b"/>

  <!-- Speech bubble background -->
  <ellipse cx="270" cy="110" rx="80" ry="35" fill="white" stroke="#1e293b" stroke-width="2"/>

  <!-- Speech bubble pointer -->
  <polygon points="190,130 165,150 195,140" fill="white" stroke="#1e293b" stroke-width="2"/>

  <!-- Speech text -->
  ${speechLines.length === 1 ?
    `<text x="270" y="115" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e293b">"${speechLines[0]}"</text>` :
    speechLines.map((line, index) =>
      `<text x="270" y="${105 + (index * 14)}" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1e293b">"${line}"</text>`
    ).join('')
  }

  <!-- Background elements -->
  <rect x="300" y="200" width="60" height="40" fill="#f3f4f6" stroke="#9ca3af" stroke-width="1"/>
  <text x="330" y="220" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#6b7280">PODIUM</text>

  <!-- Ground line -->
  <line x1="40" y1="280" x2="360" y2="280" stroke="#1e293b" stroke-width="2"/>

  <!-- Context box -->
  <rect x="30" y="290" width="340" height="40" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2" rx="5"/>
  <text x="35" y="307" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1e293b">
    CONTEXT:
  </text>
  ${displaySituation.map((line, index) =>
    `<text x="35" y="${320 + (index * 12)}" font-family="sans-serif" font-size="10" fill="#374151">${line}</text>`
  ).join('')}

  <!-- Watermark -->
  <defs>
    <linearGradient id="watermarkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="365" y="340" text-anchor="end" font-family="sans-serif" font-size="8" font-weight="bold" fill="url(#watermarkGradient)">
    Created by Mockr
  </text>
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