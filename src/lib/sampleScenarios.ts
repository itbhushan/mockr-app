export interface ComicScenario {
  situation: string
  characters: string
  setting: string
  tone: 'satirical' | 'witty' | 'observational' | 'critical'
  style: 'laxman' | 'modern' | 'minimalist' | 'detailed'
  dialogue: string
}

export const sampleScenarios: ComicScenario[] = [
  {
    situation: "Politicians promising to reduce inflation while shopping for luxury items",
    characters: "Politician, Common citizen",
    setting: "Expensive store with price tags visible",
    tone: "satirical",
    style: "laxman",
    dialogue: "Don't worry about rising prices, we feel your pain!"
  },
  {
    situation: "Climate summit delegates arriving in private jets to discuss carbon emissions",
    characters: "World leaders, Environmental activist",
    setting: "Airport with private jets and climate summit banner",
    tone: "critical",
    style: "laxman",
    dialogue: "We must all make sacrifices to save the planet!"
  },
  {
    situation: "Social media influencer running for office promising digital governance",
    characters: "Influencer politician, Elderly voter",
    setting: "Campaign rally with smartphones everywhere",
    tone: "witty",
    style: "modern",
    dialogue: "Like and subscribe to democracy!"
  },
  {
    situation: "Healthcare minister visiting overcrowded hospital while promoting world-class facilities",
    characters: "Health minister, Doctors, Patients",
    setting: "Crowded hospital corridor",
    tone: "critical",
    style: "laxman",
    dialogue: "See? World-class healthcare for everyone!"
  },
  {
    situation: "Education minister's child studying abroad while promoting local education system",
    characters: "Education minister, Student, Parent",
    setting: "Government office with overseas university brochures",
    tone: "satirical",
    style: "laxman",
    dialogue: "Our local schools are absolutely the best!"
  },
  {
    situation: "Tech billionaire testifying about privacy while being surrounded by surveillance cameras",
    characters: "Tech CEO, Lawmakers, Security cameras",
    setting: "Congressional hearing room",
    tone: "observational",
    style: "modern",
    dialogue: "Privacy is our top priority, trust me."
  },
  {
    situation: "Politician caught in traffic jam while promoting metro development",
    characters: "Politician in car, Metro construction worker",
    setting: "Traffic jam with metro construction in background",
    tone: "witty",
    style: "laxman",
    dialogue: "The metro will solve all traffic problems!"
  },
  {
    situation: "Finance minister explaining economic growth while ATM shows 'No Cash Available'",
    characters: "Finance minister, Frustrated bank customer",
    setting: "Bank with broken ATM",
    tone: "satirical",
    style: "laxman",
    dialogue: "Our economy is growing at record pace!"
  },
  {
    situation: "Celebrity endorsing political candidate after receiving large payment",
    characters: "Celebrity, Political candidate, Accountant with money bags",
    setting: "Press conference with contracts visible",
    tone: "critical",
    style: "modern",
    dialogue: "I genuinely believe in this candidate's vision!"
  },
  {
    situation: "Opposition leader agreeing with government's failed policy during election season",
    characters: "Opposition leader, Confused voter, Government minister",
    setting: "Election rally podium",
    tone: "observational",
    style: "laxman",
    dialogue: "We would do exactly the same thing, but better!"
  },
  {
    situation: "Urban planner promoting green spaces while cutting down trees for parking",
    characters: "Urban planner, Environmental activist, Construction worker",
    setting: "Construction site with felled trees",
    tone: "critical",
    style: "laxman",
    dialogue: "More parking means more green transportation!"
  },
  {
    situation: "Sports minister inaugurating stadium while local playground remains broken",
    characters: "Sports minister, Children, Stadium contractor",
    setting: "Broken playground with grand stadium in background",
    tone: "satirical",
    style: "laxman",
    dialogue: "Sports infrastructure for world-class athletes!"
  }
]

export function getRandomScenario(): ComicScenario {
  const randomIndex = Math.floor(Math.random() * sampleScenarios.length)
  return sampleScenarios[randomIndex]
}

export function getScenariosbyTone(tone: ComicScenario['tone']): ComicScenario[] {
  return sampleScenarios.filter(scenario => scenario.tone === tone)
}

export function getScenariosByStyle(style: ComicScenario['style']): ComicScenario[] {
  return sampleScenarios.filter(scenario => scenario.style === style)
}