import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string; firstName?: string };
    const { email, firstName } = body;

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }

    // Log the subscription (extend this to store in Airtable or send to an ESP as needed)
    console.log('[newsletter] New subscriber:', { email, firstName: firstName ?? '' });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[newsletter]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
