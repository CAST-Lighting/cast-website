"use client"
import { forwardRef, type Ref } from "react"
import { Check, X } from "lucide-react"

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
    paddingTop,
    paddingBottom,
    overline,
    heading,
    headingAccent,
    description,
    castTitle,
    othersTitle,
    cast1,
    cast2,
    cast3,
    cast4,
    cast5,
    other1,
    other2,
    other3,
    other4,
    other5,
  }: {
    className?: string
    bgImage?: string
    bgColor?: string
    bgOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    gradientDirection?: string
    lineHeight?: number
    paddingTop?: number
    paddingBottom?: number
    overline?: string
    heading?: string
    headingAccent?: string
    description?: string
    castTitle?: string
    othersTitle?: string
    cast1?: string
    cast2?: string
    cast3?: string
    cast4?: string
    cast5?: string
    other1?: string
    other2?: string
    other3?: string
    other4?: string
    other5?: string
  },
  ref: Ref<HTMLElement>
) {
  const bgImageUrl = bgImage
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#1a2332'

  const castAdvantages = [
    cast1 || "Solid brass & copper construction",
    cast2 || "Lifetime warranty on all fixtures",
    cast3 || "Field-serviceable LED modules",
    cast4 || "Interchangeable optics system",
    cast5 || "Direct contractor support line",
  ]

  const otherDrawbacks = [
    other1 || "Aluminum or plastic housings",
    other2 || "Limited 5-10 year warranties",
    other3 || "Sealed, non-serviceable units",
    other4 || "Fixed beam angles only",
    other5 || "Generic customer support",
  ]

  return (
    <section
      ref={ref}
      className={`relative ${className || ""}`}
      style={{ ...(!bgImageUrl ? { background: sectionBackground } : {}), '--section-line-height': lineHeight, paddingTop: paddingTop ?? 96, paddingBottom: paddingBottom ?? 96 } as React.CSSProperties}
    >
      {/* bg image layer */}
      {bgImageUrl && (
        <img src={bgImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {/* overlay layer — shown when image present */}
      {bgImageUrl && (
        <div className="absolute inset-0" style={{
          zIndex: 1,
          background: sectionBackground,
          opacity: overlayOpacity
        }} />
      )}

      {/* content — always relative z-10 */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container">
          <div className="text-center mb-4">
            <span className="overline">{overline || "CAST vs Other Brands"}</span>
          </div>
          <div className="text-center mb-14">
            <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-3">
              {heading || "Why Contractors Choose"} <span className="text-gradient-warm">{headingAccent || "CAST"}</span>
            </h2>
            <p className="section-desc max-w-xl mx-auto">
              {description || "See how CAST Lighting compares to other landscape lighting brands."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CAST */}
            <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-10 glow-warm-sm">
              <h3 className="heading-style-h3 text-primary mb-8">{castTitle || "CAST Advantages"}</h3>
              <ul className="space-y-5">
                {castAdvantages.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-size-large text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Others */}
            <div className="rounded-2xl border border-border bg-card p-10">
              <h3 className="heading-style-h3 text-muted-foreground mb-8">{othersTitle || "Other Lighting Brands"}</h3>
              <ul className="space-y-5">
                {otherDrawbacks.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                    <span className="text-size-large text-muted-foreground">{item}</span>
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
