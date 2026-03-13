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
  documents?: Doc[]
  bgColor?: string
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
  <div style={{ width: 40, height: 48, background: "var(--color-primary)", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 9, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em" }}>{type || "PDF"}</span>
  </div>
)

const ProductDocuments = forwardRef(function ProductDocuments(
  {
    className,
    sectionStyle,
    heading = "Documents",
    documents,
    bgColor,
  }: ProductDocumentsProps,
  ref: Ref<HTMLDivElement>
) {
  const list = documents && documents.length > 0 ? documents : DEFAULT_DOCS

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: bgColor || "#f6f7f8", borderTop: "1px solid #e9ecef" }}
    >
      <div className="site-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <h2 style={{ fontSize: "var(--h3-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: "0 0 32px" }}>
          {heading}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {list.map((doc, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: 8, padding: "20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <FileIcon type={doc.fileType} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--color-title)", margin: "0 0 4px" }}>{doc.title}</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "var(--color-content)", lineHeight: 1.5, margin: "0 0 10px" }}>{doc.description}</p>
                <a href={doc.fileUrl || "#"} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-accent)", textDecoration: "none" }}>
                  View &amp; Download →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default ProductDocuments
