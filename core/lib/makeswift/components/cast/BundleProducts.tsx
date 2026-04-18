"use client"

import { forwardRef, type Ref } from "react"
import { useCmsData } from "~/lib/makeswift/cms-context"
import { getTheme } from "~/lib/makeswift/theme"

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
  headingAccent?: string
  items?: BundleItem[]
  buttonText?: string
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  mode?: 'dark' | 'light'
}

const BundleProducts = forwardRef(function BundleProducts(
  {
    className,
    sectionStyle,
    overline = "Frequently Bought Together",
    heading = "Bundle These Products",
    headingAccent = "",
    items,
    buttonText = "Add All To Cart",
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection
    mode = 'dark',
  }: BundleProductsProps,
  ref: Ref<HTMLDivElement>
) {
  const cms = useCmsData()
  const cmsRelated = cms?.type === 'product' ? cms.meta?.relatedProducts : null
  const t = getTheme(mode)

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
    : bgColor || "#f0f2f5"

  return (
    <div
      ref={ref}
      className={`cast-bundle-products-defaults ${className || ""} ${sectionStyle || ""}`}
      style={{ position: "relative", width: "100%", boxSizing: "border-box", ...(!bgImage ? { background: sectionBackground } : {}), }}
    >
      <style>{`\n        .cast-bundle-products-defaults { padding-top: 72px; padding-bottom: 72px; }\n        @media (max-width: 1024px) { .cast-bundle-products-defaults { padding-top: 57px; padding-bottom: 57px; } }\n        @media (max-width: 768px)  { .cast-bundle-products-defaults { padding-top: 46px; padding-bottom: 46px; } }\n        @media (max-width: 640px)  { .cast-bundle-products-defaults { padding-top: 39px; padding-bottom: 39px; } }\n      `}</style>
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
        <h2 style={{ fontSize: "var(--h2-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: "0 0 32px" }}>
          {heading}{headingAccent && <> <span className="text-gradient-warm">{headingAccent}</span></>}
        </h2>

        <div style={{ display: "flex", alignItems: "stretch", gap: 20, flexWrap: "nowrap", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }} className="[&::-webkit-scrollbar]:hidden">
          {list.map((item, i) => (
            <div key={i} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: 10, overflow: "hidden", width: 220, minWidth: 220, maxWidth: 220, flexShrink: 0, transition: "border-color 200ms, box-shadow 200ms" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,124,176,0.4)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = t.cardBorder; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div style={{ aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                {item.image
                  ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                {item.badge && (
                  <span style={{ position: "absolute", top: 8, left: 8, background: "var(--color-accent, #007CB0)", color: "#fff", fontSize: 9, fontFamily: "'Barlow', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 6px", borderRadius: 4 }}>{item.badge}</span>
                )}
              </div>
              <div style={{ padding: "14px 14px" }}>
                <h3 className="heading-card-sm" style={{ margin: "0 0 6px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{item.name}</h3>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, fontWeight: 700, color: t.heading, margin: 0 }}>{item.price}</p>
              </div>
            </div>
          ))}

          {/* Total + Add All inline as last item */}
          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: 10, padding: "24px", minWidth: 220, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: t.body, margin: "0 0 8px" }}>Total Price:</p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 24, fontWeight: 700, color: t.heading, margin: "0 0 20px" }}>${totalStr}</p>
            <button className={t.btnPrimary} style={{ width: "100%", justifyContent: "center" }}>
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
