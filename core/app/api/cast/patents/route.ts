import { NextResponse } from 'next/server'
import { fetchPatents } from '~/lib/airtable'

export const revalidate = 60

export async function GET() {
  try {
    const patents = await fetchPatents()
    return NextResponse.json({ patents })
  } catch (err) {
    console.error('[api/cast/patents]', err)
    return NextResponse.json({ patents: [] }, { status: 200 })
  }
}
