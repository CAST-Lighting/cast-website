import { redirect, notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { getSessionCustomerAccessToken } from '~/auth';

interface Props {
  params: Promise<{ locale: string; quoteId: string }>;
}

interface LineItem {
  id: string | number;
  productId?: number;
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

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Pending: { bg: 'rgba(234,179,8,0.15)', color: '#f5c518' },
  Approved: { bg: 'rgba(34,197,94,0.15)', color: '#4ade80' },
  Ordered: { bg: 'rgba(0,124,176,0.2)', color: '#7EBEE8' },
  Expired: { bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' },
};

function getStatusStyle(status: string): { bg: string; color: string } {
  return STATUS_COLORS[status] ?? STATUS_COLORS['Pending'] ?? { bg: 'rgba(234,179,8,0.15)', color: '#f5c518' };
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

function formatDate(ts: string | number | undefined): string {
  if (!ts) return '';
  const d = new Date(typeof ts === 'number' ? ts * 1000 : ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

async function getQuoteDetail(quoteId: string): Promise<QuoteDetail | null> {
  const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
  const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN ?? '';

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

    if (res.status === 404) return null;
    if (!res.ok) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await res.json()) as { data?: any };
    const q = data.data ?? data;

    // Extract line items
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawItems: any[] = q.lineItems ?? q.products ?? q.items ?? [];
    const lineItems: LineItem[] = rawItems.map((item) => ({
      id: item.id ?? item.lineItemEntityId ?? Math.random(),
      productId: item.productId,
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

export default async function QuoteDetailPage({ params }: Props) {
  const { locale, quoteId } = await params;
  setRequestLocale(locale);

  const customerAccessToken = await getSessionCustomerAccessToken();
  if (!customerAccessToken) {
    redirect('/login');
  }

  const quote = await getQuoteDetail(quoteId);
  if (!quote) notFound();

  const { bg, color } = getStatusStyle(quote.status);
  const fmt = (n: number) => `$${Number(n).toFixed(2)}`;

  return (
    <>
      <style>{`
        .quote-table { width: 100%; border-collapse: collapse; }
        .quote-table th {
          fontFamily: Barlow sans-serif;
          fontSize: 11px;
          fontWeight: 700;
          textTransform: uppercase;
          letterSpacing: 0.1em;
          color: rgba(255,255,255,0.4);
          padding: 12px 16px;
          borderBottom: 1px solid rgba(255,255,255,0.08);
          textAlign: left;
        }
        .quote-table td {
          padding: 16px;
          borderBottom: 1px solid rgba(255,255,255,0.06);
          verticalAlign: middle;
        }
        .quote-table tr:last-child td { border-bottom: none; }
      `}</style>

      <div style={{ background: '#0f1923', minHeight: '100vh', paddingBottom: 80 }}>
        {/* Hero */}
        <section style={{ background: '#1a2332', paddingTop: 64, paddingBottom: 64, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(0,124,176,0.1), transparent 70%)', pointerEvents: 'none' }} />
          <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
            {/* Back link */}
            <a
              href="/account/quotes"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: '#7EBEE8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}
            >
              ← Back to Quotes
            </a>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'var(--h2-size)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: '0 0 12px' }}>
                  Quote #{quote.quoteNumber}
                </h1>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  {quote.createdAt && (
                    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                      {quote.createdAt}
                    </span>
                  )}
                  {quote.customerName && (
                    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                      {quote.customerName}
                    </span>
                  )}
                </div>
              </div>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: bg, color, padding: '6px 16px', borderRadius: 100, whiteSpace: 'nowrap' }}>
                {quote.status}
              </span>
            </div>
          </div>
        </section>

        <div style={{ padding: '48px 0' }}>
          <div className="site-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>

              {/* ── Line Items ── */}
              <div>
                <div style={{ background: '#2d353c', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'var(--h3-size)', fontWeight: 700, color: '#fff', margin: 0 }}>
                      Line Items
                    </h2>
                  </div>

                  {quote.lineItems.length === 0 ? (
                    <div style={{ padding: '40px 24px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: "'Barlow', sans-serif", fontSize: 15 }}>
                      No line items
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr>
                            <th style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'left' }}>Product</th>
                            <th style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'left' }}>SKU</th>
                            <th style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>Qty</th>
                            <th style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'right' }}>Unit</th>
                            <th style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'right' }}>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {quote.lineItems.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                              <td style={{ padding: '16px', verticalAlign: 'middle' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, background: '#1a2332', flexShrink: 0 }}
                                    />
                                  ) : (
                                    <div style={{ width: 48, height: 48, background: '#1a2332', borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
                                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#7EBEE8" strokeWidth="1.5" />
                                        <circle cx="8.5" cy="8.5" r="1.5" stroke="#7EBEE8" strokeWidth="1.5" />
                                        <path d="M21 15l-5-5L5 21" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round" />
                                      </svg>
                                    </div>
                                  )}
                                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>
                                    {item.name}
                                  </span>
                                </div>
                              </td>
                              <td style={{ padding: '16px', verticalAlign: 'middle' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                                  {item.sku ?? '—'}
                                </span>
                              </td>
                              <td style={{ padding: '16px', verticalAlign: 'middle', textAlign: 'center' }}>
                                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                                  {item.quantity}
                                </span>
                              </td>
                              <td style={{ padding: '16px', verticalAlign: 'middle', textAlign: 'right' }}>
                                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                                  {fmt(item.unitPrice)}
                                </span>
                              </td>
                              <td style={{ padding: '16px', verticalAlign: 'middle', textAlign: 'right' }}>
                                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 700, color: '#fff' }}>
                                  {fmt(item.lineTotal)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {quote.notes && (
                  <div style={{ background: '#2d353c', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', padding: '24px', marginTop: 24 }}>
                    <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'var(--h4-size)', fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>
                      Notes
                    </h3>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>
                      {quote.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* ── Sidebar: Summary + Actions ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Summary */}
                <div style={{ background: '#2d353c', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', padding: '24px' }}>
                  <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'var(--h4-size)', fontWeight: 700, color: '#fff', margin: '0 0 20px' }}>
                    Summary
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>Subtotal</span>
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: '#fff' }}>{fmt(quote.subtotal)}</span>
                    </div>
                    {quote.discount && quote.discount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>Discount</span>
                        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: '#4ade80' }}>−{fmt(quote.discount)}</span>
                      </div>
                    )}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: '#fff' }}>Total</span>
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, fontWeight: 700, color: '#7EBEE8' }}>{fmt(Number(quote.total))}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ background: '#2d353c', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'var(--h4-size)', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
                    Actions
                  </h3>
                  {quote.status === 'Approved' && (
                    <a
                      href={`/account/quotes/${quote.id}/convert`}
                      className="sg-btn-solid-dark-md"
                      style={{ textDecoration: 'none', display: 'block', textAlign: 'center', width: '100%' }}
                    >
                      Convert to Order →
                    </a>
                  )}
                  <a
                    href={`/api/account/quotes/${quote.id}/pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sg-btn-outline-dark-sm"
                    style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}
                  >
                    Download / Print PDF
                  </a>
                  <a
                    href={`mailto:sales@cast-lighting.com?subject=Request Changes on Quote ${quote.quoteNumber}`}
                    className="sg-btn-outline-dark-sm"
                    style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}
                  >
                    Request Changes
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
