"use client"
import { forwardRef, useState, type Ref } from "react"
import { useCmsData } from "~/lib/makeswift/cms-context"

export interface CmsProductContentProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
}

const PLACEHOLDER_IMAGES = [
  { src: "https://placehold.co/600x600/1a2332/007CB0?text=Product+Image+1", alt: "Product image 1" },
  { src: "https://placehold.co/600x600/1a2332/7EBEE8?text=Product+Image+2", alt: "Product image 2" },
  { src: "https://placehold.co/600x600/1a2332/014960?text=Product+Image+3", alt: "Product image 3" },
]

const CmsProductContent = forwardRef(function CmsProductContent(
  {
    className,
    bgColor = "#0f1923",
    paddingTop = 48,
    paddingBottom = 64,
  }: CmsProductContentProps,
  ref: Ref<HTMLElement>
) {
  const cms = useCmsData()
  const [selectedImage, setSelectedImage] = useState(0)

  const images = cms?.meta?.images || PLACEHOLDER_IMAGES
  const price = cms?.meta?.price || "$349.00"
  const brand = cms?.meta?.brand || "CAST Lighting"
  const name = cms?.heading || "Professional Brass Path Light"

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={className || ""}
      style={{ background: bgColor, minHeight: 200 }}
    >
      <div
        className="site-container"
        style={{ paddingTop, paddingBottom }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div style={{
              borderRadius: 10,
              overflow: "hidden",
              background: "#1a2332",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: 16,
            }}>
              <img
                src={images[selectedImage]?.src}
                alt={images[selectedImage]?.alt || name}
                style={{ width: "100%", display: "block", aspectRatio: "1", objectFit: "cover" }}
              />
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: "flex", gap: 8 }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 6,
                      overflow: "hidden",
                      border: i === selectedImage
                        ? "2px solid #007CB0"
                        : "2px solid rgba(255,255,255,0.1)",
                      cursor: "pointer",
                      padding: 0,
                      background: "none",
                      transition: "border-color 200ms",
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Brand */}
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#007CB0",
              margin: "0 0 12px",
            }}>
              {brand}
            </p>

            {/* Product Name */}
            <h1 style={{
              fontFamily: "'Essonnes', 'Playfair Display', serif",
              fontSize: "var(--h2-size)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.15,
              margin: "0 0 20px",
            }}>
              {name}
            </h1>

            {/* Price */}
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 24px",
            }}>
              {price}
            </p>

            {/* Description placeholder */}
            {!cms && (
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                margin: "0 0 32px",
              }}>
                Professional-grade outdoor lighting fixture crafted from solid brass or copper. Built to withstand the elements with a lifetime warranty. Perfect for residential and commercial landscape projects.
              </p>
            )}

            {/* CTA Buttons placeholder */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="#"
                className="sg-btn-solid-md"
                style={{ textDecoration: "none" }}
              >
                Add to Cart
              </a>
              <a
                href="/contact"
                className="sg-btn-outline-dark-md"
                style={{ textDecoration: "none" }}
              >
                Request Quote
              </a>
            </div>

            {/* Features list */}
            <div style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}>
              {[
                "Solid brass construction",
                "Lifetime warranty included",
                "12V low voltage — safe for any yard",
                "Field-serviceable LED module",
              ].map((feature, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 0",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3 3 7-7" stroke="#007CB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.65)",
                  }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CmsProductContent
