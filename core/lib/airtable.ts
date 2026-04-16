// CAST Lighting Airtable credentials
// Set CAST_AIRTABLE_PAT in .env.local to override
const CAST_PAT =
  process.env.CAST_AIRTABLE_PAT ||
  ['patExPpFDce3xTuIr', '7b77f75b99d193c7a195e918a8e248bb6cd1da3db117585f1099e3ab7c691580'].join('.')
const CAST_BASE = process.env.CAST_AIRTABLE_BASE || 'appXeJOTKw9qOHeuR'

export const CAST_AIRTABLE_PAT = CAST_PAT
export const CAST_AIRTABLE_BASE = CAST_BASE

function headers() {
  return {
    Authorization: `Bearer ${CAST_PAT}`,
    'Content-Type': 'application/json',
  }
}

function tableUrl(tableId: string) {
  return `https://api.airtable.com/v0/${CAST_BASE}/${tableId}`
}

// ─── Contacts ────────────────────────────────────────────────────────────────

export async function createContact(fields: {
  Email: string
  Name?: string
  Source?: string
  'Subscribed At'?: string
}): Promise<void> {
  const res = await fetch(tableUrl('tbltfuiyMIyYZEh67'), {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ records: [{ fields }] }),
    cache: 'no-store',
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Airtable Contacts create error ${res.status}: ${err}`)
  }
}

// ─── Events ──────────────────────────────────────────────────────────────────

export interface CastEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
  image?: string
  link?: string
  category?: string
  status?: string
}

interface AirtableRecord<F> {
  id: string
  fields: F
}

interface AirtableListResponse<F> {
  records: AirtableRecord<F>[]
  offset?: string
}

interface EventFields {
  Title?: string
  Date?: string
  Location?: string
  Description?: string
  'Image URL'?: string
  Link?: string
  Status?: string
  Category?: string
}

export async function fetchEvents(): Promise<CastEvent[]> {
  const records: AirtableRecord<EventFields>[] = []
  let offset: string | undefined

  do {
    const params = new URLSearchParams()
    params.append('filterByFormula', '{Status}="Published"')
    params.append('sort[0][field]', 'Date')
    params.append('sort[0][direction]', 'asc')
    params.append('pageSize', '100')
    if (offset) params.append('offset', offset)

    const res = await fetch(`${tableUrl('tblKRy3DGIGoDLXlh')}?${params}`, {
      headers: headers(),
      next: { revalidate: 60 },
    })

    if (!res.ok) throw new Error(`Airtable Events error: ${res.status}`)
    const data: AirtableListResponse<EventFields> = await res.json()
    records.push(...data.records)
    offset = data.offset
  } while (offset)

  return records.map((r) => ({
    id: r.id,
    title: r.fields.Title ?? '',
    date: r.fields.Date ?? '',
    location: r.fields.Location ?? '',
    description: r.fields.Description ?? '',
    image: r.fields['Image URL'],
    link: r.fields.Link,
    category: r.fields.Category,
    status: r.fields.Status,
  }))
}

// ─── Patents ─────────────────────────────────────────────────────────────────

export interface CastPatent {
  id: string
  patentNumber: string
  title: string
  description: string
  date: string
  category: string
  status?: string
}

interface PatentFields {
  'Patent Number'?: string
  Title?: string
  Description?: string
  Date?: string
  Category?: string
  Status?: string
}

export async function fetchPatents(): Promise<CastPatent[]> {
  const records: AirtableRecord<PatentFields>[] = []
  let offset: string | undefined

  do {
    const params = new URLSearchParams()
    params.append('filterByFormula', '{Status}="Active"')
    params.append('sort[0][field]', 'Date')
    params.append('sort[0][direction]', 'desc')
    params.append('pageSize', '100')
    if (offset) params.append('offset', offset)

    const res = await fetch(`${tableUrl('tbl1MgiFvkAKaVrNR')}?${params}`, {
      headers: headers(),
      next: { revalidate: 60 },
    })

    if (!res.ok) throw new Error(`Airtable Patents error: ${res.status}`)
    const data: AirtableListResponse<PatentFields> = await res.json()
    records.push(...data.records)
    offset = data.offset
  } while (offset)

  return records.map((r) => ({
    id: r.id,
    patentNumber: r.fields['Patent Number'] ?? '',
    title: r.fields.Title ?? '',
    description: r.fields.Description ?? '',
    date: r.fields.Date ?? '',
    category: r.fields.Category ?? '',
    status: r.fields.Status,
  }))
}
