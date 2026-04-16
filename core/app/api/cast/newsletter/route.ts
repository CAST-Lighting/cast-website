import { NextRequest, NextResponse } from 'next/server';
import { createContact } from '~/lib/airtable';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string; firstName?: string };
    const { email, firstName } = body;

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }

    await createContact({
      Email: email,
      Name: firstName ?? '',
      Source: 'Newsletter',
      'Subscribed At': new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[newsletter]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
