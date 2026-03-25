const BASE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}`;

function airtableHeaders() {
  return {
    Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

export interface AirtableBlogRecord {
  id: string;
  fields: {
    Title?: string;
    Slug?: string;
    Status?: string;
    Body?: string;
    Category?: string;
    Tags?: string;
    'Featured Image URL'?: string;
    'Audio URL'?: string;
    'SEO Title'?: string;
    'Meta Description'?: string;
    'OG Image URL'?: string;
    Author?: string;
    'Read Time'?: number;
    'Published Date'?: string;
  };
}

interface AirtableListResponse {
  records: AirtableBlogRecord[];
  offset?: string;
}

export async function fetchAllBlogPosts(opts?: {
  statusFilter?: string;
  noCache?: boolean;
}): Promise<AirtableBlogRecord[]> {
  const records: AirtableBlogRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();
    params.append('pageSize', '100');
    params.append('sort[0][field]', 'Published Date');
    params.append('sort[0][direction]', 'desc');
    if (opts?.statusFilter) {
      params.append('filterByFormula', `{Status}="${opts.statusFilter}"`);
    }
    if (offset) params.append('offset', offset);

    const res = await fetch(`${BASE_URL}?${params}`, {
      headers: airtableHeaders(),
      ...(opts?.noCache
        ? { cache: 'no-store' }
        : { next: { revalidate: 60 } }),
    });

    if (!res.ok) throw new Error(`Airtable list error: ${res.status}`);
    const data: AirtableListResponse = await res.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records;
}

export async function fetchBlogPostBySlug(
  slug: string,
): Promise<AirtableBlogRecord | null> {
  const params = new URLSearchParams({
    filterByFormula: `{Slug}="${slug}"`,
    maxRecords: '1',
  });

  const res = await fetch(`${BASE_URL}?${params}`, {
    headers: airtableHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  const data: AirtableListResponse = await res.json();
  return data.records[0] ?? null;
}

export async function fetchBlogPostById(
  id: string,
): Promise<AirtableBlogRecord | null> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: airtableHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function createBlogPost(
  fields: AirtableBlogRecord['fields'],
): Promise<AirtableBlogRecord> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: airtableHeaders(),
    body: JSON.stringify({ records: [{ fields }] }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable create error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.records[0] as AirtableBlogRecord;
}

export async function updateBlogPost(
  id: string,
  fields: Partial<AirtableBlogRecord['fields']>,
): Promise<AirtableBlogRecord> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: airtableHeaders(),
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable update error ${res.status}: ${err}`);
  }
  return res.json();
}

export async function deleteBlogPost(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: airtableHeaders(),
  });
  if (!res.ok) throw new Error(`Airtable delete error: ${res.status}`);
}
