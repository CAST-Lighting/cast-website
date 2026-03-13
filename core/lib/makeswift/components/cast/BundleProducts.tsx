"use client"

import { forwardRef, type Ref } from "react"

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
}

const DEFAULT_ITEMS: BundleItem[] = [
  { name: "Brass Connectors 10-Pack", price: "$14.99", badge: "ACCESSORY" },
  { name: "Extension Wire 50ft", price: "$24.99", badge: "ACCESSORY" },
  { name: "Landscape Stake Kit 6-Pack", price: "$19.99", badge: "ACCESSORY" },
]

const BundleProducts = forwardRef(function BundleProducts(
  {
    className,
    sectionStyle,
    overline = "Frequently Bought Together",
    heading = "Bundle These Products",
    items,
    buttonText = "Add All To Cart",
    bgColor,
  }: BundleProductsProps,
  ref: Ref<HTMLDivElement>
) {
  const list = items && items.length > 0 ? items : DEFAULT_ITEMS
  const totalStr = list.reduce((sum, item) => sum + parseFloat((item.price || "$0").replace("$", "")), 0).toFixed(2)

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: bgColor || "#25262d", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="site-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        {overline && (
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-content)", margin: "0 0 10px" }}>{overline}</p>
        )}
        <h2 style={{ fontSize: "var(--h3-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: "0 0 32px" }}>
          {heading}
        </h2>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", flex: 1 }}>
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
          </div>

          <div style={{ background: "#2d353c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "24px", minWidth: 200, alignSelf: "center" }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-content)", margin: "0 0 8px" }}>Total Price:</p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 24, fontWeight: 700, color: "var(--color-title)", margin: "0 0 20px" }}>${totalStr}</p>
            <button className="sg-btn-solid-md" style={{ width: "100%", justifyContent: "center" }}>
              {buttonText} +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default BundleProducts
