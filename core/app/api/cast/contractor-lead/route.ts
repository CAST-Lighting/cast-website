import { CAST_AIRTABLE_PAT, CAST_AIRTABLE_BASE } from '~/lib/airtable';

const TABLE_ID = 'tblGgbYFB6BFQ9FZf'; // Contractor Leads table

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      city?: string;
      state?: string;
      zip?: string;
      projectDetails?: string;
      heardFrom?: string;
    };

    if (!body.email || !body.firstName) {
      return Response.json({ error: 'First name and email are required' }, { status: 400 });
    }

    const fields = {
      'Name': `${body.firstName ?? ''} ${body.lastName ?? ''}`.trim(),
      'Email': body.email,
      'Phone': body.phone ?? '',
      'City': body.city ?? '',
      'State': body.state ?? '',
      'ZIP Code': body.zip ?? '',
      'Project Details': body.projectDetails ?? '',
      'How Did You Hear': body.heardFrom ?? '',
      'Status': 'New',
      'Submitted At': new Date().toISOString(),
    };

    const res = await fetch(
      `https://api.airtable.com/v0/${CAST_AIRTABLE_BASE}/${TABLE_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CAST_AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records: [{ fields }] }),
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('[contractor-lead] Airtable error:', err);
      return Response.json({ error: 'Failed to save lead' }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('[contractor-lead] Unexpected error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
