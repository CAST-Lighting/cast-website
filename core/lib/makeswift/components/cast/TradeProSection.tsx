"use client"
import { forwardRef, type Ref } from "react"
import { DollarSign, Palette, Clock, Headphones, Star, ArrowRight } from "lucide-react"
import { getTheme, type ThemeMode } from "~/lib/makeswift/theme"

const BENEFIT_ICONS = [DollarSign, Palette, Clock, Headphones, Star]

const FALLBACK_BENEFITS = [
  { title: "Exclusive Contractor Pricing", desc: "Access wholesale pricing with volume discounts that improve your margins on every project." },
  { title: "Design Control in the Field", desc: "Interchangeable optics and adjustable fixtures let you fine-tune lighting on-site." },
  { title: "Lifetime Product Warranty", desc: "Every CAST product is backed by our industry-leading lifetime warranty—no questions asked." },
  { title: "Dedicated Support Team", desc: "Get direct access to our expert lighting designers for project planning and troubleshooting." },
]

interface BenefitItem { icon?: string; title?: string; desc?: string; href?: string }

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
    overline,
    heading,
    headingAccent,
    description,
    benefits: benefitsProp,
    btnLabel,
    btnHref,
    mode = 'dark',
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
    benefits?: BenefitItem[]
    btnLabel?: string
    btnHref?: string
    mode?: ThemeMode
  },
  ref: Ref<HTMLElement>
) {
  const t = getTheme(mode)
  const bgImageUrl = bgImage
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#1e2d3e'

  const benefits = (benefitsProp && benefitsProp.length > 0) ? benefitsProp : FALLBACK_BENEFITS

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
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.14em", color: "#7EBEE8", margin: "0 0 12px", display: "block" }}>{overline || "Benefits for Contractors & Installers"}</span>
          </div>
          <div className="text-center mb-14">
            <h2 className="heading-style-h2 text-foreground mb-3">
              {heading || "The TradePro"} <span className="text-gradient-warm">{headingAccent || "Advantage"}</span>
            </h2>
            <p className="section-desc max-w-xl mx-auto">
              {description || "Access professional products with lifetime warranties that give you design control in the field."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length] as React.ElementType
              const cardClass = "p-6 rounded-xl border border-border bg-secondary/30 hover:border-primary/30 transition-all duration-200 ease-in group"
              const cardStyle = b.href ? { textDecoration: "none", display: "block", cursor: "pointer" } : undefined
              const inner = (
                <>
                  <div className="icon-box mb-5 group-hover:bg-primary/20 transition-colors duration-200 ease-in">
                    {b.icon
                      ? <img src={b.icon} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
                      : <Icon className="w-6 h-6 text-primary" />}
                  </div>
                  <h3 className="heading-style-h3 text-foreground mb-2">{b.title}</h3>
                  <p className="text-size-small text-muted-foreground leading-relaxed">{b.desc}</p>
                </>
              )
              return b.href
                ? <a key={i} href={b.href} className={cardClass} style={cardStyle}>{inner}</a>
                : <div key={i} className={cardClass}>{inner}</div>
            })}
          </div>

          <div className="text-center">
            <a href={btnHref || "/trade-pro"} className={t.btnPrimary}>
              {btnLabel || "Learn More About TradePro"} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
})

export default TradeProSection
