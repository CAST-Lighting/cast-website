"use client"
import { forwardRef, type Ref } from "react"
import { DollarSign, Palette, Clock, Headphones, ArrowRight } from "lucide-react"

const benefitIcons = [DollarSign, Palette, Clock, Headphones]

const TradeProSection = forwardRef(function TradeProSection(
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
    benefit1Title,
    benefit1Desc,
    benefit2Title,
    benefit2Desc,
    benefit3Title,
    benefit3Desc,
    benefit4Title,
    benefit4Desc,
    btnLabel,
    btnHref,
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
    benefit1Title?: string
    benefit1Desc?: string
    benefit2Title?: string
    benefit2Desc?: string
    benefit3Title?: string
    benefit3Desc?: string
    benefit4Title?: string
    benefit4Desc?: string
    btnLabel?: string
    btnHref?: string
  },
  ref: Ref<HTMLElement>
) {
  const bgImageUrl = bgImage
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#1e2d3e'

  const benefits = [
    {
      icon: benefitIcons[0],
      title: benefit1Title || "Exclusive Contractor Pricing",
      desc: benefit1Desc || "Access wholesale pricing with volume discounts that improve your margins on every project.",
    },
    {
      icon: benefitIcons[1],
      title: benefit2Title || "Design Control in the Field",
      desc: benefit2Desc || "Interchangeable optics and adjustable fixtures let you fine-tune lighting on-site.",
    },
    {
      icon: benefitIcons[2],
      title: benefit3Title || "Lifetime Product Warranty",
      desc: benefit3Desc || "Every CAST product is backed by our industry-leading lifetime warranty—no questions asked.",
    },
    {
      icon: benefitIcons[3],
      title: benefit4Title || "Dedicated Support Team",
      desc: benefit4Desc || "Get direct access to our expert lighting designers for project planning and troubleshooting.",
    },
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
            <span className="overline">{overline || "Benefits for Contractors & Installers"}</span>
          </div>
          <div className="text-center mb-14">
            <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-3">
              {heading || "The TradePro"} <span className="text-gradient-warm">{headingAccent || "Advantage"}</span>
            </h2>
            <p className="section-desc max-w-xl mx-auto">
              {description || "Access professional products with lifetime warranties that give you design control in the field."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-xl border border-border bg-secondary/30 hover:border-primary/30 transition-all group">
                <div className="icon-box mb-5 group-hover:bg-primary/20 transition-colors">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="card-title text-foreground mb-2">{b.title}</h3>
                <p className="text-size-small text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={btnHref || "/trade-pro"} className="sg-btn-solid-md">
              {btnLabel || "Learn More About TradePro"} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
})

export default TradeProSection
