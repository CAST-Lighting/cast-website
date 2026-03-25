"use client"
import { forwardRef, type Ref, useState, useEffect, useCallback } from "react"

const DEFAULT_SLIDES = [
  "https://storage.googleapis.com/s.mkswft.com/RmlsZTpmNGU1MTkzMi02Y2JlLTQ0ZjAtOWIwNC03ZmI3MmQwNzYwMDk=/background-1.jpg",
  "https://storage.googleapis.com/s.mkswft.com/RmlsZTpkZDVmYmU0ZS1hMzE3LTRlYWYtODg0Zi0wY2Q0MWVlOWU2ZTk=/background-6.jpg",
  "https://storage.googleapis.com/s.mkswft.com/RmlsZTphN2U4ZjZlNS02ZDg0LTQzZmQtYTM4Ni0yMmNmOWNlNDYxMDM=/background-3.jpg",
  "https://storage.googleapis.com/s.mkswft.com/RmlsZTo5NmM1NDI2ZS1iMTZkLTQzYzItYTYyYy1hNDc1MWM5NDFiOWE=/background-7.jpg",
  "https://storage.googleapis.com/s.mkswft.com/RmlsZTo5M2JkMWM4NC1mOTA3LTRlZDktYThkMC0xNGZmYTAxODQ2MWI=/background-5.jpg",
]

interface SubPageHeroProps {
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
  bgColor?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  lineHeight?: number
  paddingTop?: number
  paddingBottom?: number
}

const SubPageHero = forwardRef(function SubPageHero(
  {
    className,
    slide1Image, slide2Image, slide3Image, slide4Image, slide5Image,
    phrase1, phrase2, phrase3,
    badgeText,
    headingLine1,
    description,
    btn1Label, btn1Href,
    btn2Label, btn2Href,
    bgColor, bgOpacity, gradientFrom, gradientTo, gradientDirection,
    lineHeight, paddingTop = 136, paddingBottom = 112,
  }: SubPageHeroProps,
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
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.60
  const overlayBg = hasGradient
    ? `linear-gradient(${gradientDirection || '135deg'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#25262d'

  return (
    <section
      ref={ref}
      className={`relative ${className || ""}`}
      style={{
        position: 'relative',
        zIndex: 2,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
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

      {/* Content — centered, no form */}
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
          <p className="section-desc max-w-xl" style={{ color: 'var(--color-blue-grey-300)' }}>
            {description || "Professional-grade brass and copper fixtures trusted by contractors nationwide. Lifetime warranty on every product."}
          </p>

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

export default SubPageHero
