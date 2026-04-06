import { NextRequest, NextResponse } from 'next/server';
import { getSessionCustomerAccessToken } from '~/auth';

const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN ?? '';

interface B2BQuote {
  quoteId: string | number;
  quoteNumber?: string;
  referenceNumber?: string;
  status?: string;
  statusCode?: number;
  grandTotal?: { value: number; currencyCode: string } | number;
  totalAmount?: number;
  createdAt?: string | number;
  updatedAt?: string | number;
  customerName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

function formatQuoteStatus(status: string | number | undefined): string {
  if (!status) return 'Pending';
  const s = String(status).toLowerCase();
  if (s === '0' || s === 'open' || s === 'pending') return 'Pending';
  if (s === '1' || s === 'approved') return 'Approved';
  if (s === '4' || s === 'ordered' || s === 'converted') return 'Ordered';
  if (s === '5' || s === 'expired') return 'Expired';
  // capitalize
  return String(status).charAt(0).toUpperCase() + String(status).slice(1);
}

function formatTotal(quote: B2BQuote): string {
  if (typeof quote.grandTotal === 'object' && quote.grandTotal !== null) {
    return `$${Number(quote.grandTotal.value).toFixed(2)}`;
  }
  const val = quote.grandTotal ?? quote.totalAmount;
  if (val != null) return `$${Number(val).toFixed(2)}`;
  return '';
}

function formatDate(ts: string | number | undefined): string {
  if (!ts) return '';
  const d = new Date(typeof ts === 'number' ? ts * 1000 : ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export async function GET(_req: NextRequest) {
  const customerAccessToken = await getSessionCustomerAccessToken();
  if (!customerAccessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch(
      `https://api.bigcommerce.com/stores/${STORE_HASH}/v3/b2b/quotes?limit=50`,
      {
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
      console.error('[quotes API] BC error:', res.status, body);
      return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
    }

    const data = (await res.json()) as { data?: B2BQuote[]; list?: B2BQuote[] };
    const quotes: B2BQuote[] = data.data ?? data.list ?? [];

    const formatted = quotes.map((q) => ({
      id: String(q.quoteId),
      quoteNumber: q.quoteNumber ?? q.referenceNumber ?? `Q-${q.quoteId}`,
      status: formatQuoteStatus(q.status ?? q.statusCode),
      total: formatTotal(q),
      createdAt: formatDate(q.createdAt),
      customerName:
        q.customerName ??
        [q.firstName, q.lastName].filter(Boolean).join(' ') ??
        q.email ??
        '',
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('[quotes API]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const customerAccessToken = await getSessionCustomerAccessToken();
  if (!customerAccessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { id?: string; name?: string };
    const { id, name } = body;

    if (!id || !name) {
      return NextResponse.json({ error: 'id and name are required' }, { status: 400 });
    }

    const res = await fetch(
      `https://api.bigcommerce.com/stores/${STORE_HASH}/v3/b2b/quotes/${id}`,
      {
        method: 'PUT',
        headers: {
          'X-Auth-Token': ACCESS_TOKEN,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ quoteName: name }),
        cache: 'no-store',
      },
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error('[quotes PATCH] BC error:', res.status, errBody);
      return NextResponse.json({ error: 'Failed to rename quote' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[quotes PATCH]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
