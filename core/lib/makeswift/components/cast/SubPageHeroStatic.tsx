"use client"
import { forwardRef, type Ref } from "react"

const DEFAULT_BG = "https://storage.googleapis.com/s.mkswft.com/RmlsZTpmNGU1MTkzMi02Y2JlLTQ0ZjAtOWIwNC03ZmI3MmQwNzYwMDk=/background-1.jpg"

interface SubPageHeroStaticProps {
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
  badgeText?: string
  headingLine1?: string
  headingAccent?: string
  description?: string
  btn1Label?: string
  btn1Href?: string
  btn2Label?: string
  btn2Href?: string
}

const SubPageHeroStatic = forwardRef(function SubPageHeroStatic(
  {
    className,
    bgImage,
    bgColor, bgOpacity, gradientFrom, gradientTo, gradientDirection,
    lineHeight, paddingTop = 136, paddingBottom = 112,
    badgeText,
    headingLine1,
    headingAccent,
    description,
    btn1Label, btn1Href,
    btn2Label, btn2Href,
  }: SubPageHeroStaticProps,
  ref: Ref<HTMLElement>
) {
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.60
  const overlayBg = hasGradient
    ? `linear-gradient(${gradientDirection || '135deg'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#25262d'

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{
        zIndex: 2,
        paddingTop,
        paddingBottom,
        '--section-line-height': lineHeight,
      } as React.CSSProperties}
    >
      {/* Background image */}
      <img
        src={bgImage || DEFAULT_BG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: overlayBg, opacity: overlayOpacity, zIndex: 1 }} />

      {/* Content — centered */}
      <div className="site-container w-full relative" style={{ zIndex: 10 }}>
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">

          {/* Badge */}
          {badgeText && (
            <div className="badge-pill self-center">
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: 'var(--color-accent)' }} />
              <span>{badgeText}</span>
            </div>
          )}

          {/* Heading */}
          <h1 className="heading-style-h1" style={{ color: 'var(--color-blue-grey-100)' }}>
            {headingLine1 || "Premium Landscape Lighting"}
            {headingAccent && (
              <>
                <br />
                <span className="text-gradient-warm">{headingAccent}</span>
              </>
            )}
          </h1>

          {/* Description */}
          {description && (
            <p className="section-desc max-w-xl" style={{ color: 'var(--color-blue-grey-300)' }}>
              {description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {btn1Label && (
              <a href={btn1Href || "#"} className="sg-btn-solid-md">
                {btn1Label}
              </a>
            )}
            {btn2Label && (
              <a href={btn2Href || "#"} className="sg-btn-outline-dark-md">
                {btn2Label}
              </a>
            )}
          </div>

        </div>
      </div>
    </section>
  )
})

export default SubPageHeroStatic
