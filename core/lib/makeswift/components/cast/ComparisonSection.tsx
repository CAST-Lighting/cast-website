"use client"

import { forwardRef, type Ref } from "react"
import { Check, X } from "lucide-react"

export interface ComparisonItem {
  title?: string
  description?: string
}

export interface ComparisonSectionProps {
  className?: string
  sectionStyle?: string
  subtitle?: string
  heading?: string
  description?: string
  castItems?: ComparisonItem[]
  otherItems?: ComparisonItem[]
  castHeading?: string
  otherHeading?: string
  bgImage?: string
  bgColor?: string
  overlayColor?: string
  overlayOpacity?: number
  castCardBgColor?: string
  otherCardBgColor?: string
}

const defaultCastItems = [
  "Solid brass & copper construction",
  "Lifetime warranty on all fixtures",
  "Field-serviceable LED modules",
  "Interchangeable optics system",
  "Direct contractor support line",
]

const defaultOtherItems = [
  "Aluminum or plastic housings",
  "Limited 5-10 year warranties",
  "Sealed, non-serviceable units",
  "Fixed beam angles only",
  "Generic customer support",
]

const ComparisonSection = forwardRef(function ComparisonSection(
  {
    className,
    sectionStyle,
    subtitle = "CAST vs Other Brands",
    heading = "Why Contractors Choose CAST",
    description = "See how CAST Lighting compares to other landscape lighting brands.",
    castItems,
    otherItems,
    castHeading = "CAST Advantages",
    otherHeading = "Other Lighting Brands",
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
    castCardBgColor,
    otherCardBgColor,
  }: ComparisonSectionProps,
  ref: Ref<HTMLElement>
) {
  // Use title strings from props or defaults
  const castList = (castItems && castItems.length > 0
    ? castItems.map(i => i.title || "")
    : defaultCastItems
  ).filter(Boolean)

  const otherList = (otherItems && otherItems.length > 0
    ? otherItems.map(i => i.title || "")
    : defaultOtherItems
  ).filter(Boolean)

  return (
    <section
      ref={ref}
      className={`py-24 bg-gradient-dark relative ${sectionStyle || ""} ${className || ""}`}
    >
      {bgImage && (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      {overlayColor && (overlayOpacity ?? 0) > 0 && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100 }}
        />
      )}

      <div className="site-container relative z-10">
        <div className="text-center mb-4">
          <span className="overline">{subtitle}</span>
        </div>
        <div className="text-center mb-14">
          <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-3">
            Why Contractors Choose <span className="text-gradient-warm">CAST</span>
          </h2>
          <p className="section-desc max-w-xl mx-auto">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CAST */}
          <div
            className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-10 glow-warm-sm"
            style={castCardBgColor ? { background: castCardBgColor } : undefined}
          >
            <h3 className="heading-style-h3 text-primary mb-8">{castHeading}</h3>
            <ul className="space-y-5">
              {castList.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-base text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Others */}
          <div
            className="rounded-2xl border border-border bg-card p-10"
            style={otherCardBgColor ? { background: otherCardBgColor } : undefined}
          >
            <h3 className="heading-style-h3 text-muted-foreground mb-8">{otherHeading}</h3>
            <ul className="space-y-5">
              {otherList.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-base text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
})

export default ComparisonSection
