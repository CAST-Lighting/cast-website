import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { TAGS } from '~/client/tags';
import { getPreferredCurrencyCode } from '~/lib/currency';

interface Props {
  params: Promise<{ locale: string }>;
}

// ── GraphQL ──────────────────────────────────────────────────────────────────

const FavoritesQuery = graphql(`
  query FavoritesPageQuery($currencyCode: currencyCode) {
    customer {
      wishlists(first: 1) {
        edges {
          node {
            entityId
            name
            items(first: 50) {
              edges {
                node {
                  entityId
                  product {
                    entityId
                    name
                    path
                    defaultImage {
                      url(width: 400)
                      altText
                    }
                    prices(currencyCode: $currencyCode) {
                      price {
                        formatted
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

interface FavoriteItem {
  wishlistItemId: number;
  productId: number;
  name: string;
  price: string;
  image: { url: string; alt: string } | null;
  href: string;
}

async function getFavoriteItems(): Promise<FavoriteItem[]> {
  const customerAccessToken = await getSessionCustomerAccessToken();
  const currencyCode = await getPreferredCurrencyCode();

  const response = await client.fetch({
    document: FavoritesQuery,
    variables: { currencyCode },
    customerAccessToken,
    fetchOptions: { cache: 'no-store', next: { tags: [TAGS.customer] } },
  });

  const wishlists = response.data.customer?.wishlists?.edges ?? [];
  if (wishlists.length === 0) return [];

  const firstWishlist = wishlists[0]?.node;
  if (!firstWishlist) return [];

  return (firstWishlist.items?.edges ?? []).map((edge) => {
    const item = edge?.node;
    const product = item?.product;
    return {
      wishlistItemId: item?.entityId ?? 0,
      productId: product?.entityId ?? 0,
      name: product?.name ?? '',
      price: product?.prices?.price?.formatted ?? '',
      image: product?.defaultImage
        ? { url: product.defaultImage.url, alt: product.defaultImage.altText ?? '' }
        : null,
      href: product?.path ?? '#',
    };
  });
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function FavoritesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Auth-gated page — always use code layout (no Makeswift override)
  const items = await getFavoriteItems();

  return (
    <>
      <style>{`
        .fav-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) { .fav-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .fav-grid { grid-template-columns: 1fr; } }
        .fav-card {
          background: #2d353c;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 200ms, box-shadow 200ms, transform 200ms;
        }
        .fav-card:hover {
          border-color: rgba(0,124,176,0.45);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }
      `}</style>

      <div style={{ background: '#0f1923', minHeight: '100vh', paddingBottom: 80 }}>
        {/* Hero — SubPageHeroStatic pattern */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: 165, paddingBottom: 64, zIndex: 2 }}
        >
          <img
            src="https://storage.googleapis.com/s.mkswft.com/RmlsZTpmNGU1MTkzMi02Y2JlLTQ0ZjAtOWIwNC03ZmI3MmQwNzYwMDk=/background-1.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: '#25262d', opacity: 0.6, zIndex: 1 }}
          />
          <div className="site-container w-full relative" style={{ zIndex: 10 }}>
            <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
              <div className="badge-pill self-center">
                <span
                  className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                  style={{ background: 'var(--color-accent)' }}
                />
                <span>My Account</span>
              </div>
              <h1 className="heading-style-h1" style={{ color: 'var(--color-blue-grey-100)' }}>
                My Favorites
              </h1>
              <p className="section-desc max-w-xl" style={{ color: 'var(--color-blue-grey-300)' }}>
                {items.length} {items.length === 1 ? 'item' : 'items'} saved to your list
              </p>
            </div>
          </div>
        </section>

        {/* Grid or empty state */}
        <div style={{ padding: '64px 0' }}>
          <div className="site-container">
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 20, opacity: 0.3 }}>♡</div>
                <p style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'var(--h3-size)', color: '#fff', margin: '0 0 12px' }}>
                  No favorites yet
                </p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.5)', margin: '0 0 32px' }}>
                  Your favorites list is empty. Browse products to add favorites.
                </p>
                <a href="/shop" className="sg-btn-solid-md" style={{ textDecoration: 'none' }}>
                  Browse Products →
                </a>
              </div>
            ) : (
              <div className="fav-grid">
                {items.map((item) => (
                  <div key={item.wishlistItemId} className="fav-card">
                    {/* Image */}
                    <a href={item.href} style={{ textDecoration: 'none', display: 'block' }}>
                      <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#1a2332', position: 'relative' }}>
                        {item.image ? (
                          <img
                            src={item.image.url}
                            alt={item.image.alt}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a2e3a, #0d3a4a)' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#7EBEE8" strokeWidth="1.5" />
                              <circle cx="8.5" cy="8.5" r="1.5" stroke="#7EBEE8" strokeWidth="1.5" />
                              <path d="M21 15l-5-5L5 21" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </a>

                    {/* Card body */}
                    <div style={{ padding: '20px' }}>
                      <a href={item.href} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'var(--h4-size)', fontWeight: 700, color: '#fff', lineHeight: 1.3, margin: '0 0 8px' }}>
                          {item.name}
                        </h3>
                      </a>
                      {item.price && (
                        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 600, color: '#7EBEE8', margin: '0 0 16px' }}>
                          {item.price}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <a href={item.href} className="sg-btn-solid-dark-sm" style={{ textDecoration: 'none', flex: 1, textAlign: 'center' }}>
                          View Product
                        </a>
                        <form action={`/api/account/favorites?itemId=${item.wishlistItemId}`} method="POST" style={{ display: 'contents' }}>
                          <input type="hidden" name="_method" value="DELETE" />
                          <button
                            type="submit"
                            className="sg-btn-outline-dark-sm"
                            style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
                            title="Remove from Favorites"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" />
                              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Remove
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
