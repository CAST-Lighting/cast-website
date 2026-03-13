"use client"
import { forwardRef, type Ref } from "react"
import { Check, X } from "lucide-react"

const castAdvantages = [
  "Solid brass & copper construction",
  "Lifetime warranty on all fixtures",
  "Field-serviceable LED modules",
  "Interchangeable optics system",
  "Direct contractor support line",
]

const otherDrawbacks = [
  "Aluminum or plastic housings",
  "Limited 5-10 year warranties",
  "Sealed, non-serviceable units",
  "Fixed beam angles only",
  "Generic customer support",
]

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
  },
  ref: Ref<HTMLElement>
) {
  const bgImageUrl = bgImage
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const hasGradient = !!(gradientFrom && gradientTo)

  const sectionBg: React.CSSProperties = bgImageUrl
    ? {}
    : hasGradient
    ? { background: `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})` }
    : { background: bgColor || '#1a2332' }

  return (
    <section
      ref={ref}
      className={`relative ${className || ""}`}
      style={{ ...sectionBg, '--section-line-height': lineHeight, paddingTop: paddingTop ?? 96, paddingBottom: paddingBottom ?? 96 } as React.CSSProperties}
    >
      {/* bg image layer */}
      {bgImageUrl && (
        <img src={bgImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {/* overlay layer — shown when image present */}
      {bgImageUrl && (
        <div className="absolute inset-0" style={{
          zIndex: 1,
          background: hasGradient
            ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
            : bgColor || '#014960',
          opacity: overlayOpacity
        }} />
      )}

      {/* content — always relative z-10 */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-4">
            <span className="overline">CAST vs Other Brands</span>
          </div>
          <div className="text-center mb-14">
            <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-3">
              Why Contractors Choose <span className="text-gradient-warm">CAST</span>
            </h2>
            <p className="section-desc max-w-xl mx-auto">
              See how CAST Lighting compares to other landscape lighting brands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CAST */}
            <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-10 glow-warm-sm">
              <h3 className="heading-style-h3 text-primary mb-8">CAST Advantages</h3>
              <ul className="space-y-5">
                {castAdvantages.map((item) => (
                  <li key={item} className="flex items-start gap-4">
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
              <h3 className="heading-style-h3 text-muted-foreground mb-8">Other Lighting Brands</h3>
              <ul className="space-y-5">
                {otherDrawbacks.map((item) => (
                  <li key={item} className="flex items-start gap-4">
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
