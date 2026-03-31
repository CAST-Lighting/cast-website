"use client"
import { forwardRef, type Ref } from "react"
import { useCmsData } from "~/lib/makeswift/cms-context"
import { getTheme } from "~/lib/makeswift/theme"

export interface CmsCategoryGridProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
}

const PLACEHOLDER_PRODUCTS = Array.from({ length: 8 }, (_, i) => ({
  name: `Product Name Goes Here ${i + 1}`,
  price: `$${(89 + i * 40).toFixed(2)}`,
  sku: `SKU-${String(i + 1).padStart(4, "0")}`,
  image: null as string | null,
  href: "#",
}))

const CmsCategoryGrid = forwardRef(function CmsCategoryGrid(
  {
    className,
    bgColor = "#F5F5F5",
    paddingTop = 48,
    paddingBottom = 64,
  }: CmsCategoryGridProps,
  ref: Ref<HTMLElement>
) {
  const cms = useCmsData()
  const t = getTheme("light")

  const categoryName  = cms?.heading      || "Category Name"
  const description   = cms?.description  || "Professional-grade outdoor fixtures — solid brass and copper, lifetime warranty"
  const productCount  = cms?.meta?.productCount ?? PLACEHOLDER_PRODUCTS.length

  // On live site, CmsCategoryGrid pulls real products via ShopGrid's CMS context.
  // For editor preview, we show styled placeholder cards.
  const products = (cms?.type === "category" && cms.meta?.relatedProducts && cms.meta.relatedProducts.length > 0)
    ? cms.meta.relatedProducts.map(p => ({
        name:  p.name,
        price: p.price,
        sku:   (p as { sku?: string }).sku ?? "",
        image: p.image ?? null,
        href:  p.href,
      }))
    : PLACEHOLDER_PRODUCTS

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={className || ""}
      style={{ background: bgColor, minHeight: 200 }}
    >
      <style>{`
        .ccg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1200px) { .ccg-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .ccg-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .ccg-grid { grid-template-columns: 1fr; } }
        .ccg-card {
          background: ${t.cardBg};
          border: 1px solid ${t.cardBorder};
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          transition: border-color 200ms, box-shadow 200ms;
        }
        .ccg-card:hover {
          border-color: rgba(0,124,176,0.4);
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
        }
      `}</style>

      <div className="site-container" style={{ paddingTop, paddingBottom }}>

        {/* Category header */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: t.accent, margin: "0 0 10px" }}>
            <span style={{ color: t.subtle }}>Home / Shop / </span>{categoryName}
          </p>
          <h2 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h2-size)", fontWeight: 700, color: t.heading, margin: "0 0 6px", lineHeight: 1.15 }}>
            {categoryName}
          </h2>
          <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 15, color: t.subtle, margin: 0 }}>
            {cms ? `${productCount} product${productCount !== 1 ? "s" : ""}` : description}
          </p>
        </div>

        {/* Product cards */}
        <div className="ccg-grid">
          {products.map((product, i) => (
            <a key={i} href={product.href} className="ccg-card">

              {/* Image */}
              <div style={{ aspectRatio: "1/1", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                {product.image ? (
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a2e3a 0%, #0d4a5c 50%, #1a3a4a 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(175,229,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(175,229,253,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4, position: "relative", zIndex: 1 }}>
                      <circle cx="12" cy="12" r="10" stroke="#7EBEE8" strokeWidth="1.5" />
                      <path d="M8 12h8M12 8v8" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info + CTA — pinned bottom */}
              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  <h3 className="heading-card-sm" style={{ margin: 0, color: t.heading }}>{product.name}</h3>
                  {product.sku && (
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 600, color: t.subtle, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
                      #{product.sku}
                    </p>
                  )}
                  <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 18, fontWeight: 700, color: t.heading, margin: 0 }}>
                    {product.price}
                  </p>
                </div>
                <div style={{ marginTop: 14 }}>
                  <span className={t.btnPrimary} style={{ display: "block", textAlign: "center", justifyContent: "center" }}>
                    View Product →
                  </span>
                </div>
              </div>

            </a>
          ))}
        </div>

        {/* Editor note */}
        {!cms && (
          <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: t.subtle, textAlign: "center", marginTop: 32, fontStyle: "italic", opacity: 0.6 }}>
            Live category pages will show real BigCommerce products here.
          </p>
        )}

      </div>
    </div>
  )
})

export default CmsCategoryGrid
