import { NextRequest, NextResponse } from 'next/server';

const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN ?? '';

interface LineItem {
  id: string | number;
  name: string;
  sku?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  image?: string;
}

interface QuoteDetail {
  id: string;
  quoteNumber: string;
  status: string;
  createdAt: string;
  customerName: string;
  email?: string;
  subtotal: number;
  discount?: number;
  total: number;
  notes?: string;
  lineItems: LineItem[];
}

function formatDate(ts: string | number | undefined): string {
  if (!ts) return '';
  const d = new Date(typeof ts === 'number' ? ts * 1000 : ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function resolveStatus(raw: string | number | undefined): string {
  if (!raw) return 'Pending';
  const s = String(raw).toLowerCase();
  if (s === '0' || s === 'open' || s === 'pending') return 'Pending';
  if (s === '1' || s === 'approved') return 'Approved';
  if (s === '4' || s === 'ordered' || s === 'converted') return 'Ordered';
  if (s === '5' || s === 'expired') return 'Expired';
  return String(raw).charAt(0).toUpperCase() + String(raw).slice(1);
}

async function getQuoteDetail(quoteId: string): Promise<QuoteDetail | null> {
  try {
    const res = await fetch(
      `https://api.bigcommerce.com/stores/${STORE_HASH}/v3/b2b/quotes/${quoteId}`,
      {
        headers: {
          'X-Auth-Token': ACCESS_TOKEN,
          Accept: 'application/json',
        },
        cache: 'no-store',
      },
    );

    if (!res.ok) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await res.json()) as { data?: any };
    const q = data.data ?? data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawItems: any[] = q.lineItems ?? q.products ?? q.items ?? [];
    const lineItems: LineItem[] = rawItems.map((item) => ({
      id: item.id ?? Math.random(),
      name: item.name ?? item.productName ?? '',
      sku: item.sku ?? item.variantSku,
      quantity: Number(item.quantity ?? 1),
      unitPrice: Number(item.unitPrice?.value ?? item.unitPrice ?? item.price ?? 0),
      lineTotal: Number(item.extPrice?.value ?? item.lineTotal ?? item.totalPrice ?? 0),
      image: item.imageUrl ?? item.image?.url,
    }));

    const subtotal = lineItems.reduce((s, i) => s + i.lineTotal, 0);
    const discount =
      q.discount?.value ?? q.discount ?? (q.subtotal != null && q.total != null ? Number(q.subtotal) - Number(q.total) : undefined);

    return {
      id: String(q.quoteId ?? quoteId),
      quoteNumber: q.quoteNumber ?? q.referenceNumber ?? `Q-${quoteId}`,
      status: resolveStatus(q.status ?? q.statusCode),
      createdAt: formatDate(q.createdAt),
      customerName:
        q.customerName ??
        [q.firstName, q.lastName].filter(Boolean).join(' ') ??
        q.email ??
        '',
      email: q.email,
      subtotal: q.subtotal?.value ?? q.subtotalPrice ?? subtotal,
      discount: discount && Number(discount) > 0 ? Number(discount) : undefined,
      total: q.grandTotal?.value ?? q.total ?? q.totalAmount ?? subtotal,
      notes: q.notes ?? q.customerMessage,
      lineItems,
    };
  } catch {
    return null;
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ quoteId: string }> },
) {
  const { quoteId } = await params;

  // Attempt to fetch from BC; fall back to a placeholder for demo
  const quote = await getQuoteDetail(quoteId);

  const fmt = (n: number) => `$${Number(n).toFixed(2)}`;

  // Build line items table rows
  const lineItemRows = quote?.lineItems.length
    ? quote.lineItems
        .map(
          (item) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e8edf0;font-size:14px;color:#014960;">${item.name}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e8edf0;font-size:12px;color:#6b7280;font-family:monospace;">${item.sku ?? '—'}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e8edf0;font-size:14px;color:#1a3a4a;text-align:center;">${item.quantity}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e8edf0;font-size:14px;color:#1a3a4a;text-align:right;">${fmt(item.unitPrice)}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e8edf0;font-size:14px;font-weight:700;color:#014960;text-align:right;">${fmt(item.lineTotal)}</td>
        </tr>`,
        )
        .join('')
    : `<tr><td colspan="5" style="padding:24px;text-align:center;color:#6b7280;">No line items</td></tr>`;

  const quoteNumber = quote?.quoteNumber ?? `Q-${quoteId}`;
  const status = quote?.status ?? 'Pending';
  const createdAt = quote?.createdAt ?? '';
  const customerName = quote?.customerName ?? '';
  const subtotal = fmt(Number(quote?.subtotal ?? 0));
  const total = fmt(Number(quote?.total ?? 0));
  const discountRow =
    quote?.discount && quote.discount > 0
      ? `<tr>
          <td colspan="4" style="padding:8px 16px;text-align:right;font-size:14px;color:#1a3a4a;">Discount</td>
          <td style="padding:8px 16px;text-align:right;font-size:14px;color:#10b981;">−${fmt(quote.discount)}</td>
        </tr>`
      : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quote ${quoteNumber} — CAST Lighting</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #014960;
      background: #fff;
      padding: 48px 56px;
      max-width: 900px;
      margin: 0 auto;
    }
    @media print {
      body { padding: 24px 32px; }
      .no-print { display: none !important; }
    }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #014960; padding-bottom: 24px; }
    .logo { font-size: 26px; font-weight: 900; letter-spacing: -0.03em; color: #014960; }
    .logo span { color: #007CB0; }
    .quote-meta { text-align: right; }
    .quote-meta h1 { font-size: 22px; font-weight: 700; color: #014960; margin-bottom: 6px; }
    .quote-meta p { font-size: 13px; color: #1a3a4a; margin-bottom: 3px; }
    .status-badge {
      display: inline-block;
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
      padding: 4px 12px; border-radius: 100px;
      background: ${status === 'Approved' ? 'rgba(34,197,94,0.15)' : status === 'Ordered' ? 'rgba(0,124,176,0.15)' : 'rgba(234,179,8,0.15)'};
      color: ${status === 'Approved' ? '#16a34a' : status === 'Ordered' ? '#007CB0' : '#ca8a04'};
      margin-top: 8px;
    }
    .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #007CB0; margin-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
    th {
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
      color: #007CB0; padding: 10px 16px; border-bottom: 2px solid #014960; text-align: left;
    }
    th:last-child, th:nth-child(3), th:nth-child(4) { text-align: right; }
    th:nth-child(3) { text-align: center; }
    .totals { margin-left: auto; max-width: 320px; }
    .totals table { margin-bottom: 0; }
    .totals td { padding: 8px 16px; font-size: 14px; }
    .total-row td { font-size: 16px; font-weight: 700; border-top: 2px solid #014960; padding-top: 12px; }
    .footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid #e8edf0; font-size: 12px; color: #6b7280; text-align: center; }
    .print-btn {
      display: inline-block; margin-bottom: 32px;
      background: #014960; color: #fff;
      font-family: inherit; font-size: 14px; font-weight: 600;
      padding: 10px 24px; border: none; border-radius: 4px; cursor: pointer;
    }
    .print-btn:hover { background: #007CB0; }
  </style>
</head>
<body>
  <button class="print-btn no-print" onclick="window.print()">🖨️ Print / Save as PDF</button>

  <div class="header">
    <div class="logo">CAST <span>Lighting</span></div>
    <div class="quote-meta">
      <h1>Quote #${quoteNumber}</h1>
      ${createdAt ? `<p>Date: ${createdAt}</p>` : ''}
      ${customerName ? `<p>Customer: ${customerName}</p>` : ''}
      <span class="status-badge">${status}</span>
    </div>
  </div>

  <p class="section-title">Line Items</p>
  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>SKU</th>
        <th style="text-align:center;">Qty</th>
        <th style="text-align:right;">Unit Price</th>
        <th style="text-align:right;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${lineItemRows}
    </tbody>
  </table>

  <div class="totals">
    <table>
      <tr>
        <td style="color:#1a3a4a;">Subtotal</td>
        <td style="text-align:right;color:#014960;">${subtotal}</td>
      </tr>
      ${discountRow}
      <tr class="total-row">
        <td style="color:#014960;font-weight:700;">Total</td>
        <td style="text-align:right;color:#014960;font-size:18px;">${total}</td>
      </tr>
    </table>
  </div>

  ${quote?.notes ? `<div style="margin-top:32px;"><p class="section-title">Notes</p><p style="font-size:14px;color:#1a3a4a;line-height:1.7;">${quote.notes}</p></div>` : ''}

  <div class="footer">
    <p>CAST Lighting — Professional Outdoor Lighting Systems</p>
    <p>Questions? Contact us at sales@cast-lighting.com</p>
  </div>

  <script>
    // Auto-trigger print dialog after a short delay for direct access
    // window.addEventListener('load', () => setTimeout(() => window.print(), 800));
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
