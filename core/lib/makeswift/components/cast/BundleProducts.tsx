"use client"

import { forwardRef, type Ref } from "react"
import { useCmsData } from "~/lib/makeswift/cms-context"

interface BundleItem {
  image?: string
  name?: string
  price?: string
  badge?: string
}

interface BundleProductsProps {
  className?: string
  sectionStyle?: string
  overline?: string
  heading?: string
  items?: BundleItem[]
  buttonText?: string
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  paddingTop?: number
  paddingBottom?: number
}

const BundleProducts = forwardRef(function BundleProducts(
  {
    className,
    sectionStyle,
    overline = "Frequently Bought Together",
    heading = "Bundle These Products",
    items,
    buttonText = "Add All To Cart",
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    paddingTop,
    paddingBottom,
  }: BundleProductsProps,
  ref: Ref<HTMLDivElement>
) {
  const cms = useCmsData()
  const cmsRelated = cms?.type === 'product' ? cms.meta?.relatedProducts : null

  const DEFAULT_ITEMS: BundleItem[] = [
    { name: "Accessory #1", price: "$49.99", badge: "Popular" },
    { name: "Accessory #2", price: "$39.99" },
    { name: "Accessory #3", price: "$35.35" },
  ]

  // CMS related products → bundle items, with fallback to props then defaults
  const cmsItems: BundleItem[] | null = cmsRelated && cmsRelated.length > 0
    ? cmsRelated.slice(0, 6).map((rp) => ({
        name: rp.name,
        price: rp.price,
        image: rp.image,
      }))
    : null

  const list = items && items.length > 0 ? items : (cmsItems ?? DEFAULT_ITEMS)
  const totalStr = list.reduce((sum, item) => sum + parseFloat((item.price || "$0").replace("$", "")), 0).toFixed(2)
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
        {overline && (
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-content)", margin: "0 0 10px" }}>{overline}</p>
        )}
        <h2 style={{ fontSize: "var(--h3-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: "0 0 32px" }}>
          {heading}
        </h2>

        <div style={{ display: "flex", alignItems: "stretch", gap: 20, flexWrap: "nowrap", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }} className="[&::-webkit-scrollbar]:hidden">
          {list.map((item, i) => (
            <div key={i} style={{ background: "#2d353c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, overflow: "hidden", width: 180, flexShrink: 0 }}>
              <div style={{ aspectRatio: "1", background: "#37474f", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {item.image
                  ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ced4da" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /></svg>
                }
                {item.badge && (
                  <span style={{ position: "absolute", top: 8, left: 8, background: "var(--color-accent)", color: "#fff", fontSize: 9, fontFamily: "'Barlow', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 6px", borderRadius: 2 }}>{item.badge}</span>
                )}
              </div>
              <div style={{ padding: 12 }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", margin: "0 0 4px", lineHeight: 1.3 }}>{item.name}</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--color-primary)", margin: 0 }}>{item.price}</p>
              </div>
            </div>
          ))}

          {/* Total + Add All inline as last item */}
          <div style={{ background: "#2d353c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "24px", minWidth: 200, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-content)", margin: "0 0 8px" }}>Total Price:</p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 24, fontWeight: 700, color: "var(--color-title)", margin: "0 0 20px" }}>${totalStr}</p>
            <button className="sg-btn-solid-md" style={{ width: "100%", justifyContent: "center" }}>
              {buttonText} +
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
})

export default BundleProducts
