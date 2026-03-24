"use client"
import { forwardRef, type Ref } from "react"

const FALLBACK_LOGOS = [
  { name: "Willow Creek Landscapes" },
  { name: "Elite Outdoor Living" },
  { name: "Premier Landscape Design" },
  { name: "Green Horizons Inc." },
  { name: "SunPath Landscaping" },
  { name: "Terrain Masters" },
  { name: "LightWork Contractors" },
  { name: "NovaTech Outdoor" },
]

interface LogoItem { name?: string; image?: string }

interface BrandLogosProps {
  className?: string
  overline?: string
  heading?: string
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  paddingTop?: number
  paddingBottom?: number
  logos?: LogoItem[]
}

const BrandLogos = forwardRef(function BrandLogos(
  {
    className,
    overline = "Trusted by Industry Leaders",
    heading = "10,000+ Landscape Professionals Choose CAST",
    bgColor,
    bgImage,
    bgOpacity,
    paddingTop,
    paddingBottom,
    logos: logosProp,
  }: BrandLogosProps,
  ref: Ref<HTMLElement>
) {
  const logos = logosProp && logosProp.length > 0 ? logosProp : FALLBACK_LOGOS
  const overlayOpacity = typeof bgOpacity === "number" ? bgOpacity / 100 : 0.88
  const bg = bgColor || "#1a2533"

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{
        ...(!bgImage ? { background: bg } : {}),
        paddingTop: paddingTop ?? 64,
        paddingBottom: paddingBottom ?? 64,
      }}
    >
      {bgImage && (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {bgImage && (
        <div className="absolute inset-0" style={{ zIndex: 1, background: bg, opacity: overlayOpacity }} />
      )}

      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            {overline && (
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.5)",
                margin: "0 0 12px",
              }}>
                {overline}
              </p>
            )}
            {heading && (
              <h2 style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 18,
                fontWeight: 600,
                color: "rgba(255,255,255,0.75)",
                margin: 0,
              }}>
                {heading}
              </h2>
            )}
          </div>

          {/* Logo row */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
          }}>
            {logos.map((logo, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 28px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 140,
                }}
              >
                {logo.image ? (
                  <img
                    src={logo.image}
                    alt={logo.name || `Partner ${i + 1}`}
                    style={{ height: 32, objectFit: "contain", filter: "brightness(0) invert(0.7)" }}
                  />
                ) : (
                  <span style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    textAlign: "center",
                  }}>
                    {logo.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default BrandLogos
