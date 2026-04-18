"use client"
import { forwardRef, type Ref } from "react"
import { ArrowRight } from "lucide-react"
import { getTheme, type ThemeMode } from "~/lib/makeswift/theme"

interface ReadyCTAProps {
  className?: string
  paddingTop?: number
  paddingBottom?: number
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  overline?: string
  heading?: string
  headingAccent?: string
  body?: string
  btn1Label?: string
  btn1Href?: string
  btn2Label?: string
  btn2Href?: string
  mode?: ThemeMode
}

const ReadyCTA = forwardRef(function ReadyCTA(
  {
    className,
    paddingTop = 80,
    paddingBottom = 80,
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    overline = "Get Started Today",
    heading = "Ready to Upgrade Your",
    headingAccent = "Outdoor Lighting?",
    body = "Join thousands of contractors and homeowners who trust CAST Lighting for professional-grade outdoor fixtures. Apply for TradePro pricing or shop our full catalog today.",
    btn1Label = "Shop Products",
    btn1Href = "/shop",
    btn2Label = "Join TradePro",
    btn2Href = "/trade-pro",
    mode = 'dark',
  }: ReadyCTAProps,
  ref: Ref<HTMLElement>
) {
  const t = getTheme(mode)
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === "number" ? bgOpacity / 100 : 0.88
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || "135deg"}, ${gradientFrom}, ${gradientTo})`
    : bgColor || "var(--color-primary, #004960)"

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{
        paddingTop, paddingBottom,
        ...(!bgImage ? { background: sectionBackground } : {}),
      }}
    >
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
      )}
      {bgImage && (
        <div
          className="absolute inset-0"
          style={{ zIndex: 1, background: sectionBackground, opacity: overlayOpacity }}
        />
      )}

      {/* Decorative glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 300,
          background: "radial-gradient(ellipse, rgba(0,124,176,0.15), transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container" style={{ textAlign: "center", maxWidth: 720 }}>
          {overline && (
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: t.subtle,
              margin: "0 0 16px",
            }}>
              {overline}
            </p>
          )}

          <h2 style={{
            fontFamily: "'Essonnes', 'Playfair Display', serif",
            fontSize: "var(--h2-size)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: t.heading,
            margin: "0 0 20px",
          }}>
            {heading}{" "}
            <span style={{
              background: "linear-gradient(135deg, #007CB0, #7EBEE8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {headingAccent}
            </span>
          </h2>

          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 17,
            color: t.body,
            lineHeight: 1.7,
            margin: "0 0 40px",
          }}>
            {body}
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={btn1Href} className={t.btnPrimary} style={{ textDecoration: "none" }}>
              {btn1Label} <ArrowRight style={{ width: 16, height: 16 }} />
            </a>
            {btn2Label && (
              <a href={btn2Href} className={t.btnOutline} style={{ textDecoration: "none" }}>
                {btn2Label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
})

export default ReadyCTA
