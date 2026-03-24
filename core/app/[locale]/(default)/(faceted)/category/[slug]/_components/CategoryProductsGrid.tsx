'use client';

import { useState } from 'react';

interface ProductImage {
  url_standard: string;
  url_thumbnail: string;
  is_thumbnail: boolean;
}

export interface BCProduct {
  id: number;
  name: string;
  custom_url: { url: string };
  price: number;
  sale_price: number;
  images: ProductImage[];
}

const PRICE_RANGES = [
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 – $500', min: 100, max: 500 },
  { label: '$500 – $1,000', min: 500, max: 1000 },
  { label: '$1,000+', min: 1000, max: Infinity },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function getProductImage(product: BCProduct): string | null {
  if (!product.images || product.images.length === 0) return null;
  const thumb = product.images.find((img) => img.is_thumbnail);
  return (thumb ?? product.images[0])?.url_standard ?? null;
}

const ProductCard = ({ product }: { product: BCProduct }) => {
  const imageUrl = getProductImage(product);
  const displayPrice = product.sale_price > 0 ? product.sale_price : product.price;

  return (
    <div
      style={{
        background: '#2d353c',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 200ms, box-shadow 200ms',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,151,42,0.4)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #1a2e3a 0%, #0d4a5c 50%, #1a3a4a 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(175,229,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(175,229,253,0.04) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              style={{ opacity: 0.5, position: 'relative', zIndex: 1 }}
            >
              <circle cx="12" cy="12" r="10" stroke="#c8972a" strokeWidth="1.5" />
              <path
                d="M8 12h8M12 8v8"
                stroke="#c8972a"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
        {product.sale_price > 0 && (
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <span
              style={{
                background: 'var(--color-accent, #c8972a)',
                color: '#fff',
                fontFamily: "'Barlow', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '3px 8px',
                borderRadius: 4,
                display: 'inline-block',
              }}
            >
              Sale
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div
        style={{ padding: '18px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--color-title)',
            margin: 0,
            lineHeight: 1.35,
          }}
        >
          {product.name}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: '#fff',
              margin: 0,
            }}
          >
            {formatPrice(displayPrice)}
          </p>
          {product.sale_price > 0 && (
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 13,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.4)',
                margin: 0,
                textDecoration: 'line-through',
              }}
            >
              {formatPrice(product.price)}
            </p>
          )}
        </div>
        <a
          href={product.custom_url.url}
          className="sg-btn-solid-md"
          style={{ marginTop: 'auto', textAlign: 'center', textDecoration: 'none', justifyContent: 'center' }}
        >
          View Product →
        </a>
      </div>
    </div>
  );
};

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

function sortProducts(products: BCProduct[], sort: SortKey): BCProduct[] {
  const sorted = [...products];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
    case 'price-desc':
      return sorted.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
}

interface Props {
  products: BCProduct[];
  categoryName: string;
}

export default function CategoryProductsGrid({ products, categoryName }: Props) {
  const [sort, setSort] = useState<SortKey>('featured');
  const [activePriceRanges, setActivePriceRanges] = useState<number[]>([]);

  const togglePriceRange = (idx: number) => {
    setActivePriceRanges((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  const filtered =
    activePriceRanges.length === 0
      ? products
      : products.filter((p) => {
          const price = p.sale_price > 0 ? p.sale_price : p.price;
          return activePriceRanges.some((idx) => {
            const range = PRICE_RANGES[idx];
            return range !== undefined && price >= range.min && price < range.max;
          });
        });

  const displayed = sortProducts(filtered, sort);

  return (
    <>
      <style>{`
        .cat-sidebar {
          width: 220px;
          flex-shrink: 0;
          background: #2d353c;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 24px;
          align-self: flex-start;
          position: sticky;
          top: 100px;
        }
        .cat-filter-label {
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-content);
          margin: 0 0 10px;
        }
        .cat-filter-section { margin-bottom: 24px; }
        .cat-filter-section:last-child { margin-bottom: 0; }
        .cat-filter-item {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Barlow', sans-serif; font-size: 14px; color: var(--color-content);
          padding: 4px 0; cursor: pointer; user-select: none;
        }
        .cat-filter-item input { cursor: pointer; accent-color: var(--color-primary); }
        .cat-product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 1100px) { .cat-product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 900px) { .cat-sidebar { width: 100%; position: static; } .cat-layout { flex-direction: column !important; } }
        @media (max-width: 575px) { .cat-product-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="cat-layout" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <aside className="cat-sidebar">
          <h2
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--color-title)',
              margin: '0 0 20px',
            }}
          >
            Filters
          </h2>

          <div className="cat-filter-section">
            <p className="cat-filter-label">Price Range</p>
            {PRICE_RANGES.map((range, idx) => (
              <label key={range.label} className="cat-filter-item">
                <input
                  type="checkbox"
                  checked={activePriceRanges.includes(idx)}
                  onChange={() => togglePriceRange(idx)}
                />
                {range.label}
              </label>
            ))}
          </div>

          {activePriceRanges.length > 0 && (
            <button
              onClick={() => setActivePriceRanges([])}
              style={{
                background: 'transparent',
                border: '1px solid rgba(200,151,42,0.4)',
                borderRadius: 4,
                color: 'var(--color-accent, #c8972a)',
                fontFamily: "'Barlow', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                padding: '6px 12px',
                cursor: 'pointer',
                width: '100%',
                marginTop: 8,
              }}
            >
              Clear Filters
            </button>
          )}
        </aside>

        {/* Product grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Sort bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 14,
                color: 'rgba(255,255,255,0.5)',
                margin: 0,
              }}
            >
              {displayed.length} product{displayed.length !== 1 ? 's' : ''}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 13,
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 4,
                padding: '6px 12px',
                color: 'var(--color-title)',
                background: '#2d353c',
                cursor: 'pointer',
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {displayed.length === 0 ? (
            <div
              style={{
                padding: '48px 24px',
                textAlign: 'center',
                background: '#2d353c',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 16,
                  color: 'rgba(255,255,255,0.5)',
                  margin: 0,
                }}
              >
                No products in this category yet.
              </p>
            </div>
          ) : (
            <div className="cat-product-grid">
              {displayed.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
