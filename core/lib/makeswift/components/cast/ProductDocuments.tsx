"use client"

import { forwardRef, type Ref } from "react"

interface Doc {
  title?: string
  description?: string
  fileUrl?: string
  fileType?: string
}

interface ProductDocumentsProps {
  className?: string
  sectionStyle?: string
  heading?: string
  headingAccent?: string
  documents?: Doc[]
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  paddingTop?: number
  paddingBottom?: number
}

const DEFAULT_DOCS: Doc[] = [
  { title: "Installation Guide", description: "Step-by-step instructions for mounting, wiring, and aiming your CAST fixture. Includes torque specs and wire gauge recommendations.", fileType: "PDF" },
  { title: "Spec Sheet", description: "Full technical specifications including lumen output, color temperature, beam angle, IP rating, and dimensional drawings.", fileType: "PDF" },
  { title: "Warranty Card", description: "CAST lifetime warranty terms and conditions. Keep this on file for your records and share with your client.", fileType: "PDF" },
  { title: "Photometric Data (IES)", description: "IES photometric file for lighting design software. Use with AGi32, DIALux, or Visual for accurate project proposals.", fileType: "IES" },
  { title: "3D Model (DWG)", description: "AutoCAD 3D model of the fixture for use in landscape design layouts and client presentations.", fileType: "DWG" },
  { title: "Cut Sheet", description: "Single-page summary of features, finishes, and ordering information. Ideal for client proposals and contractor bid packages.", fileType: "PDF" },
]

const FileIcon = ({ type }: { type?: string }) => (
  <div style={{ background: "#007CB0", borderRadius: 3, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: "3px 8px" }}>
    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em" }}>{type || "PDF"}</span>
  </div>
)

const ProductDocuments = forwardRef(function ProductDocuments(
  {
    className,
    sectionStyle,
    heading = "Documents",
    headingAccent = "",
    documents,
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    paddingTop,
    paddingBottom,
  }: ProductDocumentsProps,
  ref: Ref<HTMLDivElement>
) {
  const list = documents && documents.length > 0 ? documents : DEFAULT_DOCS
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || "#f0f2f5"

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
      <div className="site-container">
        <h2 style={{ fontSize: "var(--h2-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "#014960", margin: "0 0 32px" }}>
          {heading}{headingAccent && <> <span className="text-gradient-warm">{headingAccent}</span></>}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {list.map((doc, i) => (
            <div key={i} style={{ background: "#ffffff", border: "1px solid rgba(0,73,96,0.1)", borderRadius: 8, padding: "20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <FileIcon type={doc.fileType} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 600, color: "#014960", margin: "0 0 4px" }}>{doc.title}</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "#1a3a4a", lineHeight: 1.5, margin: "0 0 10px" }}>{doc.description}</p>
                <a href={doc.fileUrl || "#"} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "#7EBEE8", textDecoration: "none" }}>
                  View &amp; Download →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
})

export default ProductDocuments
