"use client"
import { forwardRef, type Ref } from "react"
import { Mail } from "lucide-react"
import { getTheme, type ThemeMode } from "~/lib/makeswift/theme"

const NewsletterCta = forwardRef(function NewsletterCta(
  {
    className,
    paddingTop = 80,
    paddingBottom = 80,
    bgImage,
    bgColor,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    lineHeight,
    heading,
    headingAccent,
    description,
    submitLabel,
    inputPlaceholder,
    mode = 'dark',
  }: {
    className?: string
  paddingTop?: number
  paddingBottom?: number
    bgImage?: string
    bgColor?: string
    bgOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    gradientDirection?: string
    lineHeight?: number
    heading?: string
    headingAccent?: string
    description?: string
    submitLabel?: string
    inputPlaceholder?: string
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

  return (
    <section
      ref={ref}
      className={`relative ${className || ""}`}
      style={{ width: '100%', paddingTop, paddingBottom, ...(!bgImageUrl ? { background: sectionBackground } : {}), } as React.CSSProperties}
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
          <div className="max-w-2xl mx-auto text-center">
            <div className="icon-box icon-box-lg mx-auto mb-6">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="heading-style-h2 text-foreground mb-3">{heading || "Stay in the Loop"}{headingAccent && <> <span className="text-gradient-warm">{headingAccent}</span></>}</h2>
            <p className="section-desc mb-8">
              {description || "Get the latest on new products, contractor resources, and exclusive offers delivered straight to your inbox."}
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder={inputPlaceholder || "Enter your email"}
                className="form-input flex-1"
              />
              <button type="submit" className={t.btnPrimary}>
                {submitLabel || "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
})

export default NewsletterCta
