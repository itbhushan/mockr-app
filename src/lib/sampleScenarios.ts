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
  },
  {
    situation: "Anti-corruption leader caught accepting briefcase full of money",
    characters: "Anti-corruption activist, Businessman with briefcase, Common man",
    setting: "Government office with transparency slogans on wall",
    tone: "critical",
    style: "laxman",
    dialogue: "This is for the greater good of society!"
  },
  {
    situation: "Tax minister explaining tax benefits while hiding money in offshore accounts",
    characters: "Tax minister, Accountant, Taxpayer",
    setting: "Tax office with paradise papers visible",
    tone: "satirical",
    style: "laxman",
    dialogue: "Everyone must pay their fair share!"
  },
  {
    situation: "Defense minister promoting peace while selling weapons to both sides",
    characters: "Defense minister, Arms dealer, Peace activist",
    setting: "Arms exhibition with peace dove logo",
    tone: "critical",
    style: "laxman",
    dialogue: "We believe in peace through strength!"
  },
  {
    situation: "Internet freedom advocate proposing internet censorship laws",
    characters: "Digital rights lawyer, Censorship board, Tech user",
    setting: "Parliament with internet freedom posters",
    tone: "observational",
    style: "modern",
    dialogue: "We need to protect freedom by limiting it!"
  },
  {
    situation: "Housing minister living in mansion while promoting affordable housing",
    characters: "Housing minister, Homeless family, Real estate agent",
    setting: "Luxury mansion with affordable housing billboard",
    tone: "satirical",
    style: "laxman",
    dialogue: "Housing for all is our top priority!"
  },
  {
    situation: "Employment minister at job fair where all booths show 'No Vacancies'",
    characters: "Employment minister, Job seekers, HR recruiters",
    setting: "Job fair with empty booths and 'No Vacancy' signs",
    tone: "witty",
    style: "laxman",
    dialogue: "Unlimited opportunities for everyone!"
  },
  {
    situation: "Transport minister stuck in pothole while inaugurating road development project",
    characters: "Transport minister, Road contractor, Frustrated driver",
    setting: "Road with vehicle stuck in large pothole",
    tone: "witty",
    style: "laxman",
    dialogue: "World-class infrastructure is our commitment!"
  },
  {
    situation: "Food minister at feast while farmers protest outside for fair prices",
    characters: "Food minister, Protesting farmers, Restaurant owner",
    setting: "5-star restaurant with farmer protests visible outside",
    tone: "critical",
    style: "laxman",
    dialogue: "We fully support our hardworking farmers!"
  },
  {
    situation: "Transparency advocate meeting in secret with corporate lobbyists",
    characters: "Transparency advocate, Corporate lobbyist, Journalist",
    setting: "Dark alley meeting with transparency office in background",
    tone: "satirical",
    style: "laxman",
    dialogue: "Complete transparency in all our dealings!"
  },
  {
    situation: "Energy minister promoting renewable energy while signing coal deals",
    characters: "Energy minister, Coal company executive, Environmental scientist",
    setting: "Solar panel exhibition with coal contracts on desk",
    tone: "critical",
    style: "laxman",
    dialogue: "Clean energy is the future!"
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