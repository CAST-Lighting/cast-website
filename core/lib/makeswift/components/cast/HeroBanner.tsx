"use client"
import { forwardRef, type Ref, useState, useEffect, useCallback } from "react"

const DEFAULT_SLIDES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80",
  "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1600&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
  "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1600&q=80",
]

interface HeroBannerProps {
  className?: string
  slide1Image?: string
  slide2Image?: string
  slide3Image?: string
  slide4Image?: string
  slide5Image?: string
  phrase1?: string
  phrase2?: string
  phrase3?: string
  badgeText?: string
  headingLine1?: string
  description?: string
  btn1Label?: string
  btn1Href?: string
  btn2Label?: string
  btn2Href?: string
  formTitle?: string
  formSubtitle?: string
  formSubmitLabel?: string
  formWidth?: number
  formOffsetBottom?: number
  bgColor?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  lineHeight?: number
  paddingTop?: number
  paddingBottom?: number
}

const HeroBanner = forwardRef(function HeroBanner(
  {
    className,
    slide1Image, slide2Image, slide3Image, slide4Image, slide5Image,
    phrase1, phrase2, phrase3,
    badgeText,
    headingLine1,
    description,
    btn1Label, btn1Href,
    btn2Label, btn2Href,
    formTitle, formSubtitle, formSubmitLabel,
    formWidth, formOffsetBottom,
    bgColor, bgOpacity, gradientFrom, gradientTo, gradientDirection,
    lineHeight, paddingTop, paddingBottom,
  }: HeroBannerProps,
  ref: Ref<HTMLElement>
) {
  const [current, setCurrent] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const slideImages = [slide1Image, slide2Image, slide3Image, slide4Image, slide5Image].filter(Boolean) as string[]
  const images = slideImages.length > 0 ? slideImages : DEFAULT_SLIDES

  const phrases = [phrase1, phrase2, phrase3].filter(Boolean) as string[]
  const activePhrases = phrases.length > 0 ? phrases : ["Built to Last Forever", "Designed for Contractors", "Loved by Homeowners"]

  const next = useCallback(() => setCurrent(p => (p + 1) % images.length), [images.length])

  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next])

  useEffect(() => {
    const t = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setPhraseIndex(p => (p + 1) % activePhrases.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)
    return () => clearInterval(t)
  }, [activePhrases.length])

  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.70
  const overlayBg = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#003344'

  return (
    <section
      ref={ref}
      className={`relative ${className || ""}`}
      style={{
        position: 'relative',
        zIndex: 2,
        paddingTop: paddingTop ?? 80,
        paddingBottom: paddingBottom ?? 80,
        '--section-line-height': lineHeight,
      } as React.CSSProperties}
    >
      {/* Slide images */}
      {images.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: overlayBg, opacity: overlayOpacity, zIndex: 1 }} />

      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 20 }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6" : "w-2 opacity-50"}`}
              style={{ background: i === current ? 'var(--color-accent)' : '#fff' }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="site-container w-full relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">

          {/* ── Left: text ── */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="badge-pill self-start">
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: 'var(--color-accent)' }} />
              <span>{badgeText || "New 2026 Product Catalog Now Available"}</span>
            </div>

            {/* Heading */}
            <h1 className="heading-style-h1" style={{ color: 'var(--color-blue-grey-100)' }}>
              {headingLine1 || "Premium Landscape Lighting"}
              <br />
              <span
                className="text-gradient-warm"
                style={{
                  display: 'inline-block',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? 'translateY(8px)' : 'translateY(0)',
                }}
              >
                {activePhrases[phraseIndex]}
              </span>
            </h1>

            {/* Description */}
            <p className="section-desc max-w-md" style={{ color: 'var(--color-blue-grey-300)' }}>
              {description || "Professional-grade brass and copper fixtures trusted by contractors nationwide. Lifetime warranty on every product."}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <a href={btn1Href || "#"} className="sg-btn-solid-md">
                {btn1Label || "Shop Products"}
              </a>
              <a href={btn2Href || "#"} className="sg-btn-outline-dark-md">
                {btn2Label || "Become a TradePro →"}
              </a>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div
            style={{
              position: 'relative',
              zIndex: 50,
              maxWidth: formWidth ? `${formWidth}px` : undefined,
              marginLeft: 'auto',
              transform: formOffsetBottom ? `translateY(${formOffsetBottom}px)` : undefined,
            }}
          >
            <div
              className="rounded-2xl p-6 lg:p-8 border border-white/10 relative overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, hsl(193 98% 16% / 0.97), hsl(198 100% 28% / 0.93))',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 8px 60px -12px hsl(204 72% 70% / 0.3), 0 2px 20px -4px hsl(193 98% 19% / 0.5), inset 0 1px 0 0 hsl(204 72% 70% / 0.15)',
              }}
            >
              {/* top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, hsl(204 72% 70% / 0.6), transparent)' }} />

              <h3 className="heading-style-h4 mb-1" style={{ color: '#fff' }}>
                {formTitle || "Get An Easy, No-Pressure Quote"}
              </h3>
              <p className="text-size-small mb-5" style={{ color: 'var(--color-blue-grey-300)' }}>
                {formSubtitle || "Tell us about your project and we'll get back to you within 24 hours."}
              </p>

              <form className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="form-label" style={{ color: 'rgba(175,229,253,0.7)' }}>Full Name</label>
                    <input type="text" placeholder="John Smith" className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none" style={{ border: '1px solid rgba(175,229,253,0.2)', background: 'rgba(255,255,255,0.06)' }} />
                  </div>
                  <div>
                    <label className="form-label" style={{ color: 'rgba(175,229,253,0.7)' }}>Project Type</label>
                    <select className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none appearance-none" style={{ border: '1px solid rgba(175,229,253,0.2)', background: 'rgba(40,90,110,0.8)' }}>
                      <option>Select...</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Municipal</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="form-label" style={{ color: 'rgba(175,229,253,0.7)' }}>Email</label>
                    <input type="email" placeholder="john@company.com" className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none" style={{ border: '1px solid rgba(175,229,253,0.2)', background: 'rgba(255,255,255,0.06)' }} />
                  </div>
                  <div>
                    <label className="form-label" style={{ color: 'rgba(175,229,253,0.7)' }}>Phone</label>
                    <input type="tel" placeholder="(555) 123-4567" className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none" style={{ border: '1px solid rgba(175,229,253,0.2)', background: 'rgba(255,255,255,0.06)' }} />
                  </div>
                </div>
                <button type="submit" className="sg-btn-solid-dark-lg w-full justify-center">
                  {formSubmitLabel || "Get A Free Quote"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
})

export default HeroBanner
