"use client"

import { forwardRef, type Ref } from "react"

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
}

const DEFAULT_PARTS: Part[] = [
  { name: "Replacement LED Module 5.5W", price: "$24.99", partNumber: "LED-55-2700K" },
  { name: "Brass Mounting Stake 12\"", price: "$9.99", partNumber: "STK-12-BR" },
  { name: "Locking Collar Assembly", price: "$7.99", partNumber: "COL-ASY-BR" },
  { name: "Lens & Gasket Kit", price: "$14.99", partNumber: "LNS-GSK-KT" },
]

const PartsGrid = forwardRef(function PartsGrid(
  {
    className,
    sectionStyle,
    overline = "Need Parts?",
    heading = "Parts For This Product",
    parts,
    bgColor,
  }: PartsGridProps,
  ref: Ref<HTMLDivElement>
) {
  const list = parts && parts.length > 0 ? parts : DEFAULT_PARTS

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: "#25262d", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="site-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        {overline && (
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-content)", margin: "0 0 10px" }}>{overline}</p>
        )}
        <h2 style={{ fontSize: "var(--h3-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: "0 0 28px" }}>
          {heading}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {list.map((part, i) => (
            <div key={i} style={{ background: "#2d353c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ aspectRatio: "1", background: "#37474f", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {part.image
                  ? <img src={part.image} alt={part.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#adb5bd" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /></svg>
                }
              </div>
              <div style={{ padding: "14px" }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", margin: "0 0 4px", lineHeight: 1.3 }}>{part.name}</p>
                {part.partNumber && <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "var(--color-content)", margin: "0 0 8px" }}>#{part.partNumber}</p>}
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--color-primary)", margin: "0 0 10px" }}>{part.price}</p>
                <div style={{ display: "flex", gap: 6 }}>
                  <a href={part.href || "#"} className="sg-btn-solid-sm" style={{ flex: 1, justifyContent: "center", textDecoration: "none" }}>Add Cart</a>
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
  )
})

export default PartsGrid
