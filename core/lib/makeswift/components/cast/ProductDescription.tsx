"use client"

import { forwardRef, type Ref } from "react"

interface ProductDescriptionProps {
  className?: string
  sectionStyle?: string
  heading?: string
  description?: string
  bulletPoints?: Array<{ text?: string }>
  bgColor?: string
}

const DEFAULT_BULLETS = [
  { text: "Solid brass construction — will never rust, corrode, or fade" },
  { text: "5.5W LED module — 400 lumen output, 2700K warm white" },
  { text: "IP67 waterproof rating — suitable for all weather conditions" },
  { text: "Compatible with all CAST 12V transformers" },
  { text: "Unique mounting stake with locking collar" },
  { text: "Lifetime warranty against defects and weather damage" },
]

const ProductDescription = forwardRef(function ProductDescription(
  {
    className,
    sectionStyle,
    heading = "Product Description",
    description,
    bulletPoints,
    bgColor,
  }: ProductDescriptionProps,
  ref: Ref<HTMLDivElement>
) {
  const bullets = bulletPoints && bulletPoints.length > 0 ? bulletPoints : DEFAULT_BULLETS
  const body = description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed enim fringilla, suscipit felis eget, euismod nisi. Vestibulum ac fermentum ex, ac cursus sem. Nam vel bibendum erat. Pellentesque blandit viverra viverra. Nullam vestibulum ex eget gravida volutpat.\n\nPhasellus laoreet gravida libero, at porttitor diam fringilla at. Sed ac orci facilisis, placerat augue a, pulvinar enim. Integer volutpat velit nulla, vel varius purus elementum at. Cras euismod semper mi, at bibendum odio tincidunt vitae.\n\nPellentesque blandit viverra viverra. Nullam vestibulum ex eget gravida volutpat. Phasellus laoreet gravida libero, at porttitor diam fringilla at."

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: "#25262d", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="site-container" style={{ paddingTop: 56, paddingBottom: 56, maxWidth: 860 }}>
        <h2 style={{ fontSize: "var(--h3-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: "0 0 24px" }}>
          {heading}
        </h2>
        {body.split("\n\n").map((para, i) => (
          <p key={i} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "var(--color-content)", lineHeight: 1.7, margin: "0 0 18px" }}>{para}</p>
        ))}
        {bullets.length > 0 && (
          <ul style={{ margin: "16px 0 0", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "var(--color-content)", lineHeight: 1.6 }}>{b.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
})

export default ProductDescription
