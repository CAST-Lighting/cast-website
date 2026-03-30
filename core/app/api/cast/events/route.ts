import { NextResponse } from "next/server"

interface AirtableRecord {
  id: string
  fields: {
    Title?: string
    Date?: string
    Location?: string
    Description?: string
    Image?: { url: string }[]
    Link?: string
    Status?: string
  }
}

interface AirtableResponse {
  records: AirtableRecord[]
  offset?: string
}

export const revalidate = 300

export async function GET() {
  const token = process.env.CAST_AIRTABLE_TOKEN
  const base = process.env.CAST_AIRTABLE_BASE ?? "appXeJOTKw9qOHeuR"
  const table = process.env.CAST_EVENTS_TABLE ?? "Events"

  if (!token) {
    return NextResponse.json({ events: [] })
  }

  try {
    const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD

    // Build Airtable filter: Status = "Published" AND Date >= today
    const filterFormula = encodeURIComponent(
      `AND({Status}="Published",IS_AFTER({Date},"${today}"))`
    )
    const sortField = encodeURIComponent("Date")
    const sortDir = "asc"

    const url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?filterByFormula=${filterFormula}&sort[0][field]=${sortField}&sort[0][direction]=${sortDir}`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      console.error(`Airtable events fetch failed: HTTP ${res.status}`)
      return NextResponse.json({ events: [] }, { status: 200 })
    }

    const data = (await res.json()) as AirtableResponse

    const events = (data.records ?? []).map((record) => ({
      id: record.id,
      title: record.fields.Title ?? "",
      date: record.fields.Date ?? "",
      location: record.fields.Location ?? "",
      description: record.fields.Description ?? "",
      image: record.fields.Image?.[0]?.url ?? null,
      link: record.fields.Link ?? null,
      status: record.fields.Status ?? "",
    }))

    return NextResponse.json({ events })
  } catch (err) {
    console.error("Events API error:", err)
    return NextResponse.json({ events: [] }, { status: 200 })
  }
}
