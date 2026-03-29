import { Metadata } from 'next';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { SearchParams } from 'nuqs/server';

import { getSessionCustomerAccessToken } from '~/auth';
import { pricesTransformer } from '~/data-transformers/prices-transformer';
import { pageInfoTransformer } from '~/data-transformers/page-info-transformer';
import { getPreferredCurrencyCode } from '~/lib/currency';

import { fetchFacetedSearch, PublicToPrivateParams } from '../fetch-faceted-search';

import { getSearchPageData } from './page-data';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Faceted.Search' });

  return { title: t('title') };
}

/* ─── Price display helper ──────────────────────────────────────── */
function PriceDisplay({ price }: { price?: string | { type: string; minValue?: string; maxValue?: string; previousValue?: string; currentValue?: string } }) {
  if (!price) return <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>—</span>;

  if (typeof price === 'string') {
    return <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>{price}</span>;
  }

  if (price.type === 'range') {
    return (
      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>
        {price.minValue} – {price.maxValue}
      </span>
    );
  }

  if (price.type === 'sale') {
    return (
      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: 14 }}>{price.previousValue}</span>
        <span style={{ color: '#7EBEE8' }}>{price.currentValue}</span>
      </span>
    );
  }

  return null;
}

/* ─── Main Search Page ──────────────────────────────────────────── */
export default async function Search(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const searchParams = await props.searchParams;
  const searchTerm = typeof searchParams.term === 'string' ? searchParams.term : '';
  const currentSort = typeof searchParams.sort === 'string' ? searchParams.sort : 'featured';

  const format = await getFormatter();
  const t = await getTranslations('Faceted');
  const customerAccessToken = await getSessionCustomerAccessToken();
  const currencyCode = await getPreferredCurrencyCode();
  const { settings } = await getSearchPageData();

  /* ─── Sort options ─── */
  const sortOptions = [
    { value: 'featured', label: t('SortBy.featuredItems') },
    { value: 'newest', label: t('SortBy.newestItems') },
    { value: 'best_selling', label: t('SortBy.bestSellingItems') },
    { value: 'a_to_z', label: t('SortBy.aToZ') },
    { value: 'z_to_a', label: t('SortBy.zToA') },
    { value: 'best_reviewed', label: t('SortBy.byReview') },
    { value: 'lowest_price', label: t('SortBy.priceAscending') },
    { value: 'highest_price', label: t('SortBy.priceDescending') },
    { value: 'relevance', label: t('SortBy.relevance') },
  ];

  /* ─── No search term ─── */
  if (!searchTerm) {
    return (
      <>
        <style>{castSearchStyles}</style>
        <div className="cast-search-hero">
          <div className="site-container">
            <p className="cast-search-hero-label">Search</p>
            <h1 className="cast-search-hero-title">Enter a search term</h1>
            <p className="cast-search-hero-count">Start typing to find products</p>
          </div>
        </div>
        <div style={{ background: '#25262d', minHeight: 400, padding: '64px 0' }}>
          <div className="site-container" style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.6)' }}>
              Use the search bar above to find products.
            </p>
          </div>
        </div>
      </>
    );
  }

  /* ─── Fetch data ─── */
  const search = await fetchFacetedSearch(
    { ...searchParams },
    currencyCode,
    customerAccessToken,
  );

  const totalItems = search.products.collectionInfo?.totalItems ?? 0;
  const pageInfo = pageInfoTransformer(search.products.pageInfo);

  /* ─── Transform products ─── */
  const products = search.products.items.map((product) => ({
    id: product.entityId.toString(),
    title: product.name,
    href: product.path,
    image: product.defaultImage
      ? { src: product.defaultImage.url, alt: product.defaultImage.altText }
      : undefined,
    price: pricesTransformer(product.prices, format),
    subtitle: product.brand?.name ?? undefined,
  }));

  /* ─── Transform facets for sidebar ─── */
  const { filters: parsedFilters } = PublicToPrivateParams.parse(searchParams);
  const facets = search.facets.items;

  /* ─── Build filter URL helper ─── */
  function buildFilterUrl(paramName: string, value: string, isActive: boolean): string {
    const params = new URLSearchParams();

    // Preserve existing params
    for (const [key, val] of Object.entries(searchParams)) {
      if (key === paramName) continue; // We'll re-add this
      if (key === 'before' || key === 'after') continue; // Reset pagination on filter change
      if (typeof val === 'string') params.append(key, val);
      if (Array.isArray(val)) val.forEach((v) => params.append(key, v));
    }

    if (paramName === 'isFeatured') {
      if (!isActive) params.set('isFeatured', value);
      // If active, we just don't add it (remove)
    } else {
      // For multi-value params like brand, categoryIn, etc.
      const existing = searchParams[paramName];
      const existingArr = Array.isArray(existing) ? existing : existing ? [existing] : [];

      if (isActive) {
        // Remove this value
        existingArr.filter((v) => v !== value).forEach((v) => params.append(paramName, String(v)));
      } else {
        // Add this value
        [...existingArr, value].forEach((v) => params.append(paramName, String(v)));
      }
    }

    return `?${params.toString()}`;
  }

  function buildSortUrl(sortValue: string): string {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(searchParams)) {
      if (key === 'sort') continue;
      if (typeof val === 'string') params.append(key, val);
      if (Array.isArray(val)) val.forEach((v) => params.append(key, v));
    }
    if (sortValue !== 'featured') params.set('sort', sortValue);
    return `?${params.toString()}`;
  }

  function buildPageUrl(cursor: string, direction: 'after' | 'before'): string {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(searchParams)) {
      if (key === 'before' || key === 'after') continue;
      if (typeof val === 'string') params.append(key, val);
      if (Array.isArray(val)) val.forEach((v) => params.append(key, v));
    }
    params.set(direction, cursor);
    return `?${params.toString()}`;
  }

  /* ─── Render filter sections ─── */
  function renderFacets() {
    return facets.map((facet) => {
      if (facet.__typename === 'BrandSearchFilter') {
        const brands = 'brands' in facet ? facet.brands : [];
        if (!Array.isArray(brands) || brands.length === 0) return null;

        return (
          <div key={facet.displayName} className="cast-filter-section">
            <p className="cast-filter-label">{facet.displayName}</p>
            {brands.map((brand: { entityId: number; name: string; productCount: number; isSelected: boolean }) => {
              const isActive = parsedFilters.brandEntityIds?.includes(brand.entityId) === true;
              return (
                <a
                  key={brand.entityId}
                  href={buildFilterUrl('brand', brand.entityId.toString(), isActive)}
                  className={`cast-filter-item ${isActive ? 'active' : ''}`}
                >
                  <span className="cast-filter-check">{isActive ? '✓' : ''}</span>
                  <span>{brand.name}</span>
                  <span className="cast-filter-count">({brand.productCount})</span>
                </a>
              );
            })}
          </div>
        );
      }

      if (facet.__typename === 'CategorySearchFilter') {
        const categories = 'categories' in facet ? facet.categories : [];
        if (!Array.isArray(categories) || categories.length === 0) return null;

        return (
          <div key={facet.displayName} className="cast-filter-section">
            <p className="cast-filter-label">{facet.displayName}</p>
            {categories.map((cat: { entityId: number; name: string; productCount: number; isSelected: boolean }) => {
              const isActive = parsedFilters.categoryEntityIds?.includes(cat.entityId) === true;
              return (
                <a
                  key={cat.entityId}
                  href={buildFilterUrl('categoryIn', cat.entityId.toString(), isActive)}
                  className={`cast-filter-item ${isActive ? 'active' : ''}`}
                >
                  <span className="cast-filter-check">{isActive ? '✓' : ''}</span>
                  <span>{cat.name}</span>
                  <span className="cast-filter-count">({cat.productCount})</span>
                </a>
              );
            })}
          </div>
        );
      }

      if (facet.__typename === 'ProductAttributeSearchFilter' && 'attributes' in facet) {
        const attributes = facet.attributes;
        if (!Array.isArray(attributes) || attributes.length === 0) return null;
        const filterKey = 'filterKey' in facet ? facet.filterKey : '';
        const paramName = `attr_${filterKey}`;

        return (
          <div key={facet.displayName} className="cast-filter-section">
            <p className="cast-filter-label">{facet.displayName}</p>
            {attributes.map((attr: { value: string; productCount: number; isSelected: boolean }) => {
              const existing = searchParams[paramName];
              const existingArr = Array.isArray(existing) ? existing : existing ? [String(existing)] : [];
              const isActive = existingArr.includes(attr.value);
              return (
                <a
                  key={attr.value}
                  href={buildFilterUrl(paramName, attr.value, isActive)}
                  className={`cast-filter-item ${isActive ? 'active' : ''}`}
                >
                  <span className="cast-filter-check">{isActive ? '✓' : ''}</span>
                  <span>{attr.value}</span>
                  <span className="cast-filter-count">({attr.productCount})</span>
                </a>
              );
            })}
          </div>
        );
      }

      if (facet.__typename === 'PriceSearchFilter') {
        return (
          <div key={facet.displayName} className="cast-filter-section">
            <p className="cast-filter-label">{facet.displayName}</p>
            <form className="cast-price-filter" method="get">
              {/* Preserve existing params */}
              {Object.entries(searchParams).map(([key, val]) => {
                if (key === 'minPrice' || key === 'maxPrice' || key === 'before' || key === 'after') return null;
                if (typeof val === 'string') return <input key={key} type="hidden" name={key} value={val} />;
                if (Array.isArray(val)) return val.map((v, i) => <input key={`${key}-${i}`} type="hidden" name={key} value={v} />);
                return null;
              })}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  defaultValue={parsedFilters.price?.minPrice ?? ''}
                  className="cast-price-input"
                />
                <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Barlow', sans-serif" }}>–</span>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  defaultValue={parsedFilters.price?.maxPrice ?? ''}
                  className="cast-price-input"
                />
              </div>
              <button type="submit" className="sg-btn-solid-dark-sm" style={{ width: '100%', marginTop: 8, justifyContent: 'center', fontSize: 12 }}>
                Apply
              </button>
            </form>
          </div>
        );
      }

      if (facet.__typename === 'OtherSearchFilter') {
        const sections: JSX.Element[] = [];

        if ('isFeatured' in facet && facet.isFeatured) {
          const isActive = parsedFilters.isFeatured === true;
          sections.push(
            <div key="isFeatured" className="cast-filter-section">
              <p className="cast-filter-label">Is Featured</p>
              <a
                href={buildFilterUrl('isFeatured', 'on', isActive)}
                className={`cast-filter-item ${isActive ? 'active' : ''}`}
              >
                <span className="cast-filter-check">{isActive ? '✓' : ''}</span>
                <span>Featured Products</span>
                {'isFeatured' in facet && facet.isFeatured && typeof facet.isFeatured === 'object' && 'productCount' in facet.isFeatured && (
                  <span className="cast-filter-count">({(facet.isFeatured as { productCount: number }).productCount})</span>
                )}
              </a>
            </div>
          );
        }

        if ('isInStock' in facet && facet.isInStock) {
          const isActive = parsedFilters.hideOutOfStock === true;
          sections.push(
            <div key="isInStock" className="cast-filter-section">
              <p className="cast-filter-label">Availability</p>
              <a
                href={buildFilterUrl('stock', 'in_stock', isActive)}
                className={`cast-filter-item ${isActive ? 'active' : ''}`}
              >
                <span className="cast-filter-check">{isActive ? '✓' : ''}</span>
                <span>In Stock</span>
              </a>
            </div>
          );
        }

        if ('freeShipping' in facet && facet.freeShipping) {
          const isActive = parsedFilters.isFreeShipping === true;
          sections.push(
            <div key="freeShipping" className="cast-filter-section">
              <p className="cast-filter-label">Shipping</p>
              <a
                href={buildFilterUrl('shipping', 'free_shipping', isActive)}
                className={`cast-filter-item ${isActive ? 'active' : ''}`}
              >
                <span className="cast-filter-check">{isActive ? '✓' : ''}</span>
                <span>Free Shipping</span>
              </a>
            </div>
          );
        }

        return sections.length > 0 ? <>{sections}</> : null;
      }

      return null;
    });
  }

  /* ─── Check if any filters are active ─── */
  const hasActiveFilters = !!(
    parsedFilters.brandEntityIds?.length ||
    parsedFilters.categoryEntityIds?.length ||
    parsedFilters.isFeatured ||
    parsedFilters.hideOutOfStock ||
    parsedFilters.isFreeShipping ||
    parsedFilters.price?.minPrice ||
    parsedFilters.price?.maxPrice ||
    parsedFilters.productAttributes?.length
  );

  function buildClearFiltersUrl(): string {
    const params = new URLSearchParams();
    if (searchTerm) params.set('term', searchTerm);
    if (currentSort !== 'featured') params.set('sort', currentSort);
    return `?${params.toString()}`;
  }

  return (
    <>
      <style>{castSearchStyles}</style>

      {/* ─── Hero Section ─── */}
      <div className="cast-search-hero">
        <div className="site-container">
          <p className="cast-search-hero-label">Search Results</p>
          <h1 className="cast-search-hero-title">&ldquo;{searchTerm}&rdquo;</h1>
          <p className="cast-search-hero-count">
            {format.number(totalItems)} {totalItems === 1 ? 'product' : 'products'} found
          </p>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div style={{ background: '#25262d', minHeight: 600 }} className="cast-search-main">
        <div className="site-container" style={{ paddingTop: 48, paddingBottom: 64 }}>
          <div className="cast-search-layout">

            {/* ─── Sidebar ─── */}
            <aside className="cast-sidebar">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 className="cast-sidebar-title">Filters</h2>
                {hasActiveFilters && (
                  <a href={buildClearFiltersUrl()} className="cast-clear-filters">
                    Clear All
                  </a>
                )}
              </div>
              {renderFacets()}
            </aside>

            {/* ─── Products Area ─── */}
            <div className="cast-products-area">

              {/* ─── Toolbar ─── */}
              <div className="cast-toolbar">
                <p className="cast-toolbar-count">
                  Showing {products.length} of {format.number(totalItems)} results
                </p>
                <div className="cast-sort-wrapper">
                  <label htmlFor="cast-sort" className="cast-sort-label">Sort by:</label>
                  {/* Sort is link-based for server component */}
                  <div className="cast-sort-select-wrapper">
                    {sortOptions.map((opt) => (
                      <a
                        key={opt.value}
                        href={buildSortUrl(opt.value)}
                        className={`cast-sort-option ${currentSort === opt.value ? 'active' : ''}`}
                        style={{ display: currentSort === opt.value ? 'inline-flex' : 'none' }}
                      >
                        {opt.label} ▾
                      </a>
                    ))}
                    <div className="cast-sort-dropdown">
                      {sortOptions.map((opt) => (
                        <a
                          key={opt.value}
                          href={buildSortUrl(opt.value)}
                          className={`cast-sort-dropdown-item ${currentSort === opt.value ? 'active' : ''}`}
                        >
                          {opt.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Empty State ─── */}
              {products.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                  <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 28, color: '#fff', marginBottom: 12 }}>
                    No products found
                  </h2>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
                    Try adjusting your search or filters to find what you&apos;re looking for.
                  </p>
                  {hasActiveFilters && (
                    <a href={buildClearFiltersUrl()} className="sg-btn-outline-dark-md" style={{ textDecoration: 'none' }}>
                      Clear All Filters
                    </a>
                  )}
                </div>
              )}

              {/* ─── Product Grid ─── */}
              {products.length > 0 && (
                <div className="cast-product-grid">
                  {products.map((product) => (
                    <div key={product.id} className="cast-product-card">
                      {/* Image */}
                      <a href={product.href} className="cast-product-image-link">
                        <div className="cast-product-image-wrapper">
                          {product.image ? (
                            <img
                              src={product.image.src}
                              alt={product.image.alt}
                              className="cast-product-image"
                              loading="lazy"
                            />
                          ) : (
                            <div className="cast-product-placeholder">
                              <div className="cast-product-placeholder-grid" />
                              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5, position: 'relative', zIndex: 1 }}>
                                <circle cx="12" cy="12" r="10" stroke="#007CB0" strokeWidth="1.5" />
                                <path d="M8 12h8M12 8v8" stroke="#007CB0" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </a>
                      {/* Details */}
                      <div className="cast-product-details">
                        {product.subtitle && (
                          <p className="cast-product-category">{product.subtitle}</p>
                        )}
                        <a href={product.href} style={{ textDecoration: 'none' }}>
                          <p className="cast-product-title">{product.title}</p>
                        </a>
                        <PriceDisplay price={product.price as any} />
                        <a
                          href={product.href}
                          className="sg-btn-solid-md cast-product-btn"
                        >
                          View Product →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ─── Pagination ─── */}
              {(pageInfo.startCursor || pageInfo.endCursor) && (
                <div className="cast-pagination">
                  {pageInfo.startCursor ? (
                    <a
                      href={buildPageUrl(pageInfo.startCursor, 'before')}
                      className="sg-btn-outline-dark-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      ← Previous
                    </a>
                  ) : (
                    <span />
                  )}
                  {pageInfo.endCursor ? (
                    <a
                      href={buildPageUrl(pageInfo.endCursor, 'after')}
                      className="sg-btn-outline-dark-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      Next →
                    </a>
                  ) : (
                    <span />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Styles ────────────────────────────────────────────────────── */
const castSearchStyles = `
  /* Hero */
  .cast-search-hero {
    background: linear-gradient(135deg, #0f1923 0%, #1a2e3a 50%, #0d4a5c 100%);
    padding: 64px 0 56px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cast-search-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(175,229,253,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(175,229,253,0.03) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }
  .cast-search-hero-label {
    font-family: 'Barlow', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #007CB0;
    margin: 0 0 12px;
    position: relative;
  }
  .cast-search-hero-title {
    font-family: 'Essonnes', 'Playfair Display', serif;
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 400;
    color: #fff;
    margin: 0 0 12px;
    line-height: 1.15;
    position: relative;
  }
  .cast-search-hero-count {
    font-family: 'Barlow', sans-serif;
    font-size: 16px;
    color: rgba(255,255,255,0.6);
    margin: 0;
    position: relative;
  }

  /* Layout */
  .cast-search-layout {
    display: flex;
    gap: 32px;
    align-items: flex-start;
  }

  /* Sidebar */
  .cast-sidebar {
    width: 240px;
    flex-shrink: 0;
    background: #2d353c;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 24px;
    position: sticky;
    top: 100px;
    align-self: flex-start;
  }
  .cast-sidebar-title {
    font-family: 'Barlow', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }
  .cast-clear-filters {
    font-family: 'Barlow', sans-serif;
    font-size: 12px;
    color: #7EBEE8;
    text-decoration: none;
    font-weight: 600;
    transition: color 200ms;
  }
  .cast-clear-filters:hover { color: #fff; }

  .cast-filter-section {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .cast-filter-section:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  .cast-filter-label {
    font-family: 'Barlow', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.5);
    margin: 0 0 10px;
  }
  .cast-filter-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    color: rgba(255,255,255,0.8);
    padding: 5px 0;
    text-decoration: none;
    transition: color 200ms;
    cursor: pointer;
  }
  .cast-filter-item:hover { color: #fff; }
  .cast-filter-item.active { color: #7EBEE8; font-weight: 600; }
  .cast-filter-check {
    width: 18px;
    height: 18px;
    border: 1.5px solid rgba(255,255,255,0.25);
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    flex-shrink: 0;
    color: #007CB0;
    transition: border-color 200ms, background 200ms;
  }
  .cast-filter-item.active .cast-filter-check {
    border-color: #007CB0;
    background: rgba(0,124,176,0.15);
  }
  .cast-filter-count {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    margin-left: auto;
  }

  /* Price filter */
  .cast-price-input {
    width: 100%;
    box-sizing: border-box;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 4px;
    padding: 8px 10px;
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    color: #fff;
    outline: none;
    transition: border-color 200ms;
  }
  .cast-price-input:focus { border-color: #007CB0; }
  .cast-price-input::placeholder { color: rgba(255,255,255,0.3); }

  /* Products area */
  .cast-products-area {
    flex: 1;
    min-width: 0;
  }

  /* Toolbar */
  .cast-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .cast-toolbar-count {
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    margin: 0;
  }
  .cast-sort-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .cast-sort-label {
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.5);
  }
  .cast-sort-select-wrapper {
    position: relative;
  }
  .cast-sort-option {
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    background: #2d353c;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 4px;
    padding: 6px 14px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .cast-sort-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 4px;
    background: #2d353c;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    z-index: 100;
    min-width: 180px;
    overflow: hidden;
  }
  .cast-sort-select-wrapper:hover .cast-sort-dropdown {
    display: block;
  }
  .cast-sort-select-wrapper:hover .cast-sort-option {
    display: inline-flex !important;
    border-color: rgba(255,255,255,0.25);
  }
  .cast-sort-dropdown-item {
    display: block;
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.8);
    padding: 10px 16px;
    text-decoration: none;
    transition: background 150ms, color 150ms;
  }
  .cast-sort-dropdown-item:hover {
    background: rgba(0,124,176,0.15);
    color: #fff;
  }
  .cast-sort-dropdown-item.active {
    color: #7EBEE8;
    font-weight: 600;
  }

  /* Product Grid */
  .cast-product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* Product Card */
  .cast-product-card {
    background: #2d353c;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: border-color 200ms, box-shadow 200ms;
  }
  .cast-product-card:hover {
    border-color: rgba(0,124,176,0.4);
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  }

  .cast-product-image-link {
    display: block;
    text-decoration: none;
  }
  .cast-product-image-wrapper {
    aspect-ratio: 4/3;
    position: relative;
    overflow: hidden;
    background: #1a2a34;
  }
  .cast-product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 300ms;
  }
  .cast-product-card:hover .cast-product-image {
    transform: scale(1.03);
  }
  .cast-product-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a2e3a 0%, #0d4a5c 50%, #1a3a4a 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
  }
  .cast-product-placeholder-grid {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(175,229,253,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(175,229,253,0.04) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .cast-product-details {
    padding: 18px 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .cast-product-category {
    font-family: 'Barlow', sans-serif;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #007CB0;
    margin: 0;
  }
  .cast-product-title {
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    margin: 0;
    line-height: 1.35;
    transition: color 200ms;
  }
  .cast-product-card:hover .cast-product-title {
    color: #7EBEE8;
  }
  .cast-product-btn {
    margin-top: auto;
    text-align: center;
    text-decoration: none;
    justify-content: center;
    display: flex;
  }

  /* Pagination */
  .cast-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  /* Responsive */
  @media (max-width: 1100px) {
    .cast-product-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 900px) {
    .cast-search-layout { flex-direction: column; }
    .cast-sidebar {
      width: 100%;
      position: static;
    }
  }
  @media (max-width: 575px) {
    .cast-product-grid { grid-template-columns: 1fr; }
    .cast-toolbar { flex-direction: column; align-items: flex-start; }
  }
`;
