"use client"
import { forwardRef, type Ref, useState, useEffect } from "react"
import { Lightbulb, Sun, CircleDot, Lamp, SquareAsterisk, Zap, Focus } from "lucide-react"

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
    paddingTop,
    paddingBottom,
    sectionTitle,
    sectionTitleAccent,
    sectionDescription,
    categories: propCategories,
  }: {
    className?: string
    bgImage?: string
    bgColor?: string
    bgOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    gradientDirection?: string
    lineHeight?: number
    paddingTop?: number
    paddingBottom?: number
    sectionTitle?: string
    sectionTitleAccent?: string
    sectionDescription?: string
    categories?: CategoryItem[]
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

  const bgImageUrl = bgImage
  const resolvedImgSrc = bgImageUrl || defaultBgSrc
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#003344'

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

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{ '--section-line-height': lineHeight, paddingTop: paddingTop ?? 96, paddingBottom: paddingBottom ?? 96 } as React.CSSProperties}
    >
      {/* bg image layer */}
      <img
        src={resolvedImgSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      {/* overlay layer */}
      <div className="absolute inset-0" style={{
        zIndex: 1,
        background: sectionBackground,
        opacity: overlayOpacity
      }} />

      {/* content */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container">
          <div className="text-center mb-14">
            <h2 className="heading-style-h2 text-foreground mb-3 opacity-100">
              {sectionTitle || "Product"} <span className="text-gradient-warm">{sectionTitleAccent || "Categories"}</span>
            </h2>
            <p className="section-desc">
              {sectionDescription || "Explore our full range of professional landscape lighting solutions."}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            {displayCategories.map((cat, i) => {
              const Icon = categoryIcons[i % categoryIcons.length] as React.ElementType
              return (
                <a
                  key={i}
                  href={cat.href}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-secondary hover:border-primary/40 hover:bg-secondary/80 transition-all duration-300"
                  style={{ width: 112, flexShrink: 0, padding: '20px 8px' }}
                >
                  <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-size-small font-medium text-secondary-foreground group-hover:text-primary text-center transition-colors" style={{ lineHeight: 1.3 }}>
                    {cat.name}
                  </span>
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
