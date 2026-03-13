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
  { className }: { className?: string },
  ref: Ref<HTMLElement>
) {
  return (
    <section ref={ref} className={`py-24 bg-gradient-dark ${className || ""}`}>
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
    </section>
  )
})

export default ComparisonSection
