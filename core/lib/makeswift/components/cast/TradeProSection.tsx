"use client"
import { forwardRef, type Ref } from "react"
import { DollarSign, Palette, Clock, Headphones, ArrowRight } from "lucide-react"

const benefits = [
  { icon: DollarSign, title: "Exclusive Contractor Pricing", desc: "Access wholesale pricing with volume discounts that improve your margins on every project." },
  { icon: Palette, title: "Design Control in the Field", desc: "Interchangeable optics and adjustable fixtures let you fine-tune lighting on-site." },
  { icon: Clock, title: "Lifetime Product Warranty", desc: "Every CAST product is backed by our industry-leading lifetime warranty—no questions asked." },
  { icon: Headphones, title: "Dedicated Support Team", desc: "Get direct access to our expert lighting designers for project planning and troubleshooting." },
]

const TradeProSection = forwardRef(function TradeProSection(
  { className }: { className?: string },
  ref: Ref<HTMLElement>
) {
  return (
    <section ref={ref} className={`py-24 bg-card ${className || ""}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <span className="overline">Benefits for Contractors &amp; Installers</span>
        </div>
        <div className="text-center mb-14">
          <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-3">
            The TradePro <span className="text-gradient-warm">Advantage</span>
          </h2>
          <p className="section-desc max-w-xl mx-auto">
            Access professional products with lifetime warranties that give you design control in the field.
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
          <a href="#" className="btn-primary glow-warm-sm hover:glow-warm gap-2">
            Learn More About TradePro <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
})

export default TradeProSection
