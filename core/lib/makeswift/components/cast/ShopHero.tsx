"use client"

import { forwardRef, useState, type Ref } from "react"

interface ShopHeroProps {
  className?: string
  slides?: Array<{ image?: string; heading?: string; subtitle?: string }>
  searchPlaceholder?: string
  bgColor?: string
  overlayOpacity?: number
}

const DEFAULT_SLIDES = [
  { heading: "Premium Landscape Lighting", subtitle: "Complete lighting systems, unmatched warranties & expert support to help you design, install, and scale faster." },
  { heading: "Built for Contractors", subtitle: "Professional-grade brass and copper fixtures trusted by installers nationwide. Design control in every fixture." },
  { heading: "Lifetime Warranty Included", subtitle: "Every CAST fixture is engineered for decades of reliable outdoor performance in any climate." },
]

const ShopHero = forwardRef(function ShopHero(
  {
    className,
    slides,
    searchPlaceholder = "I am looking for...",
    bgColor,
    overlayOpacity = 55,
  }: ShopHeroProps,
  ref: Ref<HTMLDivElement>
) {
  const [current, setCurrent] = useState(0)
  const list = slides && slides.length > 0 ? slides : DEFAULT_SLIDES
  const prev = () => setCurrent((c) => (c - 1 + list.length) % list.length)
  const next = () => setCurrent((c) => (c + 1) % list.length)

  const slide = list[current]

  return (
    <div
      ref={ref}
      className={className || ""}
      style={{ width: "100%", boxSizing: "border-box", position: "relative", backgroundColor: bgColor || "var(--color-primary)", minHeight: 320, display: "flex", alignItems: "center" }}
    >
      <style>{`
        .sh-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.4);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #fff; z-index: 2; transition: background 200ms;
        }
        .sh-arrow:hover { background: rgba(255,255,255,0.3); }
        .sh-search {
          display: flex; align-items: center; gap: 0;
          background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.4);
          border-radius: 4px; max-width: 480px; overflow: hidden;
        }
        .sh-search input {
          flex: 1; background: transparent; border: none; outline: none;
          padding: 14px 20px; color: #fff; font-family: 'Barlow', sans-serif; font-size: 15px;
        }
        .sh-search input::placeholder { color: rgba(255,255,255,0.6); }
        .sh-search button {
          padding: 14px 20px; background: var(--color-accent); border: none; cursor: pointer;
          color: #fff; display: flex; align-items: center; justify-content: center; transition: background 200ms;
        }
        .sh-search button:hover { background: #046a99; }
        @media (max-width: 575px) { .sh-arrow { display: none; } }
      `}</style>

      {/* Bg image overlay */}
      {slide?.image && (
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      )}
      <div style={{ position: "absolute", inset: 0, backgroundColor: `rgba(0,73,96,${(overlayOpacity ?? 55) / 100})` }} />

      {/* Arrows */}
      {list.length > 1 && (
        <>
          <button className="sh-arrow" style={{ left: 16 }} onClick={prev} aria-label="Previous slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="sh-arrow" style={{ right: 16 }} onClick={next} aria-label="Next slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </>
      )}

      <div className="site-container" style={{ position: "relative", zIndex: 1, paddingTop: 72, paddingBottom: 72 }}>
        <h1 style={{ fontSize: "var(--h1-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Barlow', sans-serif", color: "#ffffff", margin: "0 0 16px", maxWidth: 640 }}>
          {slide?.heading || DEFAULT_SLIDES[0].heading}
        </h1>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: "0 0 36px", maxWidth: 520 }}>
          {slide?.subtitle || DEFAULT_SLIDES[0].subtitle}
        </p>
        <div className="sh-search">
          <input type="text" placeholder={searchPlaceholder} />
          <button aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          </button>
        </div>

        {/* Slide dots */}
        {list.length > 1 && (
          <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
            {list.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, background: i === current ? "#fff" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 300ms", padding: 0 }} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

export default ShopHero
