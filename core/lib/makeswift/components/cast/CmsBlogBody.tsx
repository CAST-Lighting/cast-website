"use client"
import { forwardRef, type Ref } from "react"
import { useCmsData } from "~/lib/makeswift/cms-context"

export interface CmsBlogBodyProps {
  className?: string
  bgColor?: string
}

const PLACEHOLDER_HTML = `
<h2>The Future of Outdoor Lighting Design</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<h3>Key Considerations for Your Next Project</h3>
<ul>
  <li>Choose fixtures rated for your specific environment — IP67 minimum for ground-level installations</li>
  <li>Calculate transformer capacity before purchasing — factor in wire run distances</li>
  <li>Consider color temperature carefully — 2700K for warm residential, 3000K for modern commercial</li>
</ul>
<blockquote><p>Great landscape lighting isn't about making things bright — it's about creating depth, contrast, and atmosphere.</p></blockquote>
<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
<h3>Installation Best Practices</h3>
<p>When planning your low-voltage lighting layout, always start with a site survey. Map out existing landscaping features, note power source locations, and identify areas that need the most illumination.</p>
`

const PROSE_STYLES = `
  .bp-prose h1, .bp-prose h2, .bp-prose h3, .bp-prose h4 {
    font-family: 'Essonnes', 'Playfair Display', serif;
    color: #fff; line-height: 1.3; margin: 1.6em 0 0.6em;
  }
  .bp-prose h1 { font-size: 2em; }
  .bp-prose h2 { font-size: 1.55em; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.4em; }
  .bp-prose h3 { font-size: 1.25em; }
  .bp-prose h4 { font-size: 1.05em; color: rgba(255,255,255,0.85); }
  .bp-prose p { font-family: 'Barlow', sans-serif; font-size: 17px; color: rgba(255,255,255,0.72); line-height: 1.85; margin: 0 0 1.3em; }
  .bp-prose img { width: 100%; border-radius: 8px; margin: 1.5em 0; display: block; }
  .bp-prose a { color: #007CB0; text-decoration: underline; }
  .bp-prose a:hover { color: #7EBEE8; }
  .bp-prose ul { font-family: 'Barlow', sans-serif; font-size: 17px; color: rgba(255,255,255,0.72); padding-left: 1.6em !important; margin: 0 0 1.3em !important; line-height: 1.85; list-style: disc outside !important; }
  .bp-prose ol { font-family: 'Barlow', sans-serif; font-size: 17px; color: rgba(255,255,255,0.72); padding-left: 1.6em !important; margin: 0 0 1.3em !important; line-height: 1.85; list-style: decimal outside !important; }
  .bp-prose li { margin-bottom: 0.35em !important; display: list-item !important; list-style: inherit !important; }
  .bp-prose ul ul { list-style: circle outside !important; }
  .bp-prose blockquote { border-left: 3px solid #007CB0; margin: 1.5em 0; padding: 0.6em 1.5em; background: rgba(0,124,176,0.07); border-radius: 0 6px 6px 0; }
  .bp-prose blockquote p { color: rgba(255,255,255,0.85); font-style: italic; margin: 0; }
  .bp-prose pre { font-family: 'Courier New', monospace; background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; font-size: 14px; color: #007CB0; padding: 1.2em 1.4em; overflow-x: auto; margin: 1.4em 0; }
  .bp-prose code { font-family: 'Courier New', monospace; background: rgba(0,0,0,0.35); border-radius: 4px; font-size: 14px; color: #007CB0; padding: 2px 7px; }
  .bp-prose pre code { background: none; padding: 0; }
  .bp-prose table { width: 100%; border-collapse: collapse; margin: 1.5em 0; font-family: 'Barlow', sans-serif; font-size: 15px; }
  .bp-prose th { background: rgba(0,124,176,0.12); color: #fff; padding: 10px 14px; text-align: left; border-bottom: 2px solid rgba(0,124,176,0.3); }
  .bp-prose td { color: rgba(255,255,255,0.7); padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .bp-share-btn { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15); background: none; cursor: pointer; transition: border-color 150ms, background 150ms; color: rgba(255,255,255,0.6); text-decoration: none; }
  .bp-share-btn:hover { border-color: #007CB0; background: rgba(0,124,176,0.12); color: #7EBEE8; }
  .bp-tag { font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 600; color: #007CB0; background: rgba(0,124,176,0.1); border: 1px solid rgba(0,124,176,0.22); border-radius: 100px; padding: 5px 14px; text-decoration: none; transition: all 200ms; }
  .bp-tag:hover { background: rgba(0,124,176,0.25); color: #7EBEE8; border-color: rgba(0,124,176,0.5); }
  .bp-audio { width: 100%; outline: none; }
  .bp-audio::-webkit-media-controls-panel { background: #1e2a33; }
`

// Social share icons
const ShareIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "facebook": return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    case "twitter":  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.4 5.4 3.9 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
    case "linkedin": return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
    case "pinterest": return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.45.84-2.53 1.87-2.53.88 0 1.31.66 1.31 1.46 0 .89-.57 2.22-.86 3.46-.25 1.03.51 1.87 1.52 1.87 1.82 0 3.05-2.34 3.05-5.11 0-2.11-1.42-3.59-3.46-3.59-2.36 0-3.74 1.77-3.74 3.59 0 .71.27 1.47.62 1.88.07.08.08.15.06.23l-.23.94c-.04.14-.12.17-.27.1-1-.47-1.63-1.93-1.63-3.1 0-2.52 1.83-4.83 5.28-4.83 2.77 0 4.93 1.98 4.93 4.62 0 2.76-1.74 4.98-4.15 4.98-.81 0-1.57-.42-1.83-.92l-.5 1.86c-.18.69-.66 1.56-1 2.08.75.23 1.55.36 2.37.36 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
    case "email":    return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
    default: return null
  }
}

