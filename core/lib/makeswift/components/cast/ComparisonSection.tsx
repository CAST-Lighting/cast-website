"use client"
import { forwardRef, type Ref } from "react"
import { Check, X } from "lucide-react"
import { getTheme } from "~/lib/makeswift/theme"

const FALLBACK_CAST = [
  "Solid brass & copper construction",
  "Lifetime warranty on all fixtures",
  "Field-serviceable LED modules",
  "Interchangeable optics system",
  "Direct contractor support line",
]

const FALLBACK_OTHERS = [
  "Aluminum or plastic housings",
  "Limited 5-10 year warranties",
  "Sealed, non-serviceable units",
  "Fixed beam angles only",
  "Generic customer support",
]

interface PointItem { text?: string }

const ComparisonSection = forwardRef(function ComparisonSection(
  {
    className,
    bgImage,
    bgColor,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    lineHeight,
    overline,
    heading,
    headingAccent,
    description,
    castTitle,
    othersTitle,
    castPoints,
    otherPoints,
    lightMode,
  }: {
    className?: string
    bgImage?: string
    bgColor?: string
    bgOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    gradientDirection?: string
    lineHeight?: number
    overline?: string
    heading?: string
    headingAccent?: string
    description?: string
    castTitle?: string
    othersTitle?: string
    castPoints?: PointItem[]
    otherPoints?: PointItem[]
    lightMode?: boolean
  },
  ref: Ref<HTMLElement>
) {
  const t = getTheme(lightMode ? 'light' : 'dark')
  const bgImageUrl = bgImage
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = lightMode
    ? '#F5F5F5'
    : hasGradient
      ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
      : bgColor || '#1a2332'

  const castList = (castPoints && castPoints.length > 0)
    ? castPoints.map((p) => p.text || '')
    : FALLBACK_CAST

  const otherList = (otherPoints && otherPoints.length > 0)
    ? otherPoints.map((p) => p.text || '')
    : FALLBACK_OTHERS

  return (
    <section
      ref={ref}
      className={`cast-section-default relative ${className || ""}`}
      style={{ width: '100%', ...(!bgImageUrl ? { background: sectionBackground } : {}), } as React.CSSProperties}
    >
      {bgImageUrl && (
        <img src={bgImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {bgImageUrl && (
        <div className="absolute inset-0" style={{ zIndex: 1, background: sectionBackground, opacity: overlayOpacity }} />
      )}

      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container">
          <div className="text-center mb-4">
            <span className="text-style-overline" style={{ margin: "0 0 12px", display: "block", color: "var(--cast-light-blue)" }}>{overline || "CAST vs Other Brands"}</span>
          </div>
          <div className="text-center mb-14">
            <h2 className="heading-style-h2 text-foreground mb-3" style={{ color: t.heading }}>
              {heading || "Why Contractors Choose"} <span className="text-gradient-warm">{headingAccent || "CAST"}</span>
            </h2>
            <p className="section-desc max-w-xl mx-auto" style={{ color: t.body }}>
              {description || "See how CAST Lighting compares to other landscape lighting brands."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CAST */}
            <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-10 glow-warm-sm" style={{ background: lightMode ? 'rgba(0,73,96,0.05)' : undefined, borderColor: lightMode ? 'rgba(0,73,96,0.4)' : undefined }}>
              <h3 className="heading-style-h3 text-primary mb-8" style={{ color: t.heading }}>{castTitle || "CAST Advantages"}</h3>
              <ul className="space-y-5">
                {castList.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-size-large text-foreground" style={{ color: t.body }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Others */}
            <div className="rounded-2xl border border-border bg-card p-10" style={{ background: t.cardBg, borderColor: t.cardBorder }}>
              <h3 className="heading-style-h3 text-muted-foreground mb-8" style={{ color: t.body }}>{othersTitle || "Other Lighting Brands"}</h3>
              <ul className="space-y-5">
                {otherList.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                    <span className="text-size-large text-muted-foreground" style={{ color: t.body }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default ComparisonSection
