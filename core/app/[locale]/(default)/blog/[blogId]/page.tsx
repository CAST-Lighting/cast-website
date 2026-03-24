import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFormatter, setRequestLocale } from 'next-intl/server';
import { cache } from 'react';

import { getBlogPageData } from './page-data';

const cachedBlogPageDataVariables = cache((blogId: string) => ({ entityId: Number(blogId) }));

interface Props {
  params: Promise<{
    locale: string;
    blogId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogId } = await params;
  const variables = cachedBlogPageDataVariables(blogId);
  const blog = await getBlogPageData(variables);
  const blogPost = blog?.post;

  if (!blogPost) return {};

  const { pageTitle, metaDescription, metaKeywords } = blogPost.seo;

  return {
    title: pageTitle || blogPost.name,
    description: metaDescription,
    keywords: metaKeywords ? metaKeywords.split(',') : null,
  };
}

export default async function BlogPost(props: Props) {
  const { locale, blogId } = await props.params;
  setRequestLocale(locale);

  const format = await getFormatter();
  const variables = cachedBlogPageDataVariables(blogId);
  const blog = await getBlogPageData(variables);
  const blogPost = blog?.post;

  if (!blog || !blogPost) return notFound();

  const formattedDate = format.dateTime(new Date(blogPost.publishedDate.utc));
  const thumbSrc = blogPost.thumbnailImage?.url ?? null;
  const thumbAlt = blogPost.thumbnailImage?.altText ?? blogPost.name;
  const authorName = blogPost.author ?? 'CAST Lighting Team';

  return (
    <>
      <style>{`
        .bp-prose h1, .bp-prose h2, .bp-prose h3, .bp-prose h4 {
          font-family: 'Essonnes', 'Playfair Display', serif;
          color: #fff;
          line-height: 1.3;
          margin: 1.6em 0 0.6em;
        }
        .bp-prose h1 { font-size: 2em; }
        .bp-prose h2 { font-size: 1.55em; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.4em; }
        .bp-prose h3 { font-size: 1.25em; }
        .bp-prose h4 { font-size: 1.05em; color: rgba(255,255,255,0.85); }
        .bp-prose p {
          font-family: 'Barlow', sans-serif;
          font-size: 17px;
          color: rgba(255,255,255,0.72);
          line-height: 1.85;
          margin: 0 0 1.3em;
        }
        .bp-prose img {
          width: 100%;
          border-radius: 8px;
          margin: 1.5em 0;
          display: block;
        }
        .bp-prose a { color: #c8972a; text-decoration: underline; }
        .bp-prose a:hover { color: #e8b84b; }
        .bp-prose ul, .bp-prose ol {
          font-family: 'Barlow', sans-serif;
          font-size: 17px;
          color: rgba(255,255,255,0.72);
          padding-left: 1.6em;
          margin: 0 0 1.3em;
          line-height: 1.85;
        }
        .bp-prose li { margin-bottom: 0.35em; }
        .bp-prose blockquote {
          border-left: 3px solid #c8972a;
          margin: 1.5em 0;
          padding: 0.6em 1.5em;
          background: rgba(200,151,42,0.07);
          border-radius: 0 6px 6px 0;
        }
        .bp-prose blockquote p { color: rgba(255,255,255,0.85); font-style: italic; margin: 0; }
        .bp-prose pre {
          font-family: 'Courier New', monospace;
          background: rgba(0,0,0,0.45);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          font-size: 14px;
          color: #c8972a;
          padding: 1.2em 1.4em;
          overflow-x: auto;
          margin: 1.4em 0;
        }
        .bp-prose code {
          font-family: 'Courier New', monospace;
          background: rgba(0,0,0,0.35);
          border-radius: 4px;
          font-size: 14px;
          color: #c8972a;
          padding: 2px 7px;
        }
        .bp-prose pre code { background: none; padding: 0; border-radius: 0; }
        .bp-prose table { width: 100%; border-collapse: collapse; margin: 1.5em 0; font-family: 'Barlow', sans-serif; font-size: 15px; }
        .bp-prose th { background: rgba(200,151,42,0.12); color: #fff; padding: 10px 14px; text-align: left; border-bottom: 2px solid rgba(200,151,42,0.3); }
        .bp-prose td { color: rgba(255,255,255,0.7); padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .bp-tag:hover { background: rgba(200,151,42,0.25); color: #e8b84b; border-color: rgba(200,151,42,0.5); }
      `}</style>

      <div style={{ background: '#0f1923', minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <section style={{ background: '#1a2332', paddingTop: 72, paddingBottom: 64, position: 'relative', overflow: 'hidden' }}>
          {thumbSrc ? (
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${thumbSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
          ) : null}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,35,50,0.6) 0%, #1a2332 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,151,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,151,42,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

          <div className="site-container" style={{ position: 'relative', zIndex: 1, maxWidth: 860 }}>
            {/* Back link */}
            <a
              href={blog.path}
              className="bp-tag"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 36, transition: 'color 200ms' }}
            >
              &larr; Back to Blog
            </a>

            {/* Tag pills */}
            {blogPost.tags.length > 0 ? (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
                {blogPost.tags.map((tagLabel) => (
                  <a
                    key={tagLabel}
                    href={`${blog.path}?tag=${encodeURIComponent(tagLabel)}`}
                    className="bp-tag"
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#c8972a',
                      background: 'rgba(200,151,42,0.12)',
                      border: '1px solid rgba(200,151,42,0.25)',
                      borderRadius: 100,
                      padding: '4px 13px',
                      textDecoration: 'none',
                      transition: 'all 200ms',
                    }}
                  >
                    {tagLabel}
                  </a>
                ))}
              </div>
            ) : null}

            <h1 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 700, color: '#fff', lineHeight: 1.12, margin: '0 0 28px' }}>
              {blogPost.name}
            </h1>

            <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #c8972a, #e8b84b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="1.5" />
                    <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                  {authorName}
                </span>
              </div>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.38)' }}>
                {formattedDate}
              </span>
            </div>
          </div>
        </section>

        {/* ── Featured thumbnail (pulls out of hero) ── */}
        {thumbSrc ? (
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ marginTop: -32, borderRadius: 10, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,0.35)' }}>
              <img
                src={thumbSrc}
                alt={thumbAlt}
                style={{ width: '100%', display: 'block', maxHeight: 480, objectFit: 'cover' }}
              />
            </div>
          </div>
        ) : null}

        {/* ── Post Content ── */}
        <div style={{ maxWidth: 860, margin: '0 auto', padding: thumbSrc ? '56px 24px 80px' : '64px 24px 80px' }}>
          <div
            className="bp-prose"
            dangerouslySetInnerHTML={{ __html: blogPost.htmlBody }}
          />

          {/* ── Tags row ── */}
          {blogPost.tags.length > 0 ? (
            <div style={{ marginTop: 52, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0 }}>
                Tagged:
              </span>
              {blogPost.tags.map((tagLabel) => (
                <a
                  key={tagLabel}
                  href={`${blog.path}?tag=${encodeURIComponent(tagLabel)}`}
                  className="bp-tag"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#c8972a',
                    background: 'rgba(200,151,42,0.1)',
                    border: '1px solid rgba(200,151,42,0.22)',
                    borderRadius: 100,
                    padding: '5px 14px',
                    textDecoration: 'none',
                    transition: 'all 200ms',
                  }}
                >
                  {tagLabel}
                </a>
              ))}
            </div>
          ) : null}

          {/* ── Author Bio ── */}
          <div style={{ marginTop: 44, background: '#2d353c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #c8972a, #e8b84b)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="1.5" />
                <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>
                {authorName}
              </p>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: '3px 0 0' }}>
                CAST Lighting Team
              </p>
            </div>
          </div>

          {/* ── More from Blog ── */}
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <a
              href={blog.path}
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: '#c8972a', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', border: '1px solid rgba(200,151,42,0.3)', borderRadius: 8, transition: 'all 200ms' }}
            >
              More from the Blog &rarr;
            </a>
          </div>
        </div>

        {/* ── TradePro CTA ── */}
        <section style={{ background: 'var(--color-primary, #004960)', padding: '96px 0', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(200,151,42,0.15), transparent 70%)', pointerEvents: 'none' }} />
          <div className="site-container" style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', margin: '0 0 16px' }}>
              Get Started Today
            </p>
            <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: '0 0 20px' }}>
              Ready to Elevate Your{' '}
              <span style={{ background: 'linear-gradient(135deg, #c8972a, #e8b84b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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

      </div>
    </>
  );
}
