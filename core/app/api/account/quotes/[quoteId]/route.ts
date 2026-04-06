import { NextRequest, NextResponse } from 'next/server';
import { getSessionCustomerAccessToken } from '~/auth';

const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN ?? '';

interface B2BQuoteDetail {
  quoteId: string | number;
  quoteNumber?: string;
  referenceNumber?: string;
  quoteName?: string;
  status?: string;
  statusCode?: number;
  grandTotal?: { value: number; currencyCode: string } | number;
  totalAmount?: number;
  createdAt?: string | number;
  updatedAt?: string | number;
  expiredAt?: string | number;
  customerName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  notes?: string;
  taxTotal?: number;
  subtotalAmount?: number;
  products?: Array<{
    productId: number;
    productName: string;
    sku?: string;
    imageUrl?: string;
    basePrice?: number;
    offeredPrice?: number;
    quantity: number;
  }>;
}

function formatQuoteStatus(status: string | number | undefined): string {
  if (!status) return 'Pending';
  const s = String(status).toLowerCase();
  if (s === '0' || s === 'open' || s === 'pending') return 'Pending';
  if (s === '1' || s === 'approved') return 'Approved';
  if (s === '4' || s === 'ordered' || s === 'converted') return 'Ordered';
  if (s === '5' || s === 'expired') return 'Expired';
  return String(status).charAt(0).toUpperCase() + String(status).slice(1);
}

function formatDate(ts: string | number | undefined): string {
  if (!ts) return '';
  const d = new Date(typeof ts === 'number' ? ts * 1000 : ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatMoney(val: number | undefined): string {
  if (val == null) return '$0.00';
  return `$${Number(val).toFixed(2)}`;
}

export async function GET(
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
      `https://api.bigcommerce.com/stores/${STORE_HASH}/v3/b2b/quotes/${quoteId}`,
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
      console.error('[quote detail API] BC error:', res.status, body);
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    const data = (await res.json()) as { data?: B2BQuoteDetail } | B2BQuoteDetail;
    const q: B2BQuoteDetail = ('data' in data && data.data) ? data.data : (data as B2BQuoteDetail);

    const grandTotalVal =
      typeof q.grandTotal === 'object' && q.grandTotal !== null
        ? q.grandTotal.value
        : (q.grandTotal ?? q.totalAmount ?? 0);

    const items = (q.products ?? []).map((p, i) => ({
      id: String(i + 1),
      productId: p.productId,
      name: p.productName,
      modelNumber: p.sku ?? '',
      image: p.imageUrl ?? null,
      price: formatMoney(p.offeredPrice ?? p.basePrice),
      qty: p.quantity,
      lineTotal: formatMoney((p.offeredPrice ?? p.basePrice ?? 0) * p.quantity),
    }));

    const subtotalVal = q.subtotalAmount ?? grandTotalVal;
    const taxVal = q.taxTotal ?? 0;

    const formatted = {
      id: String(q.quoteId),
      quoteNumber: q.quoteNumber ?? q.referenceNumber ?? `Q-${q.quoteId}`,
      quoteName: q.quoteName ?? q.quoteNumber ?? q.referenceNumber ?? `Q-${q.quoteId}`,
      status: formatQuoteStatus(q.status ?? q.statusCode),
      createdAt: formatDate(q.createdAt),
      expiresAt: formatDate(q.expiredAt ?? q.updatedAt),
      customerName:
        q.customerName ??
        [q.firstName, q.lastName].filter(Boolean).join(' ') ??
        q.email ??
        '',
      notes: q.notes ?? '',
      items,
      subtotal: formatMoney(subtotalVal),
      tax: formatMoney(taxVal),
      total: formatMoney(grandTotalVal),
    };

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('[quote detail API]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
