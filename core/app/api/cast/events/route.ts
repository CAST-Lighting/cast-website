import { NextResponse } from 'next/server'
import { fetchEvents } from '~/lib/airtable'

export const revalidate = 60

export async function GET() {
  try {
    const events = await fetchEvents()
    return NextResponse.json({ events })
  } catch (err) {
    console.error('[api/cast/events]', err)
    return NextResponse.json({ events: [] }, { status: 200 })
  }
}
