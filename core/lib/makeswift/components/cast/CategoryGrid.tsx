"use client"
import { forwardRef, type Ref, useState, useEffect } from "react"
import { Lightbulb, Sun, CircleDot, Lamp, SquareAsterisk, Zap, Focus } from "lucide-react"
import { getTheme } from "~/lib/makeswift/theme"

const defaultBgSrc = "https://storage.googleapis.com/s.mkswft.com/RmlsZTpkZDVmYmU0ZS1hMzE3LTRlYWYtODg0Zi0wY2Q0MWVlOWU2ZTk=/background-6.jpg"

const categoryIcons = [Lamp, Zap, Sun, CircleDot, SquareAsterisk, Zap, Focus, Lightbulb]

interface BCCategory { name: string; path: string }

interface CategoryItem { name?: string; href?: string }

const FALLBACK_CATEGORIES = [
  { name: "Path & Area Lights", href: "/category/26" },
  { name: "Spot & Accent", href: "/category/31" },
  { name: "Well & Ground", href: "/category/35" },
  { name: "Deck & Wall", href: "/category/30" },
  { name: "Down Lights", href: "/category/32" },
  { name: "Transformers", href: "/category/45" },
  { name: "Accessories", href: "/category/19" },
  { name: "All Products", href: "/category/23" },
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
    mode = 'light',
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
    mode?: 'dark' | 'light'
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

  const t = getTheme(mode)
  const bgImageUrl = bgImage
  const resolvedImgSrc = bgImageUrl || defaultBgSrc
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || t.bg

  // Build display categories: prop list → BC categories → fallback
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

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{ width: '100%', fontFamily: "'Barlow', sans-serif", background: isLight ? sectionBackground : undefined, } as React.CSSProperties}
    >
      {/* bg image + overlay — dark mode only */}
      {!isLight && (
        <>
          <img
            src={resolvedImgSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          />
          <div className="absolute inset-0" style={{ zIndex: 1, background: sectionBackground, opacity: overlayOpacity }} />
        </>
      )}

      {/* content */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h2-size)", fontWeight: 700, color: t.heading, margin: "0 0 12px" }}>
              {sectionTitle || "Product"}{" "}
              <span className="text-gradient-warm">{sectionTitleAccent || "Categories"}</span>
            </h2>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 16, color: t.body, margin: 0 }}>
              {sectionDescription || "Explore our full range of professional landscape lighting solutions."}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            {displayCategories.map((cat, i) => {
              const Icon = categoryIcons[i % categoryIcons.length] as React.ElementType
              return (
                <a key={i} href={cat.href} className="cat-card">
                  <Icon className="cat-icon" style={{ width: 32, height: 32 }} />
                  <span className="cat-label">{cat.name}</span>
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
