"use client"

import { forwardRef, useState, type Ref } from "react"

interface FAQ {
  question?: string
  answer?: string
}

interface ProductFAQProps {
  className?: string
  sectionStyle?: string
  heading?: string
  headingAccent?: string
  faqs?: FAQ[]
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  paddingTop?: number
  paddingBottom?: number
}

const DEFAULT_FAQS: FAQ[] = [
  { question: "What is the warranty on CAST Lighting products?", answer: "All CAST Lighting fixtures come with a lifetime warranty against defects in materials and workmanship. This covers the brass and copper body, the LED module, and all electrical components. Simply contact us with proof of purchase and we'll replace or repair at no cost." },
  { question: "Are CAST fixtures compatible with all 12V transformers?", answer: "CAST fixtures are designed to work with any quality 12V low-voltage transformer. For best performance and warranty coverage, we recommend using CAST transformers, which are specifically tuned for our LED modules and include smart protection features." },
  { question: "Can I use these fixtures in wet or submerged locations?", answer: "CAST path, accent, and area lights carry an IP67 waterproof rating, meaning they are fully protected against dust and can withstand temporary submersion up to 1 meter for 30 minutes. In-grade and well lights carry IP68 for permanent submersion applications." },
]

const ProductFAQ = forwardRef(function ProductFAQ(
  {
    className,
    sectionStyle,
    heading = "Frequently Asked Questions",
    headingAccent = "",
    faqs,
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    paddingTop,
    paddingBottom,
  }: ProductFAQProps,
  ref: Ref<HTMLDivElement>
) {
  const [open, setOpen] = useState<number | null>(null)
  const list = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || "#25262d"

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
      <div className="site-container" style={{ maxWidth: 860, textAlign: "left", marginLeft: "max(64px, calc((100vw - 1600px) / 2 + 64px))", marginRight: "auto" }}>
        <h2 style={{ fontSize: "var(--h2-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: "0 0 32px" }}>
          {heading}{headingAccent && <> <span className="text-gradient-warm">{headingAccent}</span></>}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {list.map((faq, i) => (
            <div key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, fontWeight: 600, color: "var(--color-title)", lineHeight: 1.3 }}>{faq.question}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" style={{ flexShrink: 0, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 200ms" }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {open === i && (
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "var(--color-content)", lineHeight: 1.7, margin: "0 0 20px", paddingRight: 36 }}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
      </div>
      </div>
    </div>
  )
})

export default ProductFAQ
