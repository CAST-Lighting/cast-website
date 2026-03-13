"use client"
import { forwardRef, type Ref, useState, useEffect, useCallback } from "react"

const bgImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80",
  "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1600&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
  "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1600&q=80",
]
const rotatingPhrases = ["Built to Last Forever", "Designed for Contractors", "Loved by Homeowners"]

const HeroBanner = forwardRef(function HeroBanner(
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
    bgImage?: { url: string }
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
  const [current, setCurrent] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % bgImages.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length)
    }, 3000)
    return () => clearInterval(phraseTimer)
  }, [])

  const bgImageUrl = bgImage?.url
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.7
  const hasGradient = !!(gradientFrom && gradientTo)

  const sectionBg: React.CSSProperties = bgImageUrl
    ? {}
    : hasGradient
    ? { background: `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})` }
    : { background: bgColor || undefined }

  return (
    <section
      ref={ref}
      className={`relative h-[70vh] flex items-center ${className || ""}`}
      style={{ ...sectionBg, '--section-line-height': lineHeight, paddingTop: paddingTop ?? 80, paddingBottom: paddingBottom ?? 80 } as React.CSSProperties}
    >
      {/* Background: single prop image OR carousel */}
      {bgImageUrl ? (
        <img src={bgImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      ) : (
        bgImages.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={src}
              alt={`Landscape lighting showcase ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))
      )}

      {/* Overlay layer */}
      {bgImageUrl ? (
        <div className="absolute inset-0" style={{
          zIndex: 1,
          background: hasGradient
            ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
            : bgColor || '#003344',
          opacity: overlayOpacity
        }} />
      ) : (
        <div className="absolute inset-0" style={{ background: '#003344', opacity: 0.7 }} />
      )}

      {/* Carousel indicators — only shown when using the carousel (no prop image) */}
      {!bgImageUrl && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {bgImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary w-6" : "bg-muted-foreground/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="max-w-xl">
              <div className="badge-pill mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                New 2026 Product Catalog Now Available
              </div>

              <h1 className="heading-style-h1 text-foreground mb-6">
                Premium Landscape Lighting{" "}
                <span className="inline-block overflow-hidden align-bottom h-[1.2em]">
                  <span
                    key={phraseIndex}
                    className="text-gradient-warm inline-block whitespace-nowrap"
                    style={{
                      animation: "slotIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                    }}
                  >
                    {rotatingPhrases[phraseIndex]}
                  </span>
                </span>
              </h1>

              <p className="section-desc mb-8 max-w-md">
                Professional-grade brass and copper fixtures trusted by contractors nationwide. Lifetime warranty on every product.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a href="#" className="sg-btn-solid-md">
                  Shop Products
                </a>
                <a href="#" className="sg-btn-outline-md">
                  Become a TradePro →
                </a>
              </div>
            </div>

            {/* Right - Quote form */}
            <div className="hidden lg:block">
              <div
                className="backdrop-blur-2xl rounded-2xl p-8 border border-primary/30 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, hsl(193 98% 16% / 0.95), hsl(198 100% 28% / 0.9))',
                  boxShadow: '0 8px 60px -12px hsl(204 72% 70% / 0.3), 0 2px 20px -4px hsl(193 98% 19% / 0.5), inset 0 1px 0 0 hsl(204 72% 70% / 0.15)'
                }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, hsl(204 72% 70% / 0.6), transparent)' }} />

                <h3 className="heading-style-h4 text-white mb-2">Get An Easy, No-Pressure Quote</h3>
                <p className="text-size-small text-primary/80 mb-6">Tell us about your project and we&apos;ll get back to you within 24 hours.</p>

                <form className="space-y-4">
                  <div>
                    <label className="form-label !text-primary/70">Full Name</label>
                    <input type="text" placeholder="John Smith" className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/8 text-white placeholder:text-blue-grey-300/50 focus:outline-none focus:border-primary/50 focus:bg-white/12 transition-all text-base" />
                  </div>
                  <div>
                    <label className="form-label !text-primary/70">Project Type</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/8 text-white focus:outline-none focus:border-primary/50 focus:bg-white/12 transition-all text-base appearance-none">
                      <option>Select...</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Municipal</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label !text-primary/70">Email</label>
                    <input type="email" placeholder="john@company.com" className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/8 text-white placeholder:text-blue-grey-300/50 focus:outline-none focus:border-primary/50 focus:bg-white/12 transition-all text-base" />
                  </div>
                  <div>
                    <label className="form-label !text-primary/70">Phone</label>
                    <input type="tel" placeholder="(555) 123-4567" className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/8 text-white placeholder:text-blue-grey-300/50 focus:outline-none focus:border-primary/50 focus:bg-white/12 transition-all text-base" />
                  </div>
                  <button type="submit" className="sg-btn-solid-dark-lg w-full justify-center">
                    Get A Free Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default HeroBanner
