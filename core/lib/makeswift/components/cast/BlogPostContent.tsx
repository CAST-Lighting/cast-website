"use client"
import { forwardRef, type Ref, useState } from "react"

interface RelatedPost {
  title?: string
  href?: string
  image?: string
  category?: string
}

interface BlogPostContentProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
  // Post meta
  postTitle?: string
  postDate?: string
  category?: string
  categoryHref?: string
  authorName?: string
  authorRole?: string
  readTime?: string
  // Audio
  audioUrl?: string
  audioLabel?: string
  // Tags
  tag1?: string
  tag2?: string
  tag3?: string
  // Featured image
  featuredImage?: string
  featuredImageAlt?: string
  // Body
  bodyText?: string
  // Social share
  shareUrl?: string
  showShare?: boolean
  // CTA
  ctaHeading?: string
  ctaBody?: string
  cta1Label?: string
  cta1Href?: string
  cta2Label?: string
  cta2Href?: string
  // Related posts
  related1Title?: string
  related1Href?: string
  related1Category?: string
  related2Title?: string
  related2Href?: string
  related2Category?: string
  related3Title?: string
  related3Href?: string
  related3Category?: string
}

const BlogPostContent = forwardRef(function BlogPostContent(
  {
    className,
    bgColor,
    paddingTop = 64,
    paddingBottom = 96,
    postTitle,
    postDate,
    category,
    categoryHref,
    authorName,
    authorRole,
    readTime,
    audioUrl,
    audioLabel,
    tag1, tag2, tag3,
    featuredImage,
    featuredImageAlt,
    bodyText,
    shareUrl,
    showShare = true,
    ctaHeading,
    ctaBody,
    cta1Label, cta1Href,
    cta2Label, cta2Href,
    related1Title, related1Href, related1Category,
    related2Title, related2Href, related2Category,
    related3Title, related3Href, related3Category,
  }: BlogPostContentProps,
  ref: Ref<HTMLElement>
) {
  const [audioPlaying, setAudioPlaying] = useState(false)
  const tags = [tag1, tag2, tag3].filter(Boolean) as string[]
  const relatedPosts = [
    { title: related1Title, href: related1Href, category: related1Category },
    { title: related2Title, href: related2Href, category: related2Category },
    { title: related3Title, href: related3Href, category: related3Category },
  ].filter(p => p.title) as RelatedPost[]

  const pageUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : '#')
  const encodedUrl = encodeURIComponent(pageUrl)
  const encodedTitle = encodeURIComponent(postTitle || 'CAST Lighting Blog')

  return (
    <section
      ref={ref}
      className={`relative ${className || ""}`}
      style={{ background: bgColor || '#0f1923', paddingTop, paddingBottom }}
    >
      <div className="site-container">

        {/* ── Category breadcrumb ── */}
        {category && (
          <div style={{ marginBottom: 20 }}>
            <a
              href="/blog"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
            >
              Blog
            </a>
            <span style={{ color: 'rgba(255,255,255,0.25)', margin: '0 8px' }}>/</span>
            <a
              href={categoryHref || '/blog'}
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: '#007CB0', textDecoration: 'none', fontWeight: 600 }}
            >
              {category}
            </a>
          </div>
        )}

        {/* ── Post title ── */}
        <h1 style={{
          fontFamily: "'Essonnes', 'Playfair Display', serif",
          fontSize: 'clamp(26px, 4vw, 48px)',
          fontWeight: 700, color: '#fff',
          lineHeight: 1.15, margin: '0 0 20px',
        }}>
          {postTitle || 'Heading Goes Here'}
        </h1>

        {/* ── Meta row: date · category · read time ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          {postDate && (
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
              {postDate}
            </span>
          )}
          {category && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
              <a href={categoryHref || '/blog'} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: '#007CB0', textDecoration: 'none', fontWeight: 600 }}>
                {category}
              </a>
            </>
          )}
          {readTime && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
                {readTime} read
              </span>
            </>
          )}
        </div>

        {/* ── Share + Author row ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #007CB0, #7EBEE8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="1.5"/>
                <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>
                {authorName || 'CAST Lighting Team'}
              </p>
              {authorRole && (
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                  {authorRole}
                </p>
              )}
            </div>
          </div>

          {/* Social share */}
          {showShare && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginRight: 4 }}>Share</span>
              {/* Facebook */}
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="nofollow noreferrer"
                style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 200ms' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Twitter/X */}
              <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="nofollow noreferrer"
                style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M4 4l16 16M4 20 20 4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><text display="none">X</text></svg>
              </a>
              {/* LinkedIn */}
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="nofollow noreferrer"
                style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" fill="#fff"/></svg>
              </a>
              {/* Copy link */}
              <button
                onClick={() => { navigator.clipboard?.writeText(pageUrl) }}
                style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
            </div>
          )}
        </div>

        {/* ── Audio player ── */}
        {audioUrl && (
          <div style={{ marginBottom: 36, padding: '20px 24px', background: 'rgba(0,124,176,0.08)', border: '1px solid rgba(0,124,176,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setAudioPlaying(!audioPlaying)}
              style={{ width: 44, height: 44, borderRadius: '50%', background: '#007CB0', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >
              {audioPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              )}
            </button>
            <div>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 700, color: '#7EBEE8', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {audioLabel || 'Prefer to listen instead?'}
              </p>
              <audio src={audioUrl} style={{ width: '100%', maxWidth: 400, height: 32, marginTop: 4 }} controls />
            </div>
          </div>
        )}

        {/* ── Featured image ── */}
        {featuredImage && (
          <div style={{ marginBottom: 40, borderRadius: 12, overflow: 'hidden' }}>
            <img src={featuredImage} alt={featuredImageAlt || postTitle || 'Featured image'} style={{ width: '100%', display: 'block', maxHeight: 520, objectFit: 'cover' }} />
          </div>
        )}

        {/* ── Tags ── */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                color: '#007CB0',
                background: 'rgba(0,124,176,0.1)',
                border: '1px solid rgba(0,124,176,0.25)',
                borderRadius: 100, padding: '5px 14px',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Body text ── */}
        <div style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 17, lineHeight: 1.85,
          color: 'rgba(255,255,255,0.72)',
          whiteSpace: 'pre-line',
          marginBottom: 48,
        }}>
          {bodyText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'}
        </div>

        {/* ── Bottom share row ── */}
        {showShare && (
          <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 48, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginRight: 8 }}>Share this post</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="nofollow noreferrer"
              style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="nofollow noreferrer"
              style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M4 4l16 16M4 20 20 4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="nofollow noreferrer"
              style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" fill="#fff"/></svg>
            </a>
          </div>
        )}

        {/* ── CTA block ── */}
        {(ctaHeading || cta1Label) && (
          <div style={{ marginBottom: 64, padding: '40px 36px', background: '#014960', borderRadius: 12, border: '1px solid rgba(0,124,176,0.2)' }}>
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
              {cta1Label && <a href={cta1Href || '#'} className="sg-btn-solid-dark-md" style={{ textDecoration: 'none' }}>{cta1Label}</a>}
              {cta2Label && <a href={cta2Href || '#'} className="sg-btn-outline-dark-md" style={{ textDecoration: 'none' }}>{cta2Label}</a>}
            </div>
          </div>
        )}

        {/* ── Related posts ── */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 24px' }}>
              Related Posts
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(relatedPosts.length, 3)}, 1fr)`, gap: 20 }}>
              {relatedPosts.map((post, i) => (
                <a key={i} href={post.href || '#'} style={{ textDecoration: 'none', background: '#1a2332', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', display: 'block', transition: 'border-color 200ms' }}>
                  <div style={{ padding: '20px 20px 16px' }}>
                    {post.category && (
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#007CB0', margin: '0 0 8px' }}>
                        {post.category}
                      </p>
                    )}
                    <p style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.4 }}>
                      {post.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
})

export default BlogPostContent
