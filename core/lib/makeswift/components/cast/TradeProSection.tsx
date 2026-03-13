"use client"

import { forwardRef, type Ref } from "react"
import { DollarSign, Palette, Clock, Headphones, ArrowRight } from "lucide-react"

export interface TradeProCard {
  icon?: string
  title?: string
  description?: string
}

export interface TradeProSectionProps {
  className?: string
  sectionStyle?: string
  subtitle?: string
  heading?: string
  description?: string
  cards?: TradeProCard[]
  buttonText?: string
  buttonHref?: string
  bgImage?: string
  bgColor?: string
  overlayColor?: string
  overlayOpacity?: number
}

const defaultBenefits = [
  { icon: DollarSign, title: "Exclusive Contractor Pricing", desc: "Access wholesale pricing with volume discounts that improve your margins on every project." },
  { icon: Palette, title: "Design Control in the Field", desc: "Interchangeable optics and adjustable fixtures let you fine-tune lighting on-site." },
  { icon: Clock, title: "Lifetime Product Warranty", desc: "Every CAST product is backed by our industry-leading lifetime warranty—no questions asked." },
  { icon: Headphones, title: "Dedicated Support Team", desc: "Get direct access to our expert lighting designers for project planning and troubleshooting." },
]

const TradeProSection = forwardRef(function TradeProSection(
  {
    className,
    sectionStyle,
    subtitle = "Benefits for Contractors & Installers",
    heading = "The TradePro Advantage",
    description = "Access professional products with lifetime warranties that give you design control in the field.",
    cards,
    buttonText = "Learn More About TradePro",
    buttonHref = "#",
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
  }: TradeProSectionProps,
  ref: Ref<HTMLElement>
) {
  // Use default benefits (with lucide icons), falling back to prop cards for title/desc
  const benefits = defaultBenefits.map((b, i) => ({
    Icon: b.icon,
    title: cards?.[i]?.title || b.title,
    desc: cards?.[i]?.description || b.desc,
  }))

  return (
    <section
      ref={ref}
      className={`py-24 bg-card relative ${sectionStyle || ""} ${className || ""}`}
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
            The TradePro <span className="text-gradient-warm">Advantage</span>
          </h2>
          <p className="section-desc max-w-xl mx-auto">{description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((b, i) => (
            <div key={i} className="p-6 rounded-xl border border-border bg-secondary/30 hover:border-primary/30 transition-all group">
              <div className="icon-box mb-5 group-hover:bg-primary/20 transition-colors">
                <b.Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="card-title text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {buttonText && (
          <div className="text-center">
            <a href={buttonHref || "#"} className="btn-primary glow-warm-sm hover:glow-warm inline-flex items-center gap-2">
              {buttonText} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
})

export default TradeProSection
