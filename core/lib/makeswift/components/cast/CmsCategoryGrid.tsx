"use client"
import { forwardRef, type Ref } from "react"
import { useCmsData } from "~/lib/makeswift/cms-context"
import { getTheme } from "~/lib/makeswift/theme"

export interface CmsCategoryGridProps {
  className?: string
  bgColor?: string
  columns?: number
}

const PLACEHOLDER_CATEGORIES = [
  { name: "Path & Area Lights",  href: "/category/26",  image: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/119/738/caledbt_color-wheel-960x960-3092282884__17955.1762461221.jpg" },
  { name: "Spot & Accent",       href: "/category/31",  image: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/116/700/sspk12_1-960x960-52278476__36183.1762461221.jpg" },
  { name: "Well & Ground",       href: "/category/35",  image: null },
  { name: "Deck & Wall",         href: "/category/30",  image: null },
  { name: "Down Lights",         href: "/category/32",  image: null },
  { name: "Transformers",        href: "/category/45",  image: null },
  { name: "Accessories",         href: "/category/19",  image: null },
  { name: "All Products",        href: "/category/23",  image: null },
]

const CmsCategoryGrid = forwardRef(function CmsCategoryGrid(
  {
    className,
    bgColor = "#F5F5F5",
    columns = 4,
  }: CmsCategoryGridProps,
  ref: Ref<HTMLElement>
) {
  const cms = useCmsData()
  const t = getTheme("light")

  // On live pages, use subcategories from CMS context; fall back to placeholders in editor
  const subcategories: { name: string; href: string; image?: string | null }[] =
    (cms?.meta?.subcategories && cms.meta.subcategories.length > 0)
      ? cms.meta.subcategories
      : PLACEHOLDER_CATEGORIES

  // If live page has no subcategories at all, render nothing
  if (cms && (!cms.meta?.subcategories || cms.meta.subcategories.length === 0)) {
    return null
  }

  const cols = Math.min(Math.max(columns ?? 4, 1), 6)

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={`cast-cms-category-grid-defaults ${className || ""}`}
      style={{ background: bgColor, fontFamily: "'Barlow', sans-serif" }}
    >
      <style>{`
        .cast-cms-category-grid-defaults { padding-top: 48px; padding-bottom: 64px; }
        @media (max-width: 1024px) { .cast-cms-category-grid-defaults { padding-top: 38px; padding-bottom: 51px; } }
        @media (max-width: 768px)  { .cast-cms-category-grid-defaults { padding-top: 31px; padding-bottom: 41px; } }
        @media (max-width: 640px)  { .cast-cms-category-grid-defaults { padding-top: 26px; padding-bottom: 35px; } }
        .ccg-grid {
          display: grid;
          grid-template-columns: repeat(${cols}, 1fr);
          gap: 20px;
        }
        @media (max-width: 1200px) { .ccg-grid { grid-template-columns: repeat(${Math.min(cols, 3)}, 1fr); } }
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
          box-shadow: 0 4px 24px rgba(0,73,96,0.12);
        }
        .ccg-card-name {
          font-family: 'Essonnes','Playfair Display',serif;
          font-size: 17px;
          font-weight: 700;
          color: ${t.heading};
          margin: 0 0 6px;
          line-height: 1.25;
          transition: color 200ms;
        }
        .ccg-card:hover .ccg-card-name { color: ${t.accent}; }
        .ccg-cta {
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: ${t.accent};
        }
      `}</style>

      <div className="site-container" >
        <div className="ccg-grid">
          {subcategories.map((cat, i) => (
            <a key={i} href={cat.href} className="ccg-card">

              {/* Image */}
              <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 300ms" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                ) : (
                  <div style={{
                    width: "100%", height: "100%",
                    background: "linear-gradient(135deg, #014960 0%, #007CB0 60%, #7EBEE8 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                  }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.6, position: "relative", zIndex: 1 }}>
                      <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.5" />
                      <path d="M12 7v5l3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 8 }}>
                <h3 className="ccg-card-name">{cat.name}</h3>
                <span className="ccg-cta">Shop {cat.name} →</span>
              </div>

            </a>
          ))}
        </div>

        {/* Editor note */}
        {!cms && (
          <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: t.subtle, textAlign: "center", marginTop: 32, fontStyle: "italic", opacity: 0.6 }}>
            Live category pages will show real BigCommerce subcategories here.
          </p>
        )}
      </div>
    </div>
  )
})

export default CmsCategoryGrid
