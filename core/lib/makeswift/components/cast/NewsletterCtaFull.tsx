"use client"
import { forwardRef, type Ref, useState } from "react"
import { getTheme } from "~/lib/makeswift/theme"

interface NewsletterCtaFullProps {
  className?: string
  bgImage?: string
  bgColor?: string
  overlayColor?: string
  overlayOpacity?: number
  containerBgColor?: string
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  paddingTop?: number
  paddingBottom?: number
  heading?: string
  description?: string
  buttonText?: string
  items?: Array<{ text?: string }>
}

const DEFAULT_ITEMS = [
  { text: "New product launches & updates" },
  { text: "Exclusive contractor offers" },
  { text: "Project inspiration & guides" },
]

const NewsletterCtaFull = forwardRef(function NewsletterCtaFull(
  {
    className,
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
    containerBgColor,
    gradientFrom,
    gradientTo,
    gradientDirection,
    paddingTop = 96,
    paddingBottom = 96,
    heading = "Stay in the Loop",
    description = "Get the latest on new products, contractor resources, and exclusive offers delivered straight to your inbox.",
    buttonText = "Subscribe",
    items,
  }: NewsletterCtaFullProps,
  ref: Ref<HTMLElement>
) {
  const t = getTheme("dark")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const hasGradient = !!(gradientFrom && gradientTo)
  const sectionBg = hasGradient
    ? `linear-gradient(${gradientDirection || "to bottom"}, ${gradientFrom}, ${gradientTo})`
    : bgColor || "#25262d"

  const overlayStyle = overlayColor
    ? { background: overlayColor, opacity: typeof overlayOpacity === "number" ? overlayOpacity / 100 : 0 }
    : null

  const cardBg = containerBgColor || "#1a2332"

  const benefitItems = items && items.length > 0 ? items : DEFAULT_ITEMS

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: wire to real email service
    setSubmitted(true)
  }

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{ background: bgImage ? undefined : sectionBg, paddingTop, paddingBottom, fontFamily: "'Barlow', sans-serif" }}
    >
      {/* bg image */}
      {bgImage && (
        <img src={bgImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
      )}
      {/* overlay */}
      {overlayStyle && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, ...overlayStyle }} />
      )}
      {/* bg color over image when both present */}
      {bgImage && !overlayColor && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: sectionBg, opacity: 0.7 }} />
      )}

      <div className="site-container" style={{ position: "relative", zIndex: 10 }}>
        <div style={{
          background: cardBg,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "56px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
          boxShadow: "0 8px 48px rgba(0,0,0,0.32)",
        }}>

          {/* Left — copy */}
          <div>
            {/* Icon */}
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: "rgba(0,124,176,0.15)",
              border: "1px solid rgba(0,124,176,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 24,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7EBEE8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            <h2 style={{
              fontFamily: "'Essonnes','Playfair Display',serif",
              fontSize: "var(--h2-size, 2.25rem)",
              fontWeight: 700,
              color: t.heading,
              margin: "0 0 16px",
              lineHeight: 1.15,
            }}>
              {heading}
            </h2>
            <p style={{ fontSize: 16, color: t.body, margin: "0 0 28px", lineHeight: 1.6 }}>
              {description}
            </p>

            {/* Benefit list */}
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {benefitItems.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "rgba(0,124,176,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#7EBEE8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 14, color: t.body }}>{item.text || "Benefit item"}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "36px 32px",
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: 22, fontWeight: 700, color: t.heading, margin: "0 0 8px" }}>
                  You're in!
                </h3>
                <p style={{ fontSize: 14, color: t.subtle, margin: 0 }}>
                  Thanks for subscribing. We'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.subtle, marginBottom: 6 }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 6,
                      border: `1px solid ${t.inputBorder}`, background: t.inputBg,
                      color: t.heading, fontFamily: "'Barlow',sans-serif", fontSize: 14,
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.subtle, marginBottom: 6 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 6,
                      border: `1px solid ${t.inputBorder}`, background: t.inputBg,
                      color: t.heading, fontFamily: "'Barlow',sans-serif", fontSize: 14,
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ marginTop: 8 }}>
                  <button type="submit" className={t.btnPrimary} style={{ width: "100%", justifyContent: "center" }}>
                    {buttonText}
                  </button>
                </div>
                <p style={{ fontSize: 11, color: t.subtle, margin: 0, textAlign: "center" }}>
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nlf-inner { grid-template-columns: 1fr !important; padding: 36px 24px !important; }
        }
      `}</style>
    </section>
  )
})

export default NewsletterCtaFull
