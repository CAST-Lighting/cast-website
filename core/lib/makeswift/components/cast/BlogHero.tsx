"use client"
import { forwardRef, type Ref } from "react"

const BlogHero = forwardRef(function BlogHero(
  {
    className,
    bgColor,
    bgImage,
    bgOpacity,
    paddingTop,
    paddingBottom,
    overline,
    heading,
    headingAccent,
    description,
  }: {
    className?: string
    bgColor?: string
    bgImage?: string
    bgOpacity?: number
    paddingTop?: number
    paddingBottom?: number
    overline?: string
    heading?: string
    headingAccent?: string
    description?: string
  },
  ref: Ref<HTMLElement>
) {
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.92
  const bg = bgColor || '#0d1620'

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ''}`}
      style={{ paddingTop: paddingTop ?? 80, paddingBottom: paddingBottom ?? 64, background: bg }}
    >
      {bgImage && (
        <>
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
          <div className="absolute inset-0" style={{ background: bg, opacity: overlayOpacity, zIndex: 1 }} />
        </>
      )}
      <div className="site-container relative" style={{ zIndex: 10 }}>
        {overline && (
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--color-accent, #007CB0)', margin: '0 0 16px' }}>
            {overline}
          </p>
        )}
        <h1 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "var(--h2-size)", fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: '0 0 20px' }}>
          {heading || 'CAST'} <span style={{ background: 'linear-gradient(135deg, #007CB0, #7EBEE8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{headingAccent || 'Insights'}</span>
        </h1>
        {description && (
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 600, margin: 0 }}>
            {description}
          </p>
        )}
      </div>
    </section>
  )
})

export default BlogHero
