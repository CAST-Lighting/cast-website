"use client"
import { forwardRef, type Ref } from "react"
import { ArrowRight, Search } from "lucide-react"

interface ShopHeroProps {
  className?: string
  headline?: string
  subheadline?: string
  bgImage?: string
  bgColor?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  paddingTop?: number
  paddingBottom?: number
  ctaLabel?: string
  ctaHref?: string
  showSearch?: boolean
}

const ShopHero = forwardRef(function ShopHero(
  {
    className,
    headline = "Shop CAST Lighting Products",
    subheadline = "Professional outdoor lighting fixtures built to last a lifetime. Solid brass, copper, and bronze construction with lifetime warranties.",
    bgImage,
    bgColor,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    paddingTop,
    paddingBottom,
    ctaLabel = "Browse All Products",
    ctaHref = "#shop-grid",
    showSearch = true,
  }: ShopHeroProps,
  ref: Ref<HTMLDivElement>
) {
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.75
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || "var(--color-primary)"
  const bg = bgImage
    ? `linear-gradient(rgba(10,25,35,${overlayOpacity}), rgba(10,25,35,${overlayOpacity})), url(${bgImage}) center/cover no-repeat`
    : sectionBackground

  return (
    <div
      ref={ref}
      className={className || ""}
      style={{
        background: bg,
        paddingTop: paddingTop ?? 96,
        paddingBottom: paddingBottom ?? 80,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div className="site-container" style={{ textAlign: "center", maxWidth: 760 }}>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 12,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.6)",
          margin: "0 0 14px",
        }}>
          Professional Outdoor Lighting
        </p>

        <h1 style={{
          fontSize: "var(--h1-size)",
          fontWeight: 700,
          lineHeight: 1.1,
          fontFamily: "'Essonnes', 'Playfair Display', serif",
          color: "#fff",
          margin: "0 0 20px",
        }}>
          {headline.includes("CAST") ? (
            <>
              {headline.replace("CAST", "").trim().split(" ").slice(0, -0).join(" ")
                .replace("Shop", "Shop ")}
              <span style={{ background: "linear-gradient(135deg, #007CB0, #7EBEE8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {" "}CAST{" "}
              </span>
              {headline.split("CAST")[1]?.trim()}
            </>
          ) : headline}
        </h1>

        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 18,
          color: "rgba(255,255,255,0.78)",
          lineHeight: 1.65,
          margin: "0 0 40px",
        }}>
          {subheadline}
        </p>

        {showSearch && (
          <form
            onSubmit={e => e.preventDefault()}
            style={{
              display: "flex",
              maxWidth: 520,
              margin: "0 auto 32px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              overflow: "hidden",
              backdropFilter: "blur(8px)",
            }}
          >
            <input
              type="text"
              placeholder="Search products (e.g. path light, spot, transformer...)"
              style={{
                flex: 1,
                padding: "14px 18px",
                border: "none",
                background: "transparent",
                fontFamily: "'Barlow', sans-serif",
                fontSize: 14,
                color: "#fff",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: "var(--color-accent, #007CB0)",
                border: "none",
                padding: "14px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Search style={{ width: 18, height: 18, color: "#fff" }} />
            </button>
          </form>
        )}

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={ctaHref}
            className="sg-btn-solid-md"
            style={{ textDecoration: "none" }}
          >
            {ctaLabel} <ArrowRight style={{ width: 16, height: 16 }} />
          </a>
          <a
            href="/trade-pro"
            className="sg-btn-outline-md"
            style={{ textDecoration: "none" }}
          >
            TradePro Pricing
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex",
          gap: 40,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 56,
          paddingTop: 40,
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}>
          {[
            { value: "500+", label: "Products" },
            { value: "Lifetime", label: "Warranty" },
            { value: "25+", label: "Years in Business" },
            { value: "USA", label: "Designed & Engineered" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Essonnes', 'Playfair Display', serif",
                fontSize: 28,
                fontWeight: 700,
                background: "linear-gradient(135deg, #007CB0, #7EBEE8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                marginTop: 4,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default ShopHero
