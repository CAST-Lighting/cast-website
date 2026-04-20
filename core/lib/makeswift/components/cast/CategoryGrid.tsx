"use client"
import { forwardRef, type Ref, useState, useEffect } from "react"
import { Lightbulb, Sun, CircleDot, Lamp, SquareAsterisk, Zap, Focus } from "lucide-react"
import { getTheme } from "~/lib/makeswift/theme"

const categoryIcons = [Lamp, Zap, Sun, CircleDot, SquareAsterisk, Zap, Focus, Lightbulb]

interface BCCategory { name: string; path: string }
interface CategoryItem { name?: string; href?: string }

const FALLBACK_CATEGORIES = [
  { name: "Path & Area Lights", href: "/category/26" },
  { name: "Spot & Accent",      href: "/category/31" },
  { name: "Well & Ground",      href: "/category/35" },
  { name: "Deck & Wall",        href: "/category/30" },
  { name: "Down Lights",        href: "/category/32" },
  { name: "Transformers",       href: "/category/45" },
  { name: "Accessories",        href: "/category/19" },
  { name: "All Products",       href: "/category/23" },
]

const CategoryGrid = forwardRef(function CategoryGrid(
  {
    className,
    bgImage,
    bgColor,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    lineHeight,
    sectionTitle,
    sectionTitleAccent,
    sectionDescription,
    categories: propCategories,
    columns = 6,
    mode = 'light',
    lightMode,
  }: {
    className?: string
    bgImage?: string
    bgColor?: string
    bgOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    gradientDirection?: string
    lineHeight?: number
    sectionTitle?: string
    sectionTitleAccent?: string
    sectionDescription?: string
    categories?: CategoryItem[]
    columns?: number
    mode?: 'dark' | 'light'
    lightMode?: boolean
  },
  ref: Ref<HTMLElement>
) {
  const [bcCategories, setBcCategories] = useState<BCCategory[]>([])

  useEffect(() => {
    fetch('/api/cast/categories')
      .then((r) => r.json())
      .then((data: BCCategory[]) => { if (data.length > 0) setBcCategories(data) })
      .catch(() => {})
  }, [])

  const t = getTheme(lightMode ? 'light' : mode)
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = lightMode
    ? '#F5F5F5'
    : hasGradient
      ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
      : bgColor || t.bg

  const hasPropCategories = propCategories && propCategories.length > 0
  const displayCategories = hasPropCategories
    ? propCategories.map((cat, i) => ({
        name: cat.name || bcCategories[i]?.name || FALLBACK_CATEGORIES[i]?.name || `Category ${i + 1}`,
        href: cat.href || bcCategories[i]?.path || '#',
      }))
    : bcCategories.length > 0
      ? bcCategories.slice(0, 8).map((cat) => ({ name: cat.name, href: cat.path }))
      : FALLBACK_CATEGORIES

  const isLight = mode === 'light'
  const cols = Math.min(Math.max(columns ?? 6, 1), 8)

  return (
    <section
      ref={ref}
      className={`cast-section-default relative overflow-hidden ${className || ""}`}
      style={{ width: '100%', fontFamily: "'Barlow', sans-serif", ...(!bgImage ? { background: sectionBackground } : {}) } as React.CSSProperties}
    >
      <style>{`
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(${cols}, 1fr);
          gap: 20px;
        }
        @media (max-width: 1100px) { .cat-grid { grid-template-columns: repeat(${Math.min(cols, 4)}, 1fr); } }
        @media (max-width: 900px)  { .cat-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px)  { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 380px)  { .cat-grid { grid-template-columns: 1fr; } }
        .cat-card {
          background: ${t.cardBg};
          border: 1px solid ${t.cardBorder};
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          padding: 18px 14px 14px;
          gap: 10px;
          transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
          text-align: center;
        }
        .cat-card:hover {
          border-color: rgba(0,124,176,0.45);
          box-shadow: 0 4px 20px rgba(0,0,0,0.10);
          transform: translateY(-2px);
        }
        .cat-icon-wrap {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(0,124,176,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 200ms ease;
        }
        .cat-card:hover .cat-icon-wrap {
          background: rgba(0,124,176,0.16);
        }
        .cat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 13px; font-weight: 700;
          color: ${t.heading};
          line-height: 1.3;
        }
        .cat-cta {
          font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 600;
          color: ${t.accent};
          margin-top: auto;
        }
      `}</style>

      {/* bg image + overlay — dark mode */}
      {!isLight && bgImage && (
        <>
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
          <div className="absolute inset-0" style={{ zIndex: 1, background: sectionBackground, opacity: overlayOpacity }} />
        </>
      )}

      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container">

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h2-size)", fontWeight: 700, color: t.heading, margin: "0 0 12px" }}>
              {sectionTitle || "Product"}{" "}
              <span className="text-gradient-warm">{sectionTitleAccent || "Categories"}</span>
            </h2>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 16, color: t.body, margin: 0 }}>
              {sectionDescription || "Explore our full range of professional landscape lighting solutions."}
            </p>
          </div>

          {/* Category grid */}
          <div className="cat-grid">
            {displayCategories.map((cat, i) => {
              const Icon = categoryIcons[i % categoryIcons.length] as React.ElementType
              return (
                <a key={i} href={cat.href} className="cat-card">
                  <div className="cat-icon-wrap">
                    <Icon style={{ width: 20, height: 20, color: t.accent }} />
                  </div>
                  <span className="cat-label">{cat.name}</span>
                  <span className="cat-cta">Browse →</span>
                </a>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
})

export default CategoryGrid
