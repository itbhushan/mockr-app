import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface WaitlistEntry {
  email: string
  name?: string
  timestamp: string
  position: number
}

const WAITLIST_FILE = path.join(process.cwd(), 'waitlist-data.json')

// Initialize waitlist file if it doesn't exist
function initializeWaitlistFile() {
  if (!fs.existsSync(WAITLIST_FILE)) {
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify([]))
  }
}

// Get all waitlist entries
function getWaitlist(): WaitlistEntry[] {
  initializeWaitlistFile()
  const data = fs.readFileSync(WAITLIST_FILE, 'utf-8')
  return JSON.parse(data)
}

// Save waitlist
function saveWaitlist(waitlist: WaitlistEntry[]) {
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlist, null, 2))
}

// POST: Add to waitlist
export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const waitlist = getWaitlist()

    // Check if email already exists
    const existingEntry = waitlist.find(entry => entry.email.toLowerCase() === email.toLowerCase())
    if (existingEntry) {
      return NextResponse.json({
        success: true,
        position: existingEntry.position,
        message: `You're already on the waitlist at position #${existingEntry.position}!`
      })
    }

    // Add new entry
    const newEntry: WaitlistEntry = {
      email: email.toLowerCase(),
      name,
      timestamp: new Date().toISOString(),
      position: waitlist.length + 1
    }

    waitlist.push(newEntry)
    saveWaitlist(waitlist)

    console.log(`[Waitlist] New entry: ${email} at position #${newEntry.position}`)

    return NextResponse.json({
      success: true,
      position: newEntry.position,
      message: `You're #${newEntry.position} on the waitlist! We'll notify you when spots open up.`
    })
  } catch (error) {
    console.error('[Waitlist] Error adding entry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to join waitlist' },
      { status: 500 }
    )
  }
}

// GET: Get waitlist stats (for admin)
export async function GET() {
  try {
    const waitlist = getWaitlist()

    return NextResponse.json({
      success: true,
      totalWaitlisted: waitlist.length,
      latestEntries: waitlist.slice(-5).reverse() // Last 5 entries
    })
  } catch (error) {
    console.error('[Waitlist] Error fetching waitlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch waitlist' },
      { status: 500 }
    )
  }
}
