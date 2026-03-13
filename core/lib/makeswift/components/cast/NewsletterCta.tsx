"use client"
import { forwardRef, type Ref } from "react"
import { Mail } from "lucide-react"

const NewsletterCta = forwardRef(function NewsletterCta(
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
    : { background: bgColor || '#1e2d3e' }

  return (
    <section
      ref={ref}
      className={`relative ${className || ""}`}
      style={{ ...sectionBg, '--section-line-height': lineHeight, paddingTop: paddingTop ?? 80, paddingBottom: paddingBottom ?? 80 } as React.CSSProperties}
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
          <div className="max-w-2xl mx-auto text-center">
            <div className="icon-box icon-box-lg mx-auto mb-6">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="section-heading text-3xl md:text-4xl text-foreground mb-3">Stay in the Loop</h2>
            <p className="section-desc mb-8">
              Get the latest on new products, contractor resources, and exclusive offers delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input flex-1"
              />
              <button type="submit" className="sg-btn-solid-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
})

export default NewsletterCta
