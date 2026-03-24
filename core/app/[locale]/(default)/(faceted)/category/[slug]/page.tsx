import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import TradeProSection from '~/lib/makeswift/components/cast/TradeProSection';

import CategoryProductsGrid, {
  type BCProduct,
} from './_components/CategoryProductsGrid';

const BC_STORE_HASH = 'o3r3vyxngd';
const BC_TOKEN = 'm44g12165hann457yzf0156dbc9qdp9';

const CATEGORY_NAMES: Record<number, string> = {
  24: 'Path Lights',
  26: 'Area Lights',
  31: 'Spot & Accent Lights',
  35: 'Well & In-Ground Lights',
  30: 'Wall & Deck Lights',
  32: 'Down Lights',
  45: 'Transformers',
  19: 'Accessories',
  23: 'All Products',
};

interface BCCategoryData {
  id: number;
  name: string;
  meta_description?: string;
  meta_keywords?: string;
  page_title?: string;
}

async function fetchCategory(categoryId: number): Promise<BCCategoryData | null> {
  try {
    const res = await fetch(
      `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/catalog/categories/${categoryId}`,
      {
        headers: {
          'X-Auth-Token': BC_TOKEN,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { data: BCCategoryData };
    return data.data;
  } catch {
    return null;
  }
}

async function fetchProducts(categoryId: number): Promise<BCProduct[]> {
  try {
    const params = new URLSearchParams({
      limit: '50',
      include: 'images',
      is_visible: 'true',
    });
    if (categoryId !== 23) {
      params.set('categories:in', String(categoryId));
    }
    const res = await fetch(
      `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/catalog/products?${params.toString()}`,
      {
        headers: {
          'X-Auth-Token': BC_TOKEN,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { data: BCProduct[] };
    return data.data;
  } catch {
    return [];
  }
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const categoryId = Number(slug);
  const fallbackName = CATEGORY_NAMES[categoryId] ?? 'Products';

  const category = await fetchCategory(categoryId);
  const name = category?.name ?? fallbackName;

  return {
    title: category?.page_title || `${name} | CAST Lighting`,
    description:
      category?.meta_description ||
      `Shop CAST Lighting ${name} — solid brass & copper outdoor landscape lighting built to last a lifetime.`,
    keywords: category?.meta_keywords ? category.meta_keywords.split(',') : undefined,
  };
}

const TRUST_BADGES = [
  { icon: '🏅', label: 'Lifetime Warranty' },
  { icon: '🇺🇸', label: 'Made in USA' },
  { icon: '🚚', label: 'Free Shipping over $500' },
  { icon: '💼', label: 'TradePro Pricing Available' },
];

export default async function CategoryPage(props: Props) {
  const { slug, locale } = await props.params;
  setRequestLocale(locale);

  const categoryId = Number(slug);
  const fallbackName = CATEGORY_NAMES[categoryId] ?? 'Products';

  const [category, products] = await Promise.all([
    fetchCategory(categoryId),
    fetchProducts(categoryId),
  ]);

  const categoryName = category?.name ?? fallbackName;

  return (
    <div style={{ background: 'var(--color-bg, #1a2332)', minHeight: '100vh' }}>
      {/* ── Hero Banner ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, #0d1620 0%, #1a2332 100%)',
          padding: '72px 0 56px',
          borderBottom: '1px solid rgba(200,151,42,0.15)',
        }}
      >
        <div className="site-container">
          {/* Breadcrumb */}
          <nav style={{ marginBottom: 20 }}>
            <ol
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                fontFamily: "'Barlow', sans-serif",
                fontSize: 13,
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              <li>
                <a
                  href="/"
                  style={{
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    transition: 'color 150ms',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#c8972a';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      'rgba(255,255,255,0.45)';
                  }}
                >
                  Home
                </a>
              </li>
              <li style={{ color: 'rgba(255,255,255,0.25)' }}>›</li>
              <li>
                <a
                  href="/shop"
                  style={{
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    transition: 'color 150ms',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#c8972a';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      'rgba(255,255,255,0.45)';
                  }}
                >
                  Shop
                </a>
              </li>
              <li style={{ color: 'rgba(255,255,255,0.25)' }}>›</li>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>{categoryName}</li>
            </ol>
          </nav>

          {/* Heading + badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <h1
              style={{
                fontFamily: "'Essonnes', 'Playfair Display', serif",
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 700,
                color: '#fff',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {categoryName}
            </h1>
            {products.length > 0 && (
              <span
                style={{
                  background: 'rgba(200,151,42,0.15)',
                  border: '1px solid rgba(200,151,42,0.35)',
                  color: '#c8972a',
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 20,
                  letterSpacing: '0.04em',
                }}
              >
                {products.length} Products
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Sidebar + Grid ── */}
      <section style={{ padding: '64px 0' }}>
        <div className="site-container">
          <Suspense
            fallback={
              <div
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  color: 'rgba(255,255,255,0.4)',
                  padding: '48px 0',
                  textAlign: 'center',
                }}
              >
                Loading products…
              </div>
            }
          >
            <CategoryProductsGrid products={products} categoryName={categoryName} />
          </Suspense>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section
        style={{
          background: '#151e2a',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '40px 0',
        }}
      >
        <div className="site-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 24,
            }}
          >
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 8,
                }}
              >
                <span style={{ fontSize: 22 }}>{badge.icon}</span>
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.75)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TradePro CTA ── */}
      <TradeProSection />
    </div>
  );
}
