"use client"
import { forwardRef, type Ref, useState, useEffect } from "react"
import { getTheme } from "~/lib/makeswift/theme"

interface BCCategory { name: string; path: string; imageUrl?: string; productCount?: number }
interface CategoryItem { name?: string; href?: string; image?: string; productCount?: number }

const FALLBACK_CATEGORIES: CategoryItem[] = [
  { name: "Path & Area Lights",  href: "/category/path-lights" },
  { name: "Spot & Accent",       href: "/category/spot-accent" },
  { name: "Well & Ground",       href: "/category/well-ground" },
  { name: "Deck & Wall",         href: "/category/deck-wall" },
  { name: "Down Lights",         href: "/category/down-lights" },
  { name: "Transformers",        href: "/category/transformers" },
  { name: "Accessories",         href: "/category/accessories" },
  { name: "All Products",        href: "/category/all" },
]

// Category placeholder — decorative grid pattern matching ShopGrid
const CategoryPlaceholder = ({ name }: { name: string }) => (
  <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a2e3a 0%, #0d4a5c 50%, #1a3a4a 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, position: "relative" }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(175,229,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(175,229,253,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.45, position: "relative", zIndex: 1 }}>
      <circle cx="12" cy="12" r="10" stroke="#7EBEE8" strokeWidth="1.5" />
      <path d="M8 12h8M12 8v8" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,124,176,0.7)", position: "relative", zIndex: 1, textAlign: "center", maxWidth: 100, padding: "0 8px" }}>
      {name}
    </span>
  </div>
)

const CategoryGrid = forwardRef(function CategoryGrid(
  {
    className,
    bgImage,
    bgColor,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    paddingTop,
    paddingBottom,
    sectionTitle,
    sectionTitleAccent,
    sectionDescription,
    categories: propCategories,
    mode = 'dark',
  }: {
    className?: string
    bgImage?: string
    bgColor?: string
    bgOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    gradientDirection?: string
    paddingTop?: number
    paddingBottom?: number
    sectionTitle?: string
    sectionTitleAccent?: string
    sectionDescription?: string
    categories?: CategoryItem[]
    mode?: 'dark' | 'light'
  },
  ref: Ref<HTMLElement>
) {
  const [bcCategories, setBcCategories] = useState<BCCategory[]>([])

  useEffect(() => {
    fetch('/api/cast/categories')
      .then(r => r.json())
      .then((data: BCCategory[]) => { if (data?.length > 0) setBcCategories(data) })
      .catch(() => {})
  }, [])

  const t = getTheme(mode)
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || t.bg

  const hasPropCategories = propCategories && propCategories.length > 0
  const displayCategories: CategoryItem[] = hasPropCategories
    ? propCategories.map((cat, i) => ({
        name:         cat.name  || bcCategories[i]?.name  || FALLBACK_CATEGORIES[i]?.name  || `Category ${i + 1}`,
        href:         cat.href  || bcCategories[i]?.path  || '#',
        image:        cat.image || bcCategories[i]?.imageUrl,
        productCount: cat.productCount ?? bcCategories[i]?.productCount,
      }))
    : bcCategories.length > 0
      ? bcCategories.slice(0, 8).map(c => ({ name: c.name, href: c.path, image: c.imageUrl, productCount: c.productCount }))
      : FALLBACK_CATEGORIES

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{ paddingTop: paddingTop ?? 96, paddingBottom: paddingBottom ?? 96, position: "relative" } as React.CSSProperties}
    >
      {/* Background */}
      {bgImage && <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />}
      <div className="absolute inset-0" style={{ zIndex: 1, background: sectionBackground, opacity: bgImage ? overlayOpacity : 1 }} />

      <style>{`
        .cg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1200px) { .cg-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .cg-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .cg-grid { grid-template-columns: 1fr; } }
        .cg-card {
          background: ${t.cardBg};
          border: 1px solid ${t.cardBorder};
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          transition: border-color 200ms, box-shadow 200ms, transform 200ms;
        }
        .cg-card:hover {
          border-color: rgba(0,124,176,0.45);
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          transform: translateY(-2px);
        }
        .cg-card:hover .cg-btn { background: #005f8a; }
      `}</style>

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container">

          {/* Section heading */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="heading-style-h2 text-foreground mb-3 opacity-100">
              {sectionTitle?.trim() || "Product"}{" "}
              {sectionTitleAccent?.trim() && (
                <span className="text-gradient-warm">{sectionTitleAccent}</span>
              )}
            </h2>
            {sectionDescription?.trim() && (
              <p className="section-desc">{sectionDescription}</p>
            )}
          </div>

          {/* Cards */}
          <div className="cg-grid">
            {displayCategories.map((cat, i) => (
              <a key={i} href={cat.href || "#"} className="cg-card">

                {/* Image */}
                <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <CategoryPlaceholder name={cat.name || ""} />
                  )}
                </div>

                {/* Info + CTA — pinned bottom */}
                <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <h3 className="heading-card-sm" style={{ margin: "0 0 4px", color: t.heading }}>
                      {cat.name || "Category"}
                    </h3>
                    {cat.productCount != null && (
                      <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, color: t.subtle, margin: 0, fontWeight: 600 }}>
                        {cat.productCount} {cat.productCount === 1 ? "product" : "products"}
                      </p>
                    )}
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <span
                      className={`cg-btn ${t.btnPrimary}`}
                      style={{ display: "block", textAlign: "center", justifyContent: "center" }}
                    >
                      Shop Now →
                    </span>
                  </div>
                </div>

              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
})

export default CategoryGrid
