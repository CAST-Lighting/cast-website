import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { SearchParams } from 'nuqs';
import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';

import CastSiteFooter from '~/lib/makeswift/components/cast/SiteFooter';
import { getBlog, getBlogPosts } from './page-data';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}

const defaultPostLimit = 9;

const searchParamsCache = createSearchParamsCache({
  tag: parseAsString,
  before: parseAsString,
  after: parseAsString,
  limit: parseAsInteger.withDefault(defaultPostLimit),
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const blog = await getBlog();

  return {
    title: blog?.name ?? t('title'),
    description:
      blog?.description && blog.description.length > 150
        ? `${blog.description.substring(0, 150)}...`
        : blog?.description,
  };
}

const CATEGORY_TAGS = [
  { label: 'All', value: null },
  { label: 'Installation', value: 'Installation' },
  { label: 'Product Guides', value: 'Product Guides' },
  { label: 'Design Tips', value: 'Design Tips' },
  { label: 'Case Studies', value: 'Case Studies' },
  { label: 'Industry News', value: 'Industry News' },
];

export default async function Blog(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const searchParamsParsed = searchParamsCache.parse(await props.searchParams);
  const { tag, before, after, limit } = searchParamsParsed;

  const blog = await getBlog();
  if (!blog) return notFound();

  const blogPosts = await getBlogPosts({ tag, before, after, limit });
  const posts = blogPosts?.posts ?? [];
  const pageInfo = blogPosts?.pageInfo ?? { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null };

  const buildPageUrl = (cursor: string | null, paramName: string) => {
    const qs = new URLSearchParams();
    if (tag) qs.set('tag', tag);
    if (cursor) qs.set(paramName, cursor);
    const queryString = qs.toString();
    return queryString ? `/blog?${queryString}` : '/blog';
  };

  const prevUrl = pageInfo.startCursor
    ? buildPageUrl(pageInfo.startCursor, 'before')
    : null;
  const nextUrl = pageInfo.endCursor
    ? buildPageUrl(pageInfo.endCursor, 'after')
    : null;

  return (
    <>
      <style>{`
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr; } }
        .blog-card {
          text-decoration: none;
          display: block;
          background: #2d353c;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 200ms, box-shadow 200ms, transform 200ms;
          color: inherit;
        }
        .blog-card:hover {
          border-color: rgba(0,124,176,0.45);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }
        .blog-cat-pill:hover {
          background: rgba(0,124,176,0.25);
          color: #7EBEE8;
          border-color: rgba(0,124,176,0.5);
        }
        .blog-pg-btn:hover {
          background: rgba(0,124,176,0.12);
          border-color: rgba(0,124,176,0.6);
          color: #007CB0;
        }
        .blog-back-link:hover { color: rgba(255,255,255,0.8); }
      `}</style>

      <div style={{ background: '#0f1923', minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <section style={{ background: '#1a2332', paddingTop: 96, paddingBottom: 96, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 350, background: 'radial-gradient(ellipse, rgba(0,124,176,0.1), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,124,176,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,124,176,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#007CB0', margin: '0 0 16px' }}>
              Resources &amp; Insights
            </p>
            <h1 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: '0 0 20px' }}>
              CAST Lighting Blog
            </h1>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              Lighting tips, installation guides, and industry insights for landscape professionals.
            </p>
          </div>
        </section>

        {/* ── Category Filter Pills ── */}
        <div style={{ background: '#141e2a', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '18px 0' }}>
          <div className="site-container">
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              {CATEGORY_TAGS.map(({ label, value }) => {
                const isActive = value === null ? !tag : tag === value;
                const pillHref = value ? `/blog?tag=${encodeURIComponent(value)}` : '/blog';
                return (
                  <a
                    key={label}
                    href={pillHref}
                    className={isActive ? '' : 'blog-cat-pill'}
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.09em',
                      padding: '8px 18px',
                      borderRadius: 100,
                      border: isActive ? 'none' : '1px solid rgba(255,255,255,0.18)',
                      background: isActive ? '#007CB0' : 'transparent',
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                      transition: 'all 200ms',
                    }}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Post Grid ── */}
        <div style={{ padding: '72px 0' }}>
          <div className="site-container">
            {posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 20, color: 'rgba(255,255,255,0.4)', margin: '0 0 16px' }}>
                  {tag ? `No posts found for "${tag}".` : 'No posts found.'}
                </p>
                <a
                  href="/blog"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: '#007CB0', textDecoration: 'none' }}
                >
                  View all posts &rarr;
                </a>
              </div>
            ) : (
              <div className="blog-grid">
                {posts.map((post) => {
                  const raw = post.content ?? '';
                  const excerpt = raw.length > 120 ? `${raw.slice(0, 120)}...` : raw;
                  const displayTag = tag ?? 'Insights';
                  return (
                    <a key={post.id} href={post.href} className="blog-card">
                      {/* Thumbnail */}
                      <div style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1a2e3a 0%, #0d3a4a 100%)', flexShrink: 0 }}>
                        {post.image ? (
                          <img
                            src={post.image.src}
                            alt={post.image.alt}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', inset: 0 }}>
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,124,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,124,176,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4, position: 'relative', zIndex: 1 }}>
                              <circle cx="12" cy="12" r="10" stroke="#007CB0" strokeWidth="1.5" />
                              <path d="M8 12h8M12 8v8" stroke="#007CB0" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </div>
                        )}
                        {/* Gradient overlay */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,25,35,0.55) 0%, transparent 50%)' }} />
                        {/* Category tag */}
                        <div style={{ position: 'absolute', top: 12, left: 12 }}>
                          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#fff', background: '#007CB0', padding: '3px 10px', borderRadius: 4 }}>
                            {displayTag}
                          </span>
                        </div>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: '#fff', lineHeight: 1.3, margin: 0 }}>
                          {post.title}
                        </h2>
                        {excerpt ? (
                          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.52)', lineHeight: 1.65, margin: 0 }}>
                            {excerpt}
                          </p>
                        ) : null}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>
                            {post.date}
                          </span>
                          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 700, color: '#007CB0', letterSpacing: '0.02em' }}>
                            Read More &rarr;
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}

            {/* ── Pagination ── */}
            {(prevUrl ?? nextUrl) ? (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 64 }}>
                {prevUrl ? (
                  <a
                    href={prevUrl}
                    className="blog-pg-btn"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', background: '#2d353c', border: '1px solid rgba(0,124,176,0.35)', borderRadius: 8, padding: '12px 32px', textDecoration: 'none', transition: 'all 200ms' }}
                  >
                    &larr; Previous
                  </a>
                ) : null}
                {nextUrl ? (
                  <a
                    href={nextUrl}
                    className="blog-pg-btn"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', background: '#2d353c', border: '1px solid rgba(0,124,176,0.35)', borderRadius: 8, padding: '12px 32px', textDecoration: 'none', transition: 'all 200ms' }}
                  >
                    Next &rarr;
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <section style={{ background: 'var(--color-primary, #004960)', padding: '96px 0', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(0,124,176,0.15), transparent 70%)', pointerEvents: 'none' }} />
          <div className="site-container" style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', margin: '0 0 16px' }}>
              Get Started Today
            </p>
            <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: '0 0 20px' }}>
              Ready to Elevate Your{' '}
              <span style={{ background: 'linear-gradient(135deg, #007CB0, #7EBEE8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Outdoor Lighting?
              </span>
            </h2>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 40px' }}>
              Join thousands of contractors and homeowners who trust CAST Lighting for professional-grade outdoor fixtures.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/shop" className="sg-btn-solid-md" style={{ textDecoration: 'none' }}>
                Shop Products &rarr;
              </a>
              <a href="/trade-pro" className="sg-btn-outline-md" style={{ textDecoration: 'none' }}>
                Join TradePro
              </a>
            </div>
          </div>
        </section>

        <CastSiteFooter />
      </div>
    </>
  );
}
