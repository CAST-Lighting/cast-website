import { NextRequest, NextResponse } from 'next/server';
import { getSessionCustomerAccessToken } from '~/auth';

const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN ?? '';

interface BCOrder {
  id: number;
  status: string;
  total_inc_tax: string;
  date_created: string;
  items_total: number;
  shipping_addresses?: Array<{ tracking_number?: string }>;
}

function formatOrderStatus(status: string): string {
  const s = status.toLowerCase();
  if (s === 'awaiting fulfillment' || s === 'pending') return 'Processing';
  if (s === 'shipped' || s === 'partially shipped') return 'Shipped';
  if (s === 'completed' || s === 'delivered') return 'Delivered';
  if (s === 'cancelled' || s === 'declined' || s === 'refunded') {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export async function GET(_req: NextRequest) {
  const customerAccessToken = await getSessionCustomerAccessToken();
  if (!customerAccessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch(
      `https://api.bigcommerce.com/stores/${STORE_HASH}/v2/orders?limit=20&sort=date_created:desc`,
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
      console.error('[orders API] BC error:', res.status, body);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    const orders = (await res.json()) as BCOrder[];

    const formatted = (Array.isArray(orders) ? orders : []).map((o) => ({
      id: String(o.id),
      orderNumber: `ORD-${o.id}`,
      status: formatOrderStatus(o.status),
      total: `$${Number(o.total_inc_tax).toFixed(2)}`,
      createdAt: formatDate(o.date_created),
      itemCount: o.items_total ?? 0,
      trackingNumber: o.shipping_addresses?.[0]?.tracking_number ?? undefined,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('[orders API]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
