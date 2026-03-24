"use client"

import { forwardRef, useState, type Ref } from "react"

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
  <div style={{ width: "100%", aspectRatio: "16/10", background: "#37474f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 8, position: "relative", overflow: "hidden" }}>
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
  const [lightbox, setLightbox] = useState<number | null>(null)
  if (!items || items.length === 0) return null
  const list = items
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
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
      <div className="site-container">
        <h2 style={{ fontSize: "var(--h3-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: "0 0 32px" }}>
          {heading}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {list.map((item, i) => (
            <div
              key={i}
              onClick={() => setLightbox(i)}
              style={{ cursor: "pointer", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {item.src ? (
                item.type === "video" ? (
                  <div style={{ position: "relative" }}>
                    <img src={item.thumbnail || item.src} alt={item.caption} style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
                      <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.9)" />
                        <polygon points="10,8 17,12 10,16" fill="var(--color-primary)" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <img src={item.src} alt={item.caption} style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }} />
                )
              ) : (
                <PlaceholderImage caption={item.caption} isVideo={item.type === "video"} />
              )}
              {item.caption && (
                <div style={{ padding: "10px 12px", background: "#2d353c" }}>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "var(--color-content)", margin: 0 }}>{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

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
              <PlaceholderImage isVideo={list[lightbox]?.type === "video"} />
              {list[lightbox]?.caption && (
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#fff", marginTop: 12 }}>{list[lightbox]?.caption}</p>
              )}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
})

export default MediaGallery
