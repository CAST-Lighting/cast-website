"use client"
import { forwardRef, type Ref } from "react"
import { Lightbulb, Sun, CircleDot, Lamp, SquareAsterisk, Zap, Focus } from "lucide-react"

const defaultBgSrc = "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80"

const categoryIcons = [Lamp, Zap, Sun, CircleDot, SquareAsterisk, Zap, Focus, Lightbulb]

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
    cat1Name,
    cat2Name,
    cat3Name,
    cat4Name,
    cat5Name,
    cat6Name,
    cat7Name,
    cat8Name,
    cat1Href,
    cat2Href,
    cat3Href,
    cat4Href,
    cat5Href,
    cat6Href,
    cat7Href,
    cat8Href,
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
    cat1Name?: string
    cat2Name?: string
    cat3Name?: string
    cat4Name?: string
    cat5Name?: string
    cat6Name?: string
    cat7Name?: string
    cat8Name?: string
    cat1Href?: string
    cat2Href?: string
    cat3Href?: string
    cat4Href?: string
    cat5Href?: string
    cat6Href?: string
    cat7Href?: string
    cat8Href?: string
  },
  ref: Ref<HTMLElement>
) {
  const bgImageUrl = bgImage
  const resolvedImgSrc = bgImageUrl || defaultBgSrc
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#003344'

  const catNames = [
    cat1Name || "Path Lights",
    cat2Name || "Spot Lights",
    cat3Name || "Wall Wash",
    cat4Name || "Well Lights",
    cat5Name || "Deck Lights",
    cat6Name || "Flood Lights",
    cat7Name || "Accent Lights",
    cat8Name || "Transformers",
  ]

  const catHrefs = [
    cat1Href || "/shop/path-lights",
    cat2Href || "/shop/spot-lights",
    cat3Href || "/shop/wall-wash",
    cat4Href || "/shop/well-lights",
    cat5Href || "/shop/deck-lights",
    cat6Href || "/shop/flood-lights",
    cat7Href || "/shop/accent-lights",
    cat8Href || "/shop/transformers",
  ]

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
            <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-3 opacity-100">
              {sectionTitle || "Product"} <span className="text-gradient-warm">{sectionTitleAccent || "Categories"}</span>
            </h2>
            <p className="section-desc">
              {sectionDescription || "Explore our full range of professional landscape lighting solutions."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {catNames.map((name, i) => {
              const Icon = categoryIcons[i]
              return (
                <a
                  key={i}
                  href={catHrefs[i]}
                  className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-secondary hover:border-primary/40 hover:bg-secondary/80 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-size-small font-medium text-secondary-foreground group-hover:text-primary text-center transition-colors">
                    {name}
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