const CmsBlogBody = forwardRef(function CmsBlogBody(
  {
    className,
    bgColor = "#0f1923",
  }: CmsBlogBodyProps,
  ref: Ref<HTMLElement>
) {
  const cms = useCmsData()

  const htmlBody      = cms?.meta?.htmlBody     || PLACEHOLDER_HTML
  const featuredImage = cms?.meta?.featuredImage || null
  const author        = cms?.meta?.author        || "CAST Lighting Team"
  const date          = cms?.meta?.date          || "March 15, 2025"
  const tags: string[] = cms?.meta?.tags         || ["Landscape Lighting", "Design Tips", "Installation"]
  const audioUrl      = cms?.meta?.audioUrl      || null
  const readTime      = cms?.meta?.readTime      || "5 min read"
  const category      = cms?.meta?.category      || "Landscape Lighting"
  const categorySlug  = cms?.meta?.categorySlug  || "landscape-lighting"
  const title         = cms?.heading             || "Blog Post Title"
  const blogPath      = "/blog"

  // Build share URLs (uses window.location on client — safe since this is "use client")
  const pageUrl = typeof window !== "undefined" ? window.location.href : ""
  const encodedUrl = encodeURIComponent(pageUrl)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    { type: "facebook",  href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { type: "twitter",   href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { type: "linkedin",  href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}` },
    { type: "pinterest", href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}` },
    { type: "email",     href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ]

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={`cast-cms-blog-body-defaults ${className || ""}`} style={{ background: bgColor, minHeight: 200 }}>
      <style>{`
        .cast-cms-blog-body-defaults { padding-top: 56px; padding-bottom: 80px; }
        @media (max-width: 1024px) { .cast-cms-blog-body-defaults { padding-top: 44px; padding-bottom: 64px; } }
        @media (max-width: 768px)  { .cast-cms-blog-body-defaults { padding-top: 36px; padding-bottom: 52px; } }
        @media (max-width: 640px)  { .cast-cms-blog-body-defaults { padding-top: 30px; padding-bottom: 44px; } }
      `}</style>
      <style>{PROSE_STYLES}</style>

      {/* Featured Image */}
      {featuredImage && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.35)" }}>
            <img src={featuredImage} alt={title} style={{ width: "100%", display: "block", maxHeight: 480, objectFit: "cover" }} />
          </div>
        </div>
      )}

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* Post header — title, date, category, read time */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h2-size)", fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: "0 0 12px" }}>
            {title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              {date}
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>•</span>
            <a href={`${blogPath}/category/${categorySlug}`} style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, fontWeight: 700, color: "#007CB0", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              {category}
            </a>
            {readTime && (
              <>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>•</span>
                <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{readTime}</span>
              </>
            )}
          </div>
        </div>

        {/* Share + Audio row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 36, paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Share buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Share Post
            </span>
            {shareLinks.map(({ type, href }) => (
              <a key={type} href={href} target="_blank" rel="noopener noreferrer" className="bp-share-btn" aria-label={`Share on ${type}`}>
                <ShareIcon type={type} />
              </a>
            ))}
          </div>

          {/* Audio player */}
          {audioUrl && (
            <div style={{ background: "rgba(0,124,176,0.07)", border: "1px solid rgba(0,124,176,0.2)", borderRadius: 8, padding: "12px 16px", minWidth: 240, flex: "0 0 auto" }}>
              <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>
                Prefer to listen instead?
              </p>
              <audio controls className="bp-audio" style={{ width: "100%", height: 32 }}>
                <source src={audioUrl} />
                Your browser does not support the audio tag.
              </audio>
            </div>
          )}

          {/* Audio placeholder in editor */}
          {!audioUrl && !cms && (
            <div style={{ background: "rgba(0,124,176,0.07)", border: "1px solid rgba(0,124,176,0.15)", borderRadius: 8, padding: "12px 16px", minWidth: 220 }}>
              <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>
                Prefer to listen instead?
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#007CB0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="#fff"><path d="M0 0l10 6-10 6V0z"/></svg>
                </div>
                <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, position: "relative" }}>
                  <div style={{ width: "40%", height: "100%", background: "#007CB0", borderRadius: 2 }} />
                </div>
                <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>0:00 / 9:55</span>
              </div>
            </div>
          )}
        </div>

        {/* Body HTML */}
        <div className="bp-prose" dangerouslySetInnerHTML={{ __html: htmlBody }} />

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ marginTop: 52, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", flexShrink: 0 }}>
              Tagged:
            </span>
            {tags.map((tag) => (
              <a key={tag} href={`${blogPath}?tag=${encodeURIComponent(tag)}`} className="bp-tag">{tag}</a>
            ))}
          </div>
        )}

        {/* Share row — bottom repeat */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Share this post
          </span>
          {shareLinks.map(({ type, href }) => (
            <a key={type} href={href} target="_blank" rel="noopener noreferrer" className="bp-share-btn" aria-label={`Share on ${type}`}>
              <ShareIcon type={type} />
            </a>
          ))}
        </div>

        {/* Author Bio */}
        <div style={{ marginTop: 40, background: "#2d353c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "24px 28px", display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #007CB0, #7EBEE8)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="1.5" />
              <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", margin: 0 }}>{author}</p>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", margin: "3px 0 0" }}>CAST Lighting Team</p>
          </div>
        </div>

        {/* Back to blog */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <a href={blogPath} style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, fontWeight: 600, color: "#007CB0", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", border: "1px solid rgba(0,124,176,0.3)", borderRadius: 8, transition: "all 200ms" }}>
            More from the Blog →
          </a>
        </div>

      </div>
    </div>
  )
})

export default CmsBlogBody
