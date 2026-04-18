import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFormatter, setRequestLocale } from 'next-intl/server';

import { getBlogPageData } from './page-data';

interface Props {
  params: Promise<{
    locale: string;
    blogId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogId } = await params;
  const blog = await getBlogPageData(blogId);
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
  const blog = await getBlogPageData(blogId);
  const blogPost = blog?.post;

  if (!blog || !blogPost) return notFound();

  const formattedDate = format.dateTime(new Date(blogPost.publishedDate.utc));
  const thumbSrc = blogPost.thumbnailImage?.url ?? null;
  const thumbAlt = blogPost.thumbnailImage?.altText ?? blogPost.name;
  const authorName = blogPost.author ?? 'CAST Lighting Team';

  // Always use the code layout — Makeswift /blog-post template only shows placeholder
  // text since Makeswift components cannot consume the dynamic data props.
  // Real post content from BigCommerce CMS is rendered below.
  return (
    <>
      <style>{`
        .bp-prose h1, .bp-prose h2, .bp-prose h3, .bp-prose h4 {
          font-family: 'Essonnes', 'Playfair Display', serif;
          color: #fff;
          line-height: 1.3;
          margin: 1.6em 0 0.6em;
        }
        .bp-prose h1 { font-size: var(--h1-size); }
        .bp-prose h2 { font-size: var(--h2-size); border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.4em; }
        .bp-prose h3 { font-size: var(--h3-size); }
        .bp-prose h4 { font-size: var(--h4-size); color: rgba(255,255,255,0.85); }
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
        .bp-prose a { color: #007CB0; text-decoration: underline; }
        .bp-prose a:hover { color: #7EBEE8; }
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
          border-left: 3px solid #007CB0;
          margin: 1.5em 0;
          padding: 0.6em 1.5em;
          background: rgba(0,124,176,0.07);
          border-radius: 0 6px 6px 0;
        }
        .bp-prose blockquote p { color: rgba(255,255,255,0.85); font-style: italic; margin: 0; }
        .bp-prose pre {
          font-family: 'Courier New', monospace;
          background: rgba(0,0,0,0.45);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          font-size: 14px;
          color: #007CB0;
          padding: 1.2em 1.4em;
          overflow-x: auto;
          margin: 1.4em 0;
        }
        .bp-prose code {
          font-family: 'Courier New', monospace;
          background: rgba(0,0,0,0.35);
          border-radius: 4px;
          font-size: 14px;
          color: #007CB0;
          padding: 2px 7px;
        }
        .bp-prose pre code { background: none; padding: 0; border-radius: 0; }
        .bp-prose table { width: 100%; border-collapse: collapse; margin: 1.5em 0; font-family: 'Barlow', sans-serif; font-size: 15px; }
        .bp-prose th { background: rgba(0,124,176,0.12); color: #fff; padding: 10px 14px; text-align: left; border-bottom: 2px solid rgba(0,124,176,0.3); }
        .bp-prose td { color: rgba(255,255,255,0.7); padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .bp-tag:hover { background: rgba(0,124,176,0.25); color: #7EBEE8; border-color: rgba(0,124,176,0.5); }
      `}</style>

      <div style={{ background: '#0f1923', minHeight: '100vh' }}>

        {/* ── Post Content ── */}
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px 80px' }}>
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
              {blogPost.tags.map((tagLabel: string) => (
                <a
                  key={tagLabel}
                  href={`${blog.path}?tag=${encodeURIComponent(tagLabel)}`}
                  className="bp-tag"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#007CB0',
                    background: 'rgba(0,124,176,0.1)',
                    border: '1px solid rgba(0,124,176,0.22)',
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
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #007CB0, #7EBEE8)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: '#007CB0', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', border: '1px solid rgba(0,124,176,0.3)', borderRadius: 8, transition: 'all 200ms' }}
            >
              More from the Blog &rarr;
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
