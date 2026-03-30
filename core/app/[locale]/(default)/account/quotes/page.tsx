import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { getSessionCustomerAccessToken } from '~/auth';
import { CmsPageRenderer } from '~/lib/makeswift/cms-page-renderer';

interface Props {
  params: Promise<{ locale: string }>;
}

interface Quote {
  id: string;
  quoteNumber: string;
  status: 'Pending' | 'Approved' | 'Ordered' | 'Expired' | string;
  total: string;
  createdAt: string;
  customerName: string;
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Pending: { bg: 'rgba(234,179,8,0.15)', color: '#f5c518' },
  Approved: { bg: 'rgba(34,197,94,0.15)', color: '#4ade80' },
  Ordered: { bg: 'rgba(0,124,176,0.2)', color: '#7EBEE8' },
  Expired: { bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' },
};

function statusStyle(status: string): { bg: string; color: string } {
  return STATUS_COLORS[status] ?? STATUS_COLORS['Pending'] ?? { bg: 'rgba(234,179,8,0.15)', color: '#f5c518' };
}

async function getQuotes(): Promise<Quote[]> {
  const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
  const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN ?? '';

  try {
    const res = await fetch(
      `https://api.bigcommerce.com/stores/${STORE_HASH}/v3/b2b/quotes?limit=50`,
      {
        headers: {
          'X-Auth-Token': ACCESS_TOKEN,
          Accept: 'application/json',
        },
        cache: 'no-store',
      },
    );
    if (!res.ok) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await res.json()) as { data?: any[]; list?: any[] };
    const raw = data.data ?? data.list ?? [];

    return raw.map((q) => ({
      id: String(q.quoteId ?? q.id),
      quoteNumber: q.quoteNumber ?? q.referenceNumber ?? `Q-${q.quoteId ?? q.id}`,
      status: resolveStatus(q.status ?? q.statusCode),
      total: formatTotal(q),
      createdAt: formatDate(q.createdAt),
      customerName:
        q.customerName ??
        [q.firstName, q.lastName].filter(Boolean).join(' ') ??
        q.email ??
        '',
    }));
  } catch {
    return [];
  }
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatTotal(q: any): string {
  if (q.grandTotal && typeof q.grandTotal === 'object') {
    return `$${Number(q.grandTotal.value).toFixed(2)}`;
  }
  const val = q.grandTotal ?? q.totalAmount;
  if (val != null) return `$${Number(val).toFixed(2)}`;
  return '';
}

function formatDate(ts: string | number | undefined): string {
  if (!ts) return '';
  const d = new Date(typeof ts === 'number' ? ts * 1000 : ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function QuotesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const customerAccessToken = await getSessionCustomerAccessToken();
  if (!customerAccessToken) {
    redirect('/login');
  }

  // Try CmsPageRenderer first
  const cmsPage = await CmsPageRenderer({ templatePath: '/account/quotes', data: {} });
  if (cmsPage) return cmsPage;

  const quotes = await getQuotes();

  return (
    <>
      <style>{`
        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1100px) { .quotes-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 680px) { .quotes-grid { grid-template-columns: 1fr; } }
        .quote-card {
          background: #2d353c;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 200ms, box-shadow 200ms, transform 200ms;
        }
        .quote-card:hover {
          border-color: rgba(0,124,176,0.45);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }
      `}</style>

      <div style={{ background: '#0f1923', minHeight: '100vh', paddingBottom: 80 }}>
        {/* Hero */}
        <section style={{ background: '#1a2332', paddingTop: 72, paddingBottom: 72, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(0,124,176,0.1), transparent 70%)', pointerEvents: 'none' }} />
          <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#007CB0', margin: '0 0 12px' }}>
              TradePro Account
            </p>
            <h1 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'var(--h1-size)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: '0 0 16px' }}>
              My Quotes
            </h1>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              {quotes.length} {quotes.length === 1 ? 'quote' : 'quotes'}
            </p>
          </div>
        </section>

        <div style={{ padding: '64px 0' }}>
          <div className="site-container">
            {quotes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 20, opacity: 0.3 }}>📄</div>
                <p style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'var(--h3-size)', color: '#fff', margin: '0 0 12px' }}>
                  No quotes yet
                </p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.5)', margin: '0 0 32px' }}>
                  No quotes yet. Add items to your cart and request a quote.
                </p>
                <a href="/shop" className="sg-btn-solid-md" style={{ textDecoration: 'none' }}>
                  Browse Products →
                </a>
              </div>
            ) : (
              <div className="quotes-grid">
                {quotes.map((quote) => {
                  const { bg, color } = statusStyle(quote.status);
                  return (
                    <div key={quote.id} className="quote-card">
                      <div style={{ padding: '24px' }}>
                        {/* Quote # + status */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                          <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'var(--h4-size)', fontWeight: 700, color: '#fff', margin: 0 }}>
                            #{quote.quoteNumber}
                          </h3>
                          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: bg, color, padding: '4px 12px', borderRadius: 100 }}>
                            {quote.status}
                          </span>
                        </div>

                        {/* Meta */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
                          {quote.createdAt && (
                            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                              Created: {quote.createdAt}
                            </p>
                          )}
                          {quote.customerName && (
                            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                              {quote.customerName}
                            </p>
                          )}
                          {quote.total && (
                            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, fontWeight: 700, color: '#7EBEE8', margin: 0 }}>
                              {quote.total}
                            </p>
                          )}
                        </div>

                        <a href={`/account/quotes/${quote.id}`} className="sg-btn-outline-dark-sm" style={{ textDecoration: 'none', display: 'inline-block' }}>
                          View Quote →
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
