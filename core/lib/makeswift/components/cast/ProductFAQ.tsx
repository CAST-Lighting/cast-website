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
  faqs?: FAQ[]
  bgColor?: string
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
    faqs,
    bgColor,
  }: ProductFAQProps,
  ref: Ref<HTMLDivElement>
) {
  const [open, setOpen] = useState<number | null>(null)
  const list = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: bgColor || "#ffffff", borderTop: "1px solid #e9ecef" }}
    >
      <div className="site-container" style={{ paddingTop: 56, paddingBottom: 56, maxWidth: 860 }}>
        <h2 style={{ fontSize: "var(--h3-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: "0 0 32px" }}>
          {heading}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {list.map((faq, i) => (
            <div key={i} style={{ borderTop: "1px solid #e9ecef" }}>
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
          <div style={{ borderTop: "1px solid #e9ecef" }} />
        </div>
      </div>
    </div>
  )
})

export default ProductFAQ
