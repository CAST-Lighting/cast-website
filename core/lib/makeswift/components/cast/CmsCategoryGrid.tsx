"use client"
import { forwardRef, type Ref } from "react"
import { useCmsData } from "~/lib/makeswift/cms-context"

export interface CmsCategoryGridProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
  columns?: number
}

const PLACEHOLDER_PRODUCTS = Array.from({ length: 8 }, (_, i) => ({
  name: `Product ${i + 1}`,
  price: `$${(199 + i * 50).toFixed(2)}`,
  image: `https://placehold.co/400x400/1a2332/007CB0?text=Product+${i + 1}`,
  href: "#",
  category: "Outdoor Lighting",
}))

const CmsCategoryGrid = forwardRef(function CmsCategoryGrid(
  {
    className,
    bgColor = "#0f1923",
    paddingTop = 48,
    paddingBottom = 64,
    columns = 4,
  }: CmsCategoryGridProps,
  ref: Ref<HTMLElement>
) {
  const cms = useCmsData()

  const categoryName = cms?.heading || "Category Name"
  const description = cms?.description || `${PLACEHOLDER_PRODUCTS.length} professional-grade fixtures — solid brass and copper, lifetime warranty`
  const productCount = cms?.meta?.productCount ?? PLACEHOLDER_PRODUCTS.length

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={className || ""}
      style={{ background: bgColor, minHeight: 200 }}
    >
      <div className="site-container" style={{ paddingTop, paddingBottom }}>
        {/* Category Header */}
        <div style={{ marginBottom: 36 }}>
          {/* Breadcrumb */}
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "#007CB0",
            margin: "0 0 12px",
          }}>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Home / Shop / </span>
            {categoryName}
          </p>

          <h2 style={{
            fontFamily: "'Essonnes', 'Playfair Display', serif",
            fontSize: "var(--h3-size)",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 8px",
            lineHeight: 1.15,
          }}>
            {categoryName}
          </h2>

          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 15,
            color: "rgba(255,255,255,0.55)",
            margin: 0,
          }}>
            {cms
              ? `${productCount} product${productCount !== 1 ? "s" : ""}`
              : description}
          </p>
        </div>

        {/* Product Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 24,
        }}>
          {PLACEHOLDER_PRODUCTS.map((product, i) => (
            <a
              key={i}
              href={product.href}
              style={{
                textDecoration: "none",
                background: "#1a2332",
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "all 200ms",
                display: "block",
              }}
            >
              <div style={{
                aspectRatio: "1",
                background: "#141c27",
                overflow: "hidden",
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 300ms",
                  }}
                />
              </div>
              <div style={{ padding: "16px 18px" }}>
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#007CB0",
                  margin: "0 0 6px",
                }}>
                  {product.category}
                </p>
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#fff",
                  margin: "0 0 8px",
                  lineHeight: 1.3,
                }}>
                  {product.name}
                </p>
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.85)",
                  margin: 0,
                }}>
                  {product.price}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Info note for editor */}
        {!cms && (
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
            textAlign: "center",
            marginTop: 32,
            fontStyle: "italic",
          }}>
            This grid shows placeholder products. On live category pages, real products from BigCommerce will appear here.
          </p>
        )}
      </div>
    </div>
  )
})

export default CmsCategoryGrid
