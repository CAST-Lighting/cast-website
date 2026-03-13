"use client"

import { forwardRef, type Ref } from "react"
import { Lightbulb, Sun, Lamp, CircleDot, SquareAsterisk, Zap, Focus } from "lucide-react"

export interface CategoryItem {
  image?: string
  name?: string
  href?: string
}

export interface CategoryGridProps {
  className?: string
  sectionStyle?: string
  title?: string
  description?: string
  items?: CategoryItem[]
  bgImage?: string
  bgColor?: string
  overlayColor?: string
  overlayOpacity?: number
}

// Lucide icons for default categories
const DefaultIcon = ({ index }: { index: number }) => {
  const icons = [Lamp, Lightbulb, Sun, CircleDot, SquareAsterisk, Zap, Focus, Lightbulb]
  const Icon = icons[index % icons.length]
  return <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
}

const defaultItems: CategoryItem[] = [
  { name: "Path Lights", href: "#" },
  { name: "Spot Lights", href: "#" },
  { name: "Wall Wash", href: "#" },
  { name: "Well Lights", href: "#" },
  { name: "Deck Lights", href: "#" },
  { name: "Flood Lights", href: "#" },
  { name: "Accent Lights", href: "#" },
  { name: "Transformers", href: "#" },
]

const CategoryGrid = forwardRef(function CategoryGrid(
  {
    className,
    sectionStyle,
    title = "Product Categories",
    description = "Explore our full range of professional landscape lighting solutions.",
    items,
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
  }: CategoryGridProps,
  ref: Ref<HTMLElement>
) {
  const cats = (items && items.length > 0 ? items : defaultItems)

  return (
    <section
      ref={ref}
      className={`relative py-24 overflow-hidden ${sectionStyle || ""} ${className || ""}`}
    >
      {/* Background */}
      {bgImage ? (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : null}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: bgColor || "rgba(0,51,68,0.85)" }}
      />
      {overlayColor && (overlayOpacity ?? 0) > 0 && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100 }}
        />
      )}

      <div className="relative z-10 site-container">
        <div className="text-center mb-14">
          <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-3">
            {title}
          </h2>
          <p className="section-desc">{description}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {cats.map((cat, i) => (
            <a
              key={i}
              href={cat.href || "#"}
              className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-secondary hover:border-primary/40 hover:bg-secondary/80 transition-all duration-300"
            >
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name || ""}
                  className="w-8 h-8 object-contain text-muted-foreground group-hover:opacity-80 transition-opacity"
                />
              ) : (
                <DefaultIcon index={i} />
              )}
              <span className="text-sm font-medium text-secondary-foreground group-hover:text-primary text-center transition-colors">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
})

export default CategoryGrid
