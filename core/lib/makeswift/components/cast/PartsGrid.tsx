"use client"

import { forwardRef, useRef, useState, useEffect, type Ref } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface Part {
  image?: string
  name?: string
  price?: string
  partNumber?: string
  href?: string
}

interface PartsGridProps {
  className?: string
  sectionStyle?: string
  overline?: string
  heading?: string
  parts?: Part[]
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  paddingTop?: number
  paddingBottom?: number
}

const PartsGrid = forwardRef(function PartsGrid(
  {
    className,
    sectionStyle,
    overline = "Need Parts?",
    heading = "Parts For This Product",
    parts,
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    paddingTop,
    paddingBottom,
  }: PartsGridProps,
  ref: Ref<HTMLDivElement>
) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const DEFAULT_PARTS: Part[] = [
    { name: "Replacement LED Module", partNumber: "LED-001", price: "$29.99" },
    { name: "Brass Ground Stake", partNumber: "STK-002", price: "$12.99" },
    { name: "Wire Connector Kit", partNumber: "WCK-003", price: "$8.99" },
    { name: "Lens Cover Assembly", partNumber: "LCA-004", price: "$15.99" },
    { name: "Mounting Bracket", partNumber: "MBK-005", price: "$11.99" },
  ]
  const list = parts && parts.length > 0 ? parts : DEFAULT_PARTS

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 220
    const distance = dir === "left" ? -cardWidth * 2 : cardWidth * 2
    const start = el.scrollLeft
    const duration = 600
    let startTime: number | null = null
    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      el.scrollLeft = start + distance * ease(progress)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === "number" ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || "to bottom"}, ${gradientFrom}, ${gradientTo})`
    : bgColor || "#25262d"

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ position: "relative", width: "100%", boxSizing: "border-box", ...(!bgImage ? { background: sectionBackground } : {}), paddingTop: paddingTop ?? 96, paddingBottom: paddingBottom ?? 96, borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      {bgImage && (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {bgImage && (
        <div className="absolute inset-0" style={{ zIndex: 1, background: sectionBackground, opacity: overlayOpacity }} />
      )}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Header with arrows — aligned to site-container */}
        <div className="site-container" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              {overline && (
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-content)", margin: "0 0 10px" }}>{overline}</p>
              )}
              <h2 style={{ fontSize: "var(--h3-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: 0 }}>
                {heading}
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => scroll("left")} disabled={!canScrollLeft} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scroll("right")} disabled={!canScrollRight} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel — left edge aligns with site-container, bleeds right */}
        <div style={{ paddingLeft: "max(64px, calc((100vw - 1600px) / 2 + 64px))" }}>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pr-16 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {list.map((part, i) => (
              <div
                key={i}
                className="group flex-shrink-0 w-[220px] bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/30"
              >
                <div style={{ aspectRatio: "1", background: "#37474f", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {part.image
                    ? <img src={part.image} alt={part.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#adb5bd" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /></svg>
                  }
                </div>
                <div style={{ padding: "14px" }}>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", margin: "0 0 4px", lineHeight: 1.3 }}>{part.name}</p>
                  {part.partNumber && <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "var(--color-content)", margin: "0 0 8px" }}>#{part.partNumber}</p>}
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--color-primary)", margin: "0 0 10px" }}>{part.price}</p>
                  <div style={{ display: "flex", gap: 6 }}>
                    <a href={part.href || "#"} className="sg-btn-solid-sm" style={{ flex: 1, justifyContent: "center", textDecoration: "none" }}>Add to Cart</a>
                    <a href={part.href || "#"} style={{ width: 32, height: 32, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, background: "#2d353c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} aria-label="View product">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-content)" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export default PartsGrid
