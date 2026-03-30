"use client"

import { forwardRef, useRef, useState, useEffect, type Ref } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useCmsData } from "~/lib/makeswift/cms-context"
import { getTheme } from "~/lib/makeswift/theme"

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
  headingAccent?: string
  parts?: Part[]
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  paddingTop?: number
  paddingBottom?: number
  mode?: 'dark' | 'light'
}

const PartsGrid = forwardRef(function PartsGrid(
  {
    className,
    sectionStyle,
    overline = "Need Parts?",
    heading = "Parts For This Product",
    headingAccent = "",
    parts,
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    paddingTop,
    paddingBottom,
    mode = 'dark',
  }: PartsGridProps,
  ref: Ref<HTMLDivElement>
) {
  const cms = useCmsData()
  const cmsRelated = cms?.type === 'product' ? cms.meta?.relatedProducts : null
  const t = getTheme(mode)

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

  // CMS related products → parts, with fallback to props then defaults
  const cmsParts: Part[] | null = cmsRelated && cmsRelated.length > 0
    ? cmsRelated.map((rp) => ({
        name: rp.name,
        price: rp.price,
        image: rp.image,
        href: rp.href,
      }))
    : null

  const list = parts && parts.length > 0 ? parts : (cmsParts ?? DEFAULT_PARTS)

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
    : bgColor || "#f0f2f5"

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ position: "relative", width: "100%", boxSizing: "border-box", ...(!bgImage ? { background: sectionBackground } : {}), paddingTop: paddingTop ?? 48, paddingBottom: paddingBottom ?? 48 }}
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
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: t.accent, margin: "0 0 10px" }}>{overline}</p>
              )}
              <h2 style={{ fontSize: "var(--h2-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: t.heading, margin: 0 }}>
                {heading}{headingAccent && <> <span className="text-gradient-warm">{headingAccent}</span></>}
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
                style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: 10, overflow: "hidden", width: 220, minWidth: 220, maxWidth: 220, flexShrink: 0, display: "flex", flexDirection: "column", transition: "border-color 200ms, box-shadow 200ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,124,176,0.4)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = t.cardBorder; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                <div style={{ aspectRatio: "1", position: "relative", overflow: "hidden" }}>
                  {part.image
                    ? <img src={part.image} alt={part.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 300ms" }} onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }} onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }} />
                    : (
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a2e3a 0%, #0d4a5c 50%, #1a3a4a 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(175,229,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(175,229,253,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5, position: "relative", zIndex: 1 }}>
                          <circle cx="12" cy="12" r="10" stroke={t.accent} strokeWidth="1.5" />
                          <path d="M8 12h8M12 8v8" stroke={t.accent} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    )
                  }
                </div>
                <div style={{ padding: "14px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 className="heading-card-sm" style={{ margin: "0 0 4px" }}>{part.name}</h3>
                  {part.partNumber && <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: t.subtle, margin: "0 0 8px" }}>#{part.partNumber}</p>}
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: t.heading, margin: "0 0 10px" }}>{part.price}</p>
                  <a href={part.href || "#"} className={t.btnSm} style={{ display: "flex", justifyContent: "center", textDecoration: "none", width: "100%", marginTop: "auto" }}>Add to Cart</a>
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
