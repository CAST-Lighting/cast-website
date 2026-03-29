"use client"
import { forwardRef, type Ref } from "react"
import { useCmsData } from "~/lib/makeswift/cms-context"

export interface CmsBlogBodyProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
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
<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
<h3>Installation Best Practices</h3>
<p>When planning your low-voltage lighting layout, always start with a site survey. Map out existing landscaping features, note power source locations, and identify areas that need the most illumination.</p>
<p>Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
`

const BP_PROSE_STYLES = `
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
`

const AuthorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="1.5" />
    <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const CmsBlogBody = forwardRef(function CmsBlogBody(
  {
    className,
    bgColor = "#0f1923",
    paddingTop = 56,
    paddingBottom = 80,
  }: CmsBlogBodyProps,
  ref: Ref<HTMLElement>
) {
  const cms = useCmsData()

  // CMS values or placeholders
  const htmlBody = cms?.meta?.htmlBody || PLACEHOLDER_HTML
  const featuredImage = cms?.meta?.featuredImage || null
  const author = cms?.meta?.author || "CAST Lighting Team"
  const date = cms?.meta?.date || "March 15, 2025"
  const tags: string[] = cms?.meta?.tags || ["Landscape Lighting", "Design Tips", "Installation"]
  const blogPath = "/blog"

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={className || ""} style={{ background: bgColor, minHeight: 200 }}>
      <style>{BP_PROSE_STYLES}</style>

      {/* Featured Image */}
      {featuredImage && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.35)" }}>
            <img
              src={featuredImage}
              alt=""
              style={{ width: "100%", display: "block", maxHeight: 480, objectFit: "cover" }}
            />
          </div>
        </div>
      )}

      {/* Post Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: `${paddingTop}px 24px ${paddingBottom}px` }}>
        <div
          className="bp-prose"
          dangerouslySetInnerHTML={{ __html: htmlBody }}
        />

        {/* Tags Row */}
        {tags.length > 0 && (
          <div style={{
            marginTop: 52,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}>
            <span style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(255,255,255,0.38)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              flexShrink: 0,
            }}>
              Tagged:
            </span>
            {tags.map((tagLabel) => (
              <a
                key={tagLabel}
                href={`${blogPath}?tag=${encodeURIComponent(tagLabel)}`}
                className="bp-tag"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#007CB0",
                  background: "rgba(0,124,176,0.1)",
                  border: "1px solid rgba(0,124,176,0.22)",
                  borderRadius: 100,
                  padding: "5px 14px",
                  textDecoration: "none",
                  transition: "all 200ms",
                }}
              >
                {tagLabel}
              </a>
            ))}
          </div>
        )}

        {/* Author Bio Card */}
        <div style={{
          marginTop: 44,
          background: "#2d353c",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #007CB0, #7EBEE8)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <AuthorIcon />
          </div>
          <div>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              margin: 0,
            }}>
              {author}
            </p>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
              margin: "3px 0 0",
            }}>
              {cms ? "CAST Lighting Team" : "Content Author · CAST Lighting"}
            </p>
          </div>
        </div>

        {/* More from the Blog */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <a
            href={blogPath}
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#007CB0",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              border: "1px solid rgba(0,124,176,0.3)",
              borderRadius: 8,
              transition: "all 200ms",
            }}
          >
            More from the Blog &rarr;
          </a>
        </div>
      </div>
    </div>
  )
})

export default CmsBlogBody
