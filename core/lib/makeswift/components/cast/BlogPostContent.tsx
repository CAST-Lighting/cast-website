"use client"
import { forwardRef, type Ref } from "react"

interface BlogPostContentProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
  // Post meta
  postTitle?: string
  postDate?: string
  authorName?: string
  authorRole?: string
  readTime?: string
  // Tags
  tag1?: string
  tag2?: string
  tag3?: string
  // Content
  bodyText?: string
  // CTA
  ctaHeading?: string
  ctaBody?: string
  cta1Label?: string
  cta1Href?: string
  cta2Label?: string
  cta2Href?: string
}

const BlogPostContent = forwardRef(function BlogPostContent(
  {
    className,
    bgColor,
    paddingTop = 64,
    paddingBottom = 96,
    postTitle,
    postDate,
    authorName,
    authorRole,
    readTime,
    tag1,
    tag2,
    tag3,
    bodyText,
    ctaHeading,
    ctaBody,
    cta1Label,
    cta1Href,
    cta2Label,
    cta2Href,
  }: BlogPostContentProps,
  ref: Ref<HTMLElement>
) {
  const tags = [tag1, tag2, tag3].filter(Boolean) as string[]

  return (
    <section
      ref={ref}
      className={`relative ${className || ""}`}
      style={{ background: bgColor || '#0f1923', paddingTop, paddingBottom }}
    >
      <div className="site-container" style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* ── Meta row ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          {/* Author avatar */}
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #007CB0, #7EBEE8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="1.5"/>
              <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>
              {authorName || 'CAST Lighting Team'}
            </p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              {authorRole || 'Lighting Expert'}{postDate ? ` · ${postDate}` : ''}{readTime ? ` · ${readTime} read` : ''}
            </p>
          </div>
          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', flexWrap: 'wrap' }}>
              {tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  color: '#007CB0',
                  background: 'rgba(0,124,176,0.12)',
                  border: '1px solid rgba(0,124,176,0.25)',
                  borderRadius: 100, padding: '4px 12px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Post title ── */}
        {postTitle && (
          <h1 style={{
            fontFamily: "'Essonnes', 'Playfair Display', serif",
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 700, color: '#fff',
            lineHeight: 1.15, margin: '0 0 36px',
          }}>
            {postTitle}
          </h1>
        )}

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 40 }} />

        {/* ── Body text ── */}
        <div style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 17, lineHeight: 1.85,
          color: 'rgba(255,255,255,0.72)',
          whiteSpace: 'pre-line',
        }}>
          {bodyText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.'}
        </div>

        {/* ── CTA block ── */}
        {(ctaHeading || cta1Label) && (
          <div style={{
            marginTop: 64, padding: '40px 36px',
            background: '#014960',
            borderRadius: 12,
            border: '1px solid rgba(0,124,176,0.2)',
          }}>
            {ctaHeading && (
              <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>
                {ctaHeading}
              </h3>
            )}
            {ctaBody && (
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 28px' }}>
                {ctaBody}
              </p>
            )}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {cta1Label && (
                <a href={cta1Href || '#'} className="sg-btn-solid-dark-md" style={{ textDecoration: 'none' }}>
                  {cta1Label}
                </a>
              )}
              {cta2Label && (
                <a href={cta2Href || '#'} className="sg-btn-outline-dark-md" style={{ textDecoration: 'none' }}>
                  {cta2Label}
                </a>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  )
})

export default BlogPostContent
