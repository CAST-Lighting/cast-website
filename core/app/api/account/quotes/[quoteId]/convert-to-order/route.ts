import { NextRequest, NextResponse } from 'next/server';
import { getSessionCustomerAccessToken } from '~/auth';

const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN ?? '';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ quoteId: string }> },
) {
  const customerAccessToken = await getSessionCustomerAccessToken();
  if (!customerAccessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { quoteId } = await params;

  try {
    const res = await fetch(
      `https://api.bigcommerce.com/stores/${STORE_HASH}/v3/b2b/quotes/${quoteId}/checkout`,
      {
        method: 'POST',
        headers: {
          'X-Auth-Token': ACCESS_TOKEN,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        cache: 'no-store',
      },
    );

    if (!res.ok) {
      const body = await res.text();
      console.error('[convert-to-order API] BC error:', res.status, body);
      return NextResponse.json({ error: 'Failed to convert quote to order' }, { status: 500 });
    }

    const data = (await res.json()) as Record<string, unknown>;
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('[convert-to-order API]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
