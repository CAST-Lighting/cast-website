"use client"

import { forwardRef, useState, useRef, useEffect, type Ref } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useCmsData } from "~/lib/makeswift/cms-context"

interface MediaItem {
  type?: "image" | "video"
  src?: string
  thumbnail?: string
  caption?: string
}

interface MediaGalleryProps {
  className?: string
  sectionStyle?: string
  heading?: string
  items?: MediaItem[]
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  paddingTop?: number
  paddingBottom?: number
}

const PlaceholderImage = ({ caption, isVideo }: { caption?: string; isVideo?: boolean }) => (
  <div style={{ width: "100%", aspectRatio: "16/9", background: "#37474f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 8, position: "relative", overflow: "hidden" }}>
    {isVideo ? (
      <>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 8 }}>
          <circle cx="12" cy="12" r="11" fill="rgba(0,73,96,0.15)" />
          <polygon points="10,8 17,12 10,16" fill="var(--color-primary)" />
        </svg>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, color: "var(--color-content)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Video</span>
      </>
    ) : (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ced4da" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    )}
    {isVideo && (
      <div style={{ position: "absolute", top: 8, left: 8, background: "var(--color-primary)", color: "#fff", fontSize: 9, fontFamily: "'Barlow', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 6px", borderRadius: 2 }}>
        Video
      </div>
    )}
  </div>
)

const MediaGallery = forwardRef(function MediaGallery(
  {
    className,
    sectionStyle,
    heading = "Photos & Videos",
    items,
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    paddingTop,
    paddingBottom,
  }: MediaGalleryProps,
  ref: Ref<HTMLDivElement>
) {
  const cms = useCmsData()
  const cmsImages = cms?.type === 'product' ? cms.meta?.images : null

  const [lightbox, setLightbox] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // CMS images → media items, with fallback to props then defaults
  const cmsMediaItems: MediaItem[] | null = cmsImages && cmsImages.length > 0
    ? cmsImages.map((img) => ({
        type: 'image' as const,
        src: img.src,
        caption: img.alt,
      }))
    : null

  const DEFAULT_MEDIA: MediaItem[] = [
    { src: "https://storage.googleapis.com/s.mkswft.com/RmlsZToxYjc5OTY1Mi1hNTE0LTRjMDYtODMwZC1hNThiZTg0ZTIyNTE=/placeholder_picture.webp", type: "image", caption: "Product Photo 1" },
    { src: "https://storage.googleapis.com/s.mkswft.com/RmlsZToxYjc5OTY1Mi1hNTE0LTRjMDYtODMwZC1hNThiZTg0ZTIyNTE=/placeholder_picture.webp", type: "image", caption: "Product Photo 2" },
    { src: "https://storage.googleapis.com/s.mkswft.com/RmlsZToxYjc5OTY1Mi1hNTE0LTRjMDYtODMwZC1hNThiZTg0ZTIyNTE=/placeholder_picture.webp", type: "image", caption: "Product Photo 3" },
    { src: "https://storage.googleapis.com/s.mkswft.com/RmlsZToxYjc5OTY1Mi1hNTE0LTRjMDYtODMwZC1hNThiZTg0ZTIyNTE=/placeholder_picture.webp", type: "image", caption: "Product Photo 4" },
    { src: "", type: "video", caption: "Installation Video" },
  ]
  const list = items && items.length > 0 ? items : (cmsMediaItems ?? DEFAULT_MEDIA)

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
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 320
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
      style={{ position: "relative", width: "100%", boxSizing: "border-box", ...(!bgImage ? { background: sectionBackground } : {}), paddingTop: paddingTop ?? 48, paddingBottom: paddingBottom ?? 48, borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      {bgImage && (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {bgImage && (
        <div className="absolute inset-0" style={{ zIndex: 1, background: sectionBackground, opacity: overlayOpacity }} />
      )}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Header with arrows — aligned to site-container */}
        <div className="site-container" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "var(--h3-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: 0 }}>
              {heading}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => scroll("left")} disabled={!canScrollLeft} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "#2d353c", display: "flex", alignItems: "center", justifyContent: "center", cursor: canScrollLeft ? "pointer" : "not-allowed", opacity: canScrollLeft ? 1 : 0.3, transition: "border-color 200ms, background 200ms", color: "#fff" }} onMouseEnter={e => { if (canScrollLeft) { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-primary)"; (e.currentTarget as HTMLButtonElement).style.background = "#37474f"; }}} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.background = "#2d353c"; }}>
                <ArrowLeft style={{ width: 16, height: 16 }} />
              </button>
              <button onClick={() => scroll("right")} disabled={!canScrollRight} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "#2d353c", display: "flex", alignItems: "center", justifyContent: "center", cursor: canScrollRight ? "pointer" : "not-allowed", opacity: canScrollRight ? 1 : 0.3, transition: "border-color 200ms, background 200ms", color: "#fff" }} onMouseEnter={e => { if (canScrollRight) { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-primary)"; (e.currentTarget as HTMLButtonElement).style.background = "#37474f"; }}} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.background = "#2d353c"; }}>
                <ArrowRight style={{ width: 16, height: 16 }} />
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
            {list.map((item, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i)}
                style={{ background: "#2d353c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden", width: 320, minWidth: 320, maxWidth: 320, flexShrink: 0, cursor: "pointer", transition: "border-color 200ms, box-shadow 200ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,124,176,0.4)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  {item.src ? (
                    item.type === "video" ? (
                      <div style={{ position: "relative" }}>
                        <img src={item.thumbnail || item.src} alt={item.caption} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block", borderRadius: "10px 10px 0 0" }} />
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
                          <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.9)" />
                            <polygon points="10,8 17,12 10,16" fill="var(--color-primary)" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <img src={item.src} alt={item.caption} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block", borderRadius: "10px 10px 0 0", transition: "transform 300ms" }} onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }} onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }} />
                    )
                  ) : (
                    <PlaceholderImage caption={item.caption} isVideo={item.type === "video"} />
                  )}
                </div>
                {item.caption && (
                  <div style={{ padding: "12px 16px" }}>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0 }}>{item.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            onClick={() => setLightbox(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <button
              onClick={() => setLightbox(null)}
              style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "#fff", fontSize: 32, cursor: "pointer", lineHeight: 1 }}
              aria-label="Close"
            >×</button>
            <div style={{ maxWidth: "80vw", maxHeight: "80vh", textAlign: "center" }}>
              {list[lightbox]?.src ? (
                <img src={list[lightbox].src} alt={list[lightbox]?.caption} style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 8 }} />
              ) : (
                <PlaceholderImage isVideo={list[lightbox]?.type === "video"} />
              )}
              {list[lightbox]?.caption && (
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#fff", marginTop: 12 }}>{list[lightbox]?.caption}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default MediaGallery
