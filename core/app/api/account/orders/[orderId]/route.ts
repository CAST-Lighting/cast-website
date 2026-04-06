import { NextRequest, NextResponse } from 'next/server';
import { getSessionCustomerAccessToken } from '~/auth';

const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN ?? '';

interface BCOrder {
  id: number;
  status: string;
  total_inc_tax: string;
  subtotal_inc_tax: string;
  shipping_cost_inc_tax: string;
  total_tax: string;
  date_created: string;
  date_shipped: string | null;
  staff_notes?: string;
  customer_message?: string;
}

interface BCProduct {
  id: number;
  product_id: number;
  name: string;
  sku: string;
  base_price: string;
  quantity: number;
  total_inc_tax: string;
}

interface BCShippingAddress {
  first_name: string;
  last_name: string;
  street_1: string;
  street_2?: string;
  city: string;
  state: string;
  zip: string;
  tracking_number?: string;
  tracking_carrier?: string;
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

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const customerAccessToken = await getSessionCustomerAccessToken();
  if (!customerAccessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { orderId } = await params;

  try {
    const [orderRes, productsRes, shippingRes] = await Promise.all([
      fetch(`https://api.bigcommerce.com/stores/${STORE_HASH}/v2/orders/${orderId}`, {
        headers: { 'X-Auth-Token': ACCESS_TOKEN, Accept: 'application/json' },
        cache: 'no-store',
      }),
      fetch(`https://api.bigcommerce.com/stores/${STORE_HASH}/v2/orders/${orderId}/products`, {
        headers: { 'X-Auth-Token': ACCESS_TOKEN, Accept: 'application/json' },
        cache: 'no-store',
      }),
      fetch(
        `https://api.bigcommerce.com/stores/${STORE_HASH}/v2/orders/${orderId}/shipping_addresses`,
        {
          headers: { 'X-Auth-Token': ACCESS_TOKEN, Accept: 'application/json' },
          cache: 'no-store',
        },
      ),
    ]);

    if (!orderRes.ok) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = (await orderRes.json()) as BCOrder;
    const products = orderRes.ok && productsRes.ok ? ((await productsRes.json()) as BCProduct[]) : [];
    const shippingAddresses =
      shippingRes.ok ? ((await shippingRes.json()) as BCShippingAddress[]) : [];

    const firstShipping = shippingAddresses[0];
    const trackingNumber = firstShipping?.tracking_number ?? undefined;

    const items = (Array.isArray(products) ? products : []).map((p) => ({
      id: String(p.id),
      productId: p.product_id,
      name: p.name,
      modelNumber: p.sku ?? '',
      image: null as string | null,
      price: `$${Number(p.base_price).toFixed(2)}`,
      qty: p.quantity,
      lineTotal: `$${Number(p.total_inc_tax).toFixed(2)}`,
    }));

    const formatted = {
      id: String(order.id),
      orderNumber: `ORD-${order.id}`,
      status: formatOrderStatus(order.status),
      createdAt: formatDate(order.date_created),
      shippedAt: order.date_shipped ? formatDate(order.date_shipped) : undefined,
      deliveredAt: undefined as string | undefined,
      trackingNumber,
      trackingUrl: trackingNumber
        ? `https://www.ups.com/track?tracknum=${trackingNumber}`
        : undefined,
      shippingAddress: firstShipping
        ? {
            name: `${firstShipping.first_name} ${firstShipping.last_name}`.trim(),
            line1: firstShipping.street_1,
            line2: firstShipping.street_2 ?? undefined,
            city: firstShipping.city,
            state: firstShipping.state,
            zip: firstShipping.zip,
          }
        : { name: '', line1: '', city: '', state: '', zip: '' },
      items,
      subtotal: `$${Number(order.subtotal_inc_tax).toFixed(2)}`,
      shipping: `$${Number(order.shipping_cost_inc_tax).toFixed(2)}`,
      tax: `$${Number(order.total_tax).toFixed(2)}`,
      total: `$${Number(order.total_inc_tax).toFixed(2)}`,
      notes: order.staff_notes ?? order.customer_message ?? undefined,
    };

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('[order detail API]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
